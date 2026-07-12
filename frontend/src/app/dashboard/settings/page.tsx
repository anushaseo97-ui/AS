"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Bell, Lock, CreditCard } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const meRes = await fetch("/api/auth/me", { cache: "no-store" });
        if (!meRes.ok) {
          router.push("/login");
          return;
        }

        const res = await fetch("/api/settings", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setName(data.profile.name);
          setEmail(data.profile.email);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sage-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">
            Settings
          </h1>
          <p className="text-chocolate-400 mt-1">Manage your account and practice preferences.</p>
        </div>

        <div className="grid lg:grid-cols-[200px_1fr] gap-6">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-sage-100 text-sage-600"
                      : "text-chocolate-600 hover:bg-chocolate-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-chocolate-100 p-6">
            {activeTab === "profile" && (
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <h2 className="text-base font-semibold text-chocolate-900">Profile Information</h2>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-chocolate-100 flex items-center justify-center">
                    <span className="text-lg font-bold text-chocolate-700">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 focus:outline-none focus:border-sage-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full px-3.5 py-2.5 bg-chocolate-50/50 border border-chocolate-100 rounded-xl text-sm text-chocolate-400"
                    />
                  </div>
                </div>

                <p className="text-xs text-chocolate-400">
                  Specialization and phone fields aren't tracked yet — coming soon.
                </p>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                </button>
              </form>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-chocolate-900">Notification Preferences</h2>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                  Notification preferences aren't connected to a backend yet — toggles here are visual only for now.
                </div>
                {["New appointment bookings", "Client messages", "Community questions", "Weekly summary email"].map(
                  (label) => (
                    <div key={label} className="flex items-center justify-between py-2 opacity-60">
                      <span className="text-sm text-chocolate-600">{label}</span>
                      <div className="w-10 h-6 bg-sage-500 rounded-full relative cursor-not-allowed">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-chocolate-900">Security</h2>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                  Password change isn't wired up yet — this is a placeholder for a future update.
                </div>
                <div>
                  <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    disabled
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-chocolate-50/50 border border-chocolate-100 rounded-xl text-sm text-chocolate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    disabled
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-chocolate-50/50 border border-chocolate-100 rounded-xl text-sm text-chocolate-400"
                  />
                </div>
                <button
                  disabled
                  className="px-5 py-2.5 bg-chocolate-300 text-white text-sm font-semibold rounded-xl cursor-not-allowed"
                >
                  Update Password
                </button>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-chocolate-900">Billing</h2>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                  Billing/payments aren't integrated yet. This is a placeholder — contact clients directly to arrange payment for now.
                </div>
                <div className="flex items-center justify-between p-4 bg-chocolate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-chocolate-900">Free Trial</p>
                    <p className="text-xs text-chocolate-400 mt-0.5">Payment integration coming soon</p>
                  </div>
                  <button
                    disabled
                    className="px-4 py-2 bg-chocolate-300 text-white text-sm font-semibold rounded-xl cursor-not-allowed"
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


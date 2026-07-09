"use client";

import { useState } from "react";
import { User, Bell, Lock, CreditCard } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

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
          {/* Tab list */}
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

          {/* Tab content */}
          <div className="bg-white rounded-2xl border border-chocolate-100 p-6">
            {activeTab === "profile" && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-chocolate-900">Profile Information</h2>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-chocolate-100 flex items-center justify-center">
                    <span className="text-lg font-bold text-chocolate-700">D</span>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-chocolate-700 border border-chocolate-100 rounded-xl hover:bg-chocolate-50 transition-colors">
                    Change Photo
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Dr. Sarah Ahmed"
                      className="w-full px-3.5 py-2.5 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 focus:outline-none focus:border-sage-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="sarah.ahmed@nutrilife.com"
                      className="w-full px-3.5 py-2.5 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 focus:outline-none focus:border-sage-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                      Specialization
                    </label>
                    <input
                      type="text"
                      defaultValue="Clinical Nutrition"
                      className="w-full px-3.5 py-2.5 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 focus:outline-none focus:border-sage-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="text"
                      defaultValue="+92 300 1234567"
                      className="w-full px-3.5 py-2.5 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 focus:outline-none focus:border-sage-400"
                    />
                  </div>
                </div>

                <button className="px-5 py-2.5 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors">
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-chocolate-900">Notification Preferences</h2>
                {["New appointment bookings", "Client messages", "Community questions", "Weekly summary email"].map(
                  (label) => (
                    <div key={label} className="flex items-center justify-between py-2">
                      <span className="text-sm text-chocolate-600">{label}</span>
                      <div className="w-10 h-6 bg-sage-500 rounded-full relative cursor-pointer">
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
                <div>
                  <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm focus:outline-none focus:border-sage-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-chocolate-400 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm focus:outline-none focus:border-sage-400"
                  />
                </div>
                <button className="px-5 py-2.5 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors">
                  Update Password
                </button>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-4">
                <h2 className="text-base font-semibold text-chocolate-900">Billing</h2>
                <div className="flex items-center justify-between p-4 bg-chocolate-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-chocolate-900">Free Trial</p>
                    <p className="text-xs text-chocolate-400 mt-0.5">12 days remaining</p>
                  </div>
                  <button className="px-4 py-2 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors">
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
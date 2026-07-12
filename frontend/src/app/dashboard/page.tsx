"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Calendar, UtensilsCrossed, TrendingUp, Copy, Check, Save } from "lucide-react";

interface Appointment {
  id: string;
  name: string;
  time: string;
  status: string;
}

interface RecentClient {
  id: string;
  name: string;
  email: string;
}

export default function DashboardHome() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const [dietitianId, setDietitianId] = useState<string | null>(null);
  const [statsData, setStatsData] = useState({
    activeClients: 0,
    todayAppointments: 0,
    mealPlans: 0,
  });
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [recentClients, setRecentClients] = useState<RecentClient[]>([]);

  const [price, setPrice] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("consultation_price") || "50";
    }
    return "50";
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const meRes = await fetch("/api/auth/me", { cache: "no-store" });
        if (!meRes.ok) {
          router.push("/login");
          return;
        }
        const meData = await meRes.json();
        if (meData.user.role !== "DIETITIAN") {
          router.push("/workspace");
          return;
        }
        setDietitianId(meData.user.id);

        const statsRes = await fetch("/api/dashboard/stats", { cache: "no-store" });
        if (statsRes.ok) {
          const data = await statsRes.json();
          setStatsData(data.stats);
          setAppointments(data.appointments);
          setRecentClients(data.recentClients);
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  const stats = [
    { icon: Users, value: String(statsData.activeClients), label: "Active Clients" },
    { icon: Calendar, value: String(statsData.todayAppointments), label: "Today's Appointments" },
    { icon: UtensilsCrossed, value: String(statsData.mealPlans), label: "Meal Plans" },
    { icon: TrendingUp, value: "—", label: "Growth This Week" },
  ];

  const handleSavePrice = () => {
    localStorage.setItem("consultation_price", price);
    alert(`Price updated to $${price}`);
  };

  const generateInviteLink = () => {
    if (!dietitianId) return;
    const link = `${window.location.origin}/signup?invite=true&dietitianId=${dietitianId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">
              Welcome back
            </h1>
            <p className="text-chocolate-400 mt-1">
              Here's what's happening with your practice today.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sage-50 border border-sage-200 rounded-2xl p-4 flex flex-col justify-between">
              <p className="text-xs font-bold text-sage-800 uppercase">Quick Invite</p>
              <button onClick={generateInviteLink} className="flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-900 mt-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            <div className="bg-white border border-chocolate-100 rounded-2xl p-4">
              <p className="text-xs font-bold text-chocolate-800 uppercase">Session Price ($)</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-chocolate-50 rounded-lg px-2 py-1 text-sm text-chocolate-900 border-none focus:ring-1 focus:ring-sage-500 outline-none"
                />
                <button onClick={handleSavePrice} className="p-1.5 bg-chocolate-100 text-chocolate-700 rounded-lg hover:bg-chocolate-200">
                  <Save className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl border border-chocolate-100 p-5">
                <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-sage-600" />
                </div>
                <p className="text-2xl font-bold text-chocolate-900">{stat.value}</p>
                <p className="text-sm text-chocolate-400 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-chocolate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-chocolate-900">Today's Appointments</h2>
            <button className="text-sm font-medium text-chocolate-700 hover:text-chocolate-900">
              View all
            </button>
          </div>

          <div className="space-y-3">
            {appointments.length === 0 ? (
              <p className="text-sm text-chocolate-400 text-center py-6">No appointments today.</p>
            ) : (
              appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="flex items-center gap-4 p-3 rounded-xl border border-chocolate-100 hover:border-sage-400 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-chocolate-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-chocolate-700">{appt.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-chocolate-900">{appt.name}</p>
                    <p className="text-xs text-chocolate-400">{appt.status}</p>
                  </div>
                  <span className="text-xs font-medium text-sage-600 bg-sage-100 px-2.5 py-1 rounded-full flex-shrink-0">
                    {appt.time}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


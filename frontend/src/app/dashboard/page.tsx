import { Users, Calendar, UtensilsCrossed, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "48", label: "Active Clients" },
  { icon: Calendar, value: "12", label: "Today's Appointments" },
  { icon: UtensilsCrossed, value: "156", label: "Meal Plans" },
  { icon: TrendingUp, value: "23%", label: "Growth This Week" },
];

const recentClients = [
  { name: "Emma Wilson", type: "Initial Consultation", time: "10:00 AM" },
  { name: "James Carter", type: "Follow-up", time: "11:30 AM" },
  { name: "Sophia Lee", type: "Meal Plan Review", time: "2:00 PM" },
  { name: "Michael Chen", type: "Initial Consultation", time: "3:30 PM" },
];

export default function DashboardHome() {
  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">
            Welcome back
          </h1>
          <p className="text-chocolate-400 mt-1">
            Here's what's happening with your practice today.
          </p>
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
            {recentClients.map((client) => (
              <div
                key={client.name}
                className="flex items-center gap-4 p-3 rounded-xl border border-chocolate-100 hover:border-sage-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-chocolate-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-chocolate-700">{client.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-chocolate-900">{client.name}</p>
                  <p className="text-xs text-chocolate-400">{client.type}</p>
                </div>
                <span className="text-xs font-medium text-sage-600 bg-sage-100 px-2.5 py-1 rounded-full flex-shrink-0">
                  {client.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
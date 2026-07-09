"use client";

import { useState } from "react";
import { Plus, Clock } from "lucide-react";

const appointments = [
  { id: 1, client: "Emma Wilson", type: "Initial Consultation", date: "Jul 9, 2026", time: "10:00 AM", status: "Confirmed" },
  { id: 2, client: "James Carter", type: "Follow-up", date: "Jul 9, 2026", time: "11:30 AM", status: "Confirmed" },
  { id: 3, client: "Sophia Lee", type: "Meal Plan Review", date: "Jul 9, 2026", time: "2:00 PM", status: "Pending" },
  { id: 4, client: "Michael Chen", type: "Initial Consultation", date: "Jul 10, 2026", time: "9:30 AM", status: "Confirmed" },
  { id: 5, client: "Olivia Brown", type: "Follow-up", date: "Jul 10, 2026", time: "1:00 PM", status: "Confirmed" },
];

export default function AppointmentsPage() {
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending">("all");

  const filtered = appointments.filter((a) => {
    if (filter === "all") return true;
    return a.status.toLowerCase() === filter;
  });

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">
              Appointments
            </h1>
            <p className="text-chocolate-400 mt-1">Manage your upcoming sessions.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors">
            <Plus className="w-4 h-4" />
            New Appointment
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          {(["all", "confirmed", "pending"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                filter === f
                  ? "bg-chocolate-700 text-white"
                  : "bg-white text-chocolate-600 border border-chocolate-100 hover:bg-chocolate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Appointments list */}
        <div className="bg-white rounded-2xl border border-chocolate-100 overflow-hidden">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-chocolate-400 text-sm">No appointments found.</p>
          ) : (
            <div className="divide-y divide-chocolate-100">
              {filtered.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-4 hover:bg-chocolate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-chocolate-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-chocolate-700">
                      {apt.client.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-chocolate-900">{apt.client}</p>
                    <p className="text-xs text-chocolate-400">{apt.type}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-chocolate-400 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    {apt.date} · {apt.time}
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                      apt.status === "Confirmed"
                        ? "text-sage-600 bg-sage-100"
                        : "text-chocolate-600 bg-chocolate-100"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
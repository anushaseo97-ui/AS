"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";

const clients = [
  { id: 1, name: "Emma Wilson", email: "emma.wilson@email.com", status: "Active", lastVisit: "Jul 8, 2026" },
  { id: 2, name: "James Carter", email: "james.carter@email.com", status: "Active", lastVisit: "Jul 7, 2026" },
  { id: 3, name: "Sophia Lee", email: "sophia.lee@email.com", status: "Active", lastVisit: "Jul 6, 2026" },
  { id: 4, name: "Michael Chen", email: "michael.chen@email.com", status: "Inactive", lastVisit: "Jun 20, 2026" },
  { id: 5, name: "Olivia Brown", email: "olivia.brown@email.com", status: "Active", lastVisit: "Jul 5, 2026" },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">Clients</h1>
            <p className="text-chocolate-400 mt-1">Manage your client roster.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors">
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-chocolate-100 rounded-xl text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none focus:border-sage-400"
          />
        </div>

        {/* Clients list */}
        <div className="bg-white rounded-2xl border border-chocolate-100 overflow-hidden">
          {filteredClients.length === 0 ? (
            <p className="p-8 text-center text-chocolate-400 text-sm">No clients found.</p>
          ) : (
            <div className="divide-y divide-chocolate-100">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center gap-4 p-4 hover:bg-chocolate-50 transition-colors cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-chocolate-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-chocolate-700">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-chocolate-900">{client.name}</p>
                    <p className="text-xs text-chocolate-400">{client.email}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${
                      client.status === "Active"
                        ? "text-sage-600 bg-sage-100"
                        : "text-chocolate-400 bg-chocolate-50"
                    }`}
                  >
                    {client.status}
                  </span>
                  <span className="text-xs text-chocolate-400 flex-shrink-0 w-24 text-right">
                    {client.lastVisit}
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
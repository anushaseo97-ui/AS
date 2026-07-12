"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, User } from "lucide-react";
import AiMealPlanGenerator from "@/app/components/AiMealPlanGenerator";

interface Client {
  id: string;
  name: string;
  email: string;
  status: string;
  lastVisit: string;
}

export default function ClientsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    async function loadClients() {
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

        const res = await fetch(
          `/api/dashboard/clients?search=${encodeURIComponent(search)}`,
          { cache: "no-store" }
        );
        if (res.ok) {
          const data = await res.json();
          setClients(data.clients);
        }
      } catch (error) {
        console.error("Failed to load clients:", error);
      } finally {
        setLoading(false);
      }
    }

    const debounce = setTimeout(loadClients, 300);
    return () => clearTimeout(debounce);
  }, [search, router]);

  if (loading && clients.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sage-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          <div className={`space-y-6 ${selectedClient ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
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

            <div className="bg-white rounded-2xl border border-chocolate-100 overflow-hidden shadow-sm">
              {clients.length === 0 ? (
                <p className="p-8 text-center text-chocolate-400 text-sm">
                  {search ? "No clients found." : "No clients yet. Share your invite link to get started."}
                </p>
              ) : (
                <div className="divide-y divide-chocolate-100">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      className={`flex items-center gap-4 p-4 hover:bg-chocolate-50 transition-colors cursor-pointer ${
                        selectedClient?.id === client.id ? "bg-chocolate-50/70 border-l-4 border-sage-500 pl-3" : ""
                      }`}
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
                      <span className="text-xs text-chocolate-400 flex-shrink-0 w-24 text-right hidden sm:block">
                        {client.lastVisit}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedClient && (
            <div className="lg:col-span-1 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-chocolate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Selected Focus
                </span>
                <button
                  onClick={() => setSelectedClient(null)}
                  className="text-xs font-medium text-chocolate-400 hover:text-chocolate-700 transition-colors"
                >
                  Close Panel
                </button>
              </div>

              <AiMealPlanGenerator
                clientId={selectedClient.id}
                clientName={selectedClient.name}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}


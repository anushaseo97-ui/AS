"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

interface MealPlan {
  id: string;
  title: string;
  client: string;
  clientId: string;
  preview: string;
  createdAt: string;
}

interface ClientOption {
  id: string;
  name: string;
}

export default function MealPlansPage() {
  const router = useRouter();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [newClientId, setNewClientId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [creating, setCreating] = useState(false);
  const [modalError, setModalError] = useState("");

  async function loadMealPlans() {
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

      const [plansRes, clientsRes] = await Promise.all([
        fetch("/api/dashboard/meal-plans", { cache: "no-store" }),
        fetch("/api/dashboard/clients", { cache: "no-store" }),
      ]);

      if (plansRes.ok) {
        const data = await plansRes.json();
        setMealPlans(data.mealPlans);
      }
      if (clientsRes.ok) {
        const data = await clientsRes.json();
        setClients(data.clients.map((c: any) => ({ id: c.id, name: c.name })));
      }
    } catch (error) {
      console.error("Failed to load meal plans:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMealPlans();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");

    if (!newClientId || !newTitle.trim() || !newContent.trim()) {
      setModalError("Please fill in all fields.");
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/dashboard/meal-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: newClientId, title: newTitle, content: newContent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create meal plan.");

      setShowModal(false);
      setNewClientId("");
      setNewTitle("");
      setNewContent("");
      loadMealPlans();
    } catch (error: any) {
      setModalError(error.message);
    } finally {
      setCreating(false);
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
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">
              Meal Plans
            </h1>
            <p className="text-chocolate-400 mt-1">Meal plans generated for your clients.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Plan
          </button>
        </div>

        {mealPlans.length === 0 ? (
          <div className="bg-white rounded-2xl border border-chocolate-100 p-8 text-center">
            <p className="text-sm text-chocolate-400">
              No meal plans yet. Generate one via AI from the Clients page, or create one manually here.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {mealPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl border border-chocolate-100 p-5 hover:border-sage-400 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-chocolate-400">{plan.createdAt}</span>
                </div>
                <h3 className="text-base font-semibold text-chocolate-900 mb-1">{plan.title}</h3>
                <p className="text-sm text-chocolate-400 mb-3">For {plan.client}</p>
                <p className="text-sm text-chocolate-600 leading-relaxed">{plan.preview}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg space-y-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-chocolate-400 hover:text-chocolate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-chocolate-900">New Meal Plan</h2>

            {clients.length === 0 ? (
              <p className="text-sm text-chocolate-400">
                You don't have any clients yet. Invite a client first.
              </p>
            ) : (
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-chocolate-700 mb-1">Client</label>
                  <select
                    value={newClientId}
                    onChange={(e) => setNewClientId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900"
                  >
                    <option value="">Select a client</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-chocolate-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Low-Carb Reset"
                    className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-chocolate-700 mb-1">Plan Content</label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={8}
                    placeholder="Write the meal plan details..."
                    className="w-full p-4 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900 resize-none"
                  />
                </div>

                {modalError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                    {modalError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={creating}
                  className="w-full py-2.5 bg-chocolate-700 hover:bg-chocolate-900 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Meal Plan"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


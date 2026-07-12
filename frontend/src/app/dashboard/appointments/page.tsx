"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Clock, Check, X, Mail, Copy } from "lucide-react";

interface Appointment {
  id: string;
  client: string;
  clientId: string;
  date: string;
  time: string;
  status: string;
}

interface ClientOption {
  id: string;
  name: string;
}

interface BookingRequestItem {
  id: string;
  name: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message: string | null;
  status: string;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending">("all");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  const [newClientId, setNewClientId] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [creating, setCreating] = useState(false);
  const [modalError, setModalError] = useState("");

  async function loadAppointments() {
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

      const [res, bookingRes] = await Promise.all([
        fetch("/api/dashboard/appointments", { cache: "no-store" }),
        fetch("/api/dashboard/booking-requests", { cache: "no-store" }),
      ]);

      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments);
        setClients(data.clients);
      }
      if (bookingRes.ok) {
        const data = await bookingRes.json();
        setBookingRequests(data.requests);
      }
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  const filtered = appointments.filter((a) => {
    if (filter === "all") return true;
    return a.status.toLowerCase() === filter;
  });

  const pendingRequests = bookingRequests.filter((r) => r.status === "PENDING");

  const handleConfirm = async (id: string) => {
    setConfirmingId(id);
    try {
      const res = await fetch(`/api/dashboard/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CONFIRMED" }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: "CONFIRMED" } : a))
        );
      }
    } catch (error) {
      console.error("Failed to confirm appointment:", error);
    } finally {
      setConfirmingId(null);
    }
  };

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    try {
      const res = await fetch(`/api/dashboard/booking-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        navigator.clipboard.writeText(data.inviteLink);
        setCopiedLinkId(id);
        setTimeout(() => setCopiedLinkId(null), 3000);
        setBookingRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: "APPROVED" } : r))
        );
      }
    } catch (error) {
      console.error("Failed to approve booking request:", error);
    } finally {
      setApprovingId(null);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");

    if (!newClientId || !newDate || !newTime) {
      setModalError("Please fill in all fields.");
      return;
    }

    setCreating(true);
    try {
      const dateTime = new Date(`${newDate}T${newTime}`).toISOString();
      const res = await fetch("/api/dashboard/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: newClientId, dateTime }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create appointment.");

      setShowModal(false);
      setNewClientId("");
      setNewDate("");
      setNewTime("");
      loadAppointments();
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
              Appointments
            </h1>
            <p className="text-chocolate-400 mt-1">Manage your upcoming sessions.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Appointment
          </button>
        </div>

        {pendingRequests.length > 0 && (
          <div className="bg-white rounded-2xl border border-sage-200 overflow-hidden">
            <div className="p-4 border-b border-chocolate-100 bg-sage-50">
              <h2 className="text-sm font-semibold text-chocolate-900">
                New Booking Requests ({pendingRequests.length})
              </h2>
              <p className="text-xs text-chocolate-500 mt-0.5">
                Approve to get an invite link, then email the client to confirm pricing and details.
              </p>
            </div>
            <div className="divide-y divide-chocolate-100">
              {pendingRequests.map((req) => (
                <div key={req.id} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-chocolate-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-chocolate-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-chocolate-900">{req.name}</p>
                    <p className="text-xs text-chocolate-400">
                      {req.email} · {req.preferredDate} at {req.preferredTime}
                    </p>
                    {req.message && (
                      <p className="text-xs text-chocolate-500 mt-1">{req.message}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleApprove(req.id)}
                    disabled={approvingId === req.id}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 transition-colors disabled:opacity-50 ${
                      copiedLinkId === req.id
                        ? "bg-green-100 text-green-700"
                        : "bg-sage-100 text-sage-700 hover:bg-sage-200"
                    }`}
                  >
                    {copiedLinkId === req.id ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedLinkId === req.id
                      ? "Invite Link Copied!"
                      : approvingId === req.id
                      ? "Approving..."
                      : "Approve & Copy Invite"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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

        <div className="bg-white rounded-2xl border border-chocolate-100 overflow-hidden">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-chocolate-400 text-sm">
              {appointments.length === 0
                ? "No appointments yet. Create one to get started."
                : "No appointments found."}
            </p>
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
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-chocolate-400 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                    {apt.date} · {apt.time}
                  </div>

                  {apt.status === "PENDING" ? (
                    <button
                      onClick={() => handleConfirm(apt.id)}
                      disabled={confirmingId === apt.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-sage-100 text-sage-700 hover:bg-sage-200 transition-colors disabled:opacity-50"
                    >
                      <Check className="w-3.5 h-3.5" />
                      {confirmingId === apt.id ? "Confirming..." : "Confirm"}
                    </button>
                  ) : (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full text-sage-600 bg-sage-100">
                      {apt.status.charAt(0) + apt.status.slice(1).toLowerCase()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-chocolate-400 hover:text-chocolate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-chocolate-900">New Appointment</h2>

            {clients.length === 0 ? (
              <p className="text-sm text-chocolate-400">
                You don't have any clients yet. Invite a client first before scheduling an appointment.
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
                  <label className="block text-xs font-semibold text-chocolate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-chocolate-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900"
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
                  {creating ? "Creating..." : "Create Appointment"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


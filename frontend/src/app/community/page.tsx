"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, Leaf, Plus, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Question {
  id: string;
  question: string;
  answer: string | null;
  author: string;
  createdAt: string;
  hasExpertReply: boolean;
}

export default function CommunityPage() {
  const [filter, setFilter] = useState<"all" | "unanswered">("all");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const [showAskModal, setShowAskModal] = useState(false);
  const [askName, setAskName] = useState("");
  const [askQuestion, setAskQuestion] = useState("");
  const [asking, setAsking] = useState(false);
  const [askError, setAskError] = useState("");

  async function loadQuestions() {
    try {
      const res = await fetch("/api/community", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error("Failed to load community questions:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuestions();
  }, []);

  const filtered =
    filter === "unanswered" ? questions.filter((q) => !q.hasExpertReply) : questions;

  const handleReply = async (id: string) => {
    const answer = replyDrafts[id];
    if (!answer || !answer.trim()) return;

    setSubmittingId(id);
    try {
      const res = await fetch(`/api/community/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      if (res.ok) {
        setReplyDrafts((prev) => ({ ...prev, [id]: "" }));
        loadQuestions();
      } else if (res.status === 401) {
        alert("Please log in as a dietitian to reply.");
      }
    } catch (error) {
      console.error("Failed to submit reply:", error);
    } finally {
      setSubmittingId(null);
    }
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setAskError("");

    if (!askQuestion.trim()) {
      setAskError("Please write your question.");
      return;
    }

    setAsking(true);
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: askQuestion, authorName: askName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit question.");

      setShowAskModal(false);
      setAskName("");
      setAskQuestion("");
      loadQuestions();
    } catch (error: any) {
      setAskError(error.message);
    } finally {
      setAsking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f6f3]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sage-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f6f3] bg-gradient-to-tr from-sage-50/60 via-white to-[#f4f7f4] relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] opacity-40 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-sage-200/70">
          <path d="M40,110 Q70,70 120,100 T180,60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">

          <div className="flex flex-col items-center text-center mb-4">
            <div className="group relative flex flex-col items-center">
              <Link href="/" className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center mb-2 transition-all duration-300 hover:bg-sage-200 hover:scale-105 active:scale-95 border border-sage-200">
                <Leaf className="w-6 h-6 text-sage-600" />
              </Link>
              <span className="text-[10px] text-sage-600/80 font-medium tracking-wide opacity-70 group-hover:opacity-100 transition-opacity">
                Click leaf to return Home
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900 mt-4">
              Community
            </h1>
            <p className="text-chocolate-400 mt-1">
              Ask a wellness question. Any dietitian may choose to answer.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-2">
              {(["all", "unanswered"] as const).map((f) => (
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
            <button
              onClick={() => setShowAskModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-sage-600 text-white text-sm font-semibold rounded-lg hover:bg-sage-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ask a Question
            </button>
          </div>

          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl border border-chocolate-100 p-8 text-center">
                <p className="text-sm text-chocolate-400">No public questions yet. Be the first to ask.</p>
              </div>
            ) : (
              filtered.map((q) => (
                <div key={q.id} className="bg-white rounded-2xl border border-chocolate-100 p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-chocolate-900">{q.author}</p>
                      <p className="text-sm text-chocolate-600 mt-1">{q.question}</p>
                    </div>
                    {!q.hasExpertReply && (
                      <span className="text-xs font-medium text-chocolate-600 bg-chocolate-100 px-2.5 py-1 rounded-full flex-shrink-0">
                        Needs Reply
                      </span>
                    )}
                  </div>

                  {q.answer ? (
                    <div className="flex items-start gap-2 bg-sage-50 border border-sage-200 rounded-xl p-3 mt-3">
                      <MessageCircle className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-chocolate-800">{q.answer}</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-chocolate-50 rounded-xl p-2 mt-3">
                      <input
                        type="text"
                        placeholder="Reply as a dietitian..."
                        value={replyDrafts[q.id] || ""}
                        onChange={(e) =>
                          setReplyDrafts((prev) => ({ ...prev, [q.id]: e.target.value }))
                        }
                        className="flex-1 bg-transparent px-3 py-2 text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none"
                      />
                      <button
                        onClick={() => handleReply(q.id)}
                        disabled={submittingId === q.id}
                        className="flex items-center gap-1.5 px-3 py-2 bg-chocolate-700 text-white text-xs font-semibold rounded-lg hover:bg-chocolate-900 transition-colors flex-shrink-0 disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        {submittingId === q.id ? "Sending..." : "Reply"}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />

      {showAskModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 relative">
            <button
              onClick={() => setShowAskModal(false)}
              className="absolute top-4 right-4 text-chocolate-400 hover:text-chocolate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-chocolate-900">Ask a Question</h2>
            <p className="text-xs text-chocolate-400">
              Your question will be public. Any dietitian on NutriLife may choose to reply.
            </p>

            <form onSubmit={handleAsk} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-chocolate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={askName}
                  onChange={(e) => setAskName(e.target.value)}
                  placeholder="e.g. Priya M."
                  className="w-full px-4 py-2.5 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-chocolate-700 mb-1">Your Question</label>
                <textarea
                  value={askQuestion}
                  onChange={(e) => setAskQuestion(e.target.value)}
                  rows={4}
                  placeholder="Ask anything about nutrition, meal planning, or wellness..."
                  className="w-full p-4 rounded-xl border border-chocolate-200 focus:outline-none focus:border-sage-500 text-sm text-chocolate-900 resize-none"
                />
              </div>

              {askError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                  {askError}
                </div>
              )}

              <button
                type="submit"
                disabled={asking}
                className="w-full py-2.5 bg-chocolate-700 hover:bg-chocolate-900 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
              >
                {asking ? "Submitting..." : "Post Question"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


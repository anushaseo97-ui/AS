"use client";

import { useState } from "react";
import { MessageCircle, ThumbsUp, Send } from "lucide-react";

const questions = [
  {
    id: 1,
    author: "Priya M.",
    question: "Is intermittent fasting safe for someone with a history of low blood sugar?",
    replies: 2,
    likes: 14,
    hasExpertReply: true,
  },
  {
    id: 2,
    author: "Daniel R.",
    question: "What's a realistic protein target for a beginner strength training routine?",
    replies: 0,
    likes: 3,
    hasExpertReply: false,
  },
  {
    id: 3,
    author: "Aisha K.",
    question: "Can meal timing actually affect metabolism, or is that a myth?",
    replies: 1,
    likes: 8,
    hasExpertReply: true,
  },
];

export default function CommunityPage() {
  const [filter, setFilter] = useState<"all" | "unanswered">("all");

  const filtered =
    filter === "unanswered" ? questions.filter((q) => !q.hasExpertReply) : questions;

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">
            Community
          </h1>
          <p className="text-chocolate-400 mt-1">
            Public wellness questions waiting for your expertise.
          </p>
        </div>

        {/* Filter tabs */}
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

        {/* Questions list */}
        <div className="space-y-4">
          {filtered.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl border border-chocolate-100 p-5"
            >
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

              <div className="flex items-center gap-4 text-xs text-chocolate-400 mb-4">
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {q.replies} replies
                </span>
                <span className="flex items-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {q.likes}
                </span>
              </div>

              {/* Forum Copilot draft reply box */}
              <div className="flex items-center gap-2 bg-chocolate-50 rounded-xl p-2">
                <input
                  type="text"
                  placeholder="Write or generate a reply..."
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none"
                />
                <button className="flex items-center gap-1.5 px-3 py-2 bg-chocolate-700 text-white text-xs font-semibold rounded-lg hover:bg-chocolate-900 transition-colors flex-shrink-0">
                  <Send className="w-3.5 h-3.5" />
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
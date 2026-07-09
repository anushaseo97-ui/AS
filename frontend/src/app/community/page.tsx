"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MessageCircle, ThumbsUp, Send, CheckCircle2 } from "lucide-react";

const questions = [
  {
    id: 1,
    author: "Priya M.",
    question: "Is intermittent fasting safe for someone with a history of low blood sugar?",
    replies: 2,
    likes: 14,
    expertReply:
      "Generally not recommended without medical supervision — fasting windows can trigger hypoglycemic episodes. Speak with a dietitian before starting.",
  },
  {
    id: 2,
    author: "Daniel R.",
    question: "What's a realistic protein target for a beginner strength training routine?",
    replies: 0,
    likes: 3,
    expertReply: null,
  },
  {
    id: 3,
    author: "Aisha K.",
    question: "Can meal timing actually affect metabolism, or is that a myth?",
    replies: 1,
    likes: 8,
    expertReply:
      "Meal timing has a modest effect compared to total daily intake, but consistent timing can help regulate hunger and energy levels.",
  },
];

export default function CommunityPublicPage() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet — just simulates submission for now.
    setSubmitted(true);
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-chocolate-50/50">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-50 border border-sage-100 rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-sage-600" />
              <span className="text-sm font-medium text-sage-600">Community Q&A</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-chocolate-900 mb-4">
              Ask Our <span className="text-sage-600">Dietitians</span> Anything
            </h1>
            <p className="text-lg text-chocolate-400 max-w-xl mx-auto">
              Public wellness questions, answered by real experts.
            </p>
          </div>

          {/* Ask a question form */}
          {submitted ? (
            <div className="bg-white rounded-2xl border border-chocolate-100 p-6 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-sage-600 flex-shrink-0" />
              <p className="text-sm text-chocolate-600">
                Your question has been submitted! An expert will respond soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-chocolate-100 p-5 flex items-center gap-2"
            >
              <input
                required
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a nutrition question..."
                className="flex-1 bg-chocolate-50 px-4 py-3 rounded-xl text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none focus:border-sage-400 border border-chocolate-100"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-3 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
                Ask
              </button>
            </form>
          )}

          {/* Questions list */}
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="bg-white rounded-2xl border border-chocolate-100 p-6">
                <p className="text-sm font-medium text-chocolate-900 mb-1">{q.author}</p>
                <p className="text-base text-chocolate-700 mb-4">{q.question}</p>

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

                {q.expertReply ? (
                  <div className="bg-sage-50 border border-sage-100 rounded-xl p-4">
                    <p className="text-xs font-semibold text-sage-600 mb-1.5">Expert Answer</p>
                    <p className="text-sm text-chocolate-600 leading-relaxed">{q.expertReply}</p>
                  </div>
                ) : (
                  <p className="text-xs text-chocolate-400 italic">
                    Awaiting a response from our dietitians...
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
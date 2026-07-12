"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Send } from "lucide-react";

interface MealPlan {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface QuestionItem {
  id: string;
  question: string;
  answer: string | null;
  isPublic: boolean;
  createdAt: string;
}

export default function WorkspacePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [questions, setQuestions] = useState<QuestionItem[]>([]);

  const [newQuestion, setNewQuestion] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function loadWorkspace() {
    try {
      const meRes = await fetch("/api/auth/me", { cache: "no-store" });
      if (!meRes.ok) {
        router.push("/login");
        return;
      }
      const meData = await meRes.json();
      if (meData.user.role !== "CLIENT") {
        router.push("/dashboard");
        return;
      }
      setUserName(meData.user.name);

      const [plansRes, questionsRes] = await Promise.all([
        fetch("/api/workspace/meal-plans", { cache: "no-store" }),
        fetch("/api/workspace/questions", { cache: "no-store" }),
      ]);

      if (plansRes.ok) {
        const data = await plansRes.json();
        setMealPlans(data.mealPlans);
      }
      if (questionsRes.ok) {
        const data = await questionsRes.json();
        setQuestions(data.questions);
      }
    } catch (error) {
      console.error("Failed to load workspace:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkspace();
  }, []);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/workspace/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion, isPublic }),
      });
      if (res.ok) {
        setNewQuestion("");
        setIsPublic(false);
        loadWorkspace();
      }
    } catch (error) {
      console.error("Failed to submit question:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-chocolate-50/50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sage-600"></div>
      </div>
    );
  }

  const latestPlan = mealPlans[0];

  return (
    <div className="min-h-screen bg-chocolate-50/50">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">
              Welcome back, {userName}
            </h1>
            <p className="text-chocolate-400 mt-1">
              Here's your personalized plan for today.
            </p>
          </div>

          {/* Meal plan */}
          <div className="bg-white rounded-2xl border border-chocolate-100 p-6">
            <h2 className="text-lg font-semibold text-chocolate-900 mb-5">
              {latestPlan ? latestPlan.title : "Your Meal Plan"}
            </h2>

            {!latestPlan ? (
              <p className="text-sm text-chocolate-400 text-center py-6">
                Your dietitian hasn't created a meal plan for you yet.
              </p>
            ) : (
              <div className="text-sm text-chocolate-900 leading-relaxed whitespace-pre-wrap">
                {latestPlan.content}
              </div>
            )}
          </div>

          {mealPlans.length > 1 && (
            <div className="bg-white rounded-2xl border border-chocolate-100 p-6">
              <h2 className="text-lg font-semibold text-chocolate-900 mb-4">Previous Plans</h2>
              <div className="space-y-3">
                {mealPlans.slice(1).map((plan) => (
                  <div key={plan.id} className="p-3 rounded-xl border border-chocolate-100">
                    <p className="text-sm font-medium text-chocolate-900">{plan.title}</p>
                    <p className="text-xs text-chocolate-400 mt-0.5">{plan.createdAt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ask a question */}
          <div className="bg-white rounded-2xl border border-chocolate-100 p-6">
            <h2 className="text-lg font-semibold text-chocolate-900 mb-4">Ask a Question</h2>
            <form onSubmit={handleAskQuestion} className="space-y-3">
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Ask your dietitian anything about your plan..."
                rows={3}
                className="w-full p-4 bg-chocolate-50 border border-chocolate-100 rounded-xl text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none focus:border-sage-400 resize-none"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-chocolate-500">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="rounded border-chocolate-300"
                  />
                  Post publicly to Community (visible to all dietitians)
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-1.5 px-4 py-2 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? "Sending..." : "Ask"}
                </button>
              </div>
            </form>

            {questions.length > 0 && (
              <div className="mt-6 space-y-3 border-t border-chocolate-100 pt-5">
                {questions.map((q) => (
                  <div key={q.id} className="p-3 rounded-xl border border-chocolate-100">
                    <p className="text-sm text-chocolate-900">{q.question}</p>
                    {q.answer ? (
                      <p className="text-sm text-sage-700 bg-sage-50 rounded-lg p-2 mt-2">
                        {q.answer}
                      </p>
                    ) : (
                      <p className="text-xs text-chocolate-400 mt-2">Awaiting reply...</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
// 1. Import the markdown tool we installed
import ReactMarkdown from "react-markdown";

interface AiMealPlanGeneratorProps {
  clientId: string | number;
  clientName: string;
}

export default function AiMealPlanGenerator({ clientId, clientName }: AiMealPlanGeneratorProps) {
  const [dynamicNotes, setDynamicNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorAlert("");

    try {
      // 2. Make a REAL network call to your Next.js route file!
      // (Adjust this URL path if your folders are structured slightly differently, e.g., '/api/generate-plan')
      const response = await fetch("/api/ai/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: clientId,
          dynamicNotes: dynamicNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate strategy.");
      }

      // 3. Update state with the genuine live AI data from your AMD GPU!
      if (data.success) {
        setMealPlan(data.mealPlan);
      }
    } catch (error: any) {
      console.error("Error generating plan:", error);
      setErrorAlert(error.message || "Could not connect to the AI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-chocolate-100 p-6 lg:p-8 space-y-6">
      {/* Header Info */}
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-sage-100 rounded-xl text-sage-600">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold font-serif text-chocolate-900">
            AMD AI Nutritional Strategy
          </h3>
          <p className="text-sm text-chocolate-400 mt-0.5">
            Generate an automated 3-day meal plan for <span className="font-medium text-chocolate-700">{clientName}</span>.
          </p>
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleGeneratePlan} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-chocolate-900 uppercase tracking-wider mb-1.5">
            Dietitian Focus Notes
          </label>
          <textarea
            value={dynamicNotes}
            onChange={(e) => setDynamicNotes(e.target.value)}
            placeholder="e.g., High protein recovery, keep total energy under 1800 kcal, client dislikes seafood..."
            rows={4}
            className="w-full p-4 bg-white border border-chocolate-100 rounded-xl text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none focus:border-sage-400 transition-colors shadow-sm resize-none"
          />
        </div>

        {/* Error Warning Box if GPU is offline */}
        {errorAlert && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            ⚠️ {errorAlert} (Make sure your AMD GPU server instance is powered on!)
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-chocolate-700 text-white text-sm font-semibold rounded-xl hover:bg-chocolate-900 disabled:bg-chocolate-400 transition-colors shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing via AMD Compute Infrastructure...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate 3-Day Meal Plan
            </>
          )}
        </button>
      </form>
          {/* Plan Document Output View */}
        {mealPlan && (
          <div className="mt-6 border-t border-chocolate-100 pt-6 animate-fadeIn">
            <h4 className="text-xs font-semibold text-chocolate-900 uppercase tracking-wider mb-3">
              Generated Strategy Document
            </h4>
            <div
              className="bg-chocolate-50/50 border border-chocolate-100 rounded-xl p-5 text-sm text-chocolate-900 leading-relaxed shadow-inner font-sans prose prose-sm max-w-none
                max-h-[500px] overflow-y-auto
                prose-headings:font-serif prose-headings:text-chocolate-900 prose-headings:mt-4 prose-headings:mb-2
                prose-h3:text-base prose-h4:text-sm
                prose-p:my-2
                prose-ul:my-2 prose-ul:space-y-1
                prose-li:marker:text-sage-500
                prose-strong:text-chocolate-900
                prose-hr:my-4 prose-hr:border-chocolate-200"
            >
              <ReactMarkdown>{mealPlan}</ReactMarkdown>
            </div>
          </div>
        )}
    </div>
  );
}
"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UtensilsCrossed, Calendar, TrendingUp, Droplet } from "lucide-react";

const todayMeals = [
  { meal: "Breakfast", item: "Greek yogurt with berries & granola", calories: 320 },
  { meal: "Lunch", item: "Grilled chicken, quinoa, roasted vegetables", calories: 520 },
  { meal: "Snack", item: "Almonds & an apple", calories: 200 },
  { meal: "Dinner", item: "Baked salmon, sweet potato, steamed greens", calories: 480 },
];

export default function WorkspacePage() {
  return (
    <div className="min-h-screen bg-chocolate-50/50">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">
              Welcome back, Sarah
            </h1>
            <p className="text-chocolate-400 mt-1">
              Here's your personalized plan for today.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-chocolate-100 p-5">
              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center mb-3">
                <UtensilsCrossed className="w-5 h-5 text-sage-600" />
              </div>
              <p className="text-2xl font-bold text-chocolate-900">1,520</p>
              <p className="text-sm text-chocolate-400 mt-1">Calories Today</p>
            </div>
            <div className="bg-white rounded-2xl border border-chocolate-100 p-5">
              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center mb-3">
                <Droplet className="w-5 h-5 text-sage-600" />
              </div>
              <p className="text-2xl font-bold text-chocolate-900">5/8</p>
              <p className="text-sm text-chocolate-400 mt-1">Glasses of Water</p>
            </div>
            <div className="bg-white rounded-2xl border border-chocolate-100 p-5 col-span-2 lg:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-sage-600" />
              </div>
              <p className="text-2xl font-bold text-chocolate-900">-2.4 kg</p>
              <p className="text-sm text-chocolate-400 mt-1">Progress This Month</p>
            </div>
          </div>

          {/* Today's meal plan */}
          <div className="bg-white rounded-2xl border border-chocolate-100 p-6">
            <h2 className="text-lg font-semibold text-chocolate-900 mb-5">Today's Meal Plan</h2>
            <div className="space-y-3">
              {todayMeals.map((m) => (
                <div
                  key={m.meal}
                  className="flex items-center justify-between p-3 rounded-xl border border-chocolate-100"
                >
                  <div>
                    <p className="text-xs font-semibold text-sage-600 uppercase tracking-wide">
                      {m.meal}
                    </p>
                    <p className="text-sm text-chocolate-900 mt-0.5">{m.item}</p>
                  </div>
                  <span className="text-xs font-medium text-chocolate-400 flex-shrink-0">
                    {m.calories} kcal
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming appointment */}
          <div className="bg-white rounded-2xl border border-chocolate-100 p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-chocolate-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-chocolate-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-chocolate-900">
                Follow-up with Dr. Sarah Ahmed
              </p>
              <p className="text-xs text-chocolate-400">Tomorrow · 11:00 AM</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-chocolate-700 border border-chocolate-100 rounded-xl hover:bg-chocolate-50 transition-colors flex-shrink-0">
              Reschedule
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
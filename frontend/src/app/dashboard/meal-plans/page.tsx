"use client";

const mealPlans = [
  { id: 1, client: "Emma Wilson", title: "Low-Carb Reset", calories: 1800, days: 3, status: "Active" },
  { id: 2, client: "James Carter", title: "High-Protein Muscle Gain", calories: 2600, days: 3, status: "Active" },
  { id: 3, client: "Sophia Lee", title: "Mediterranean Balance", calories: 2000, days: 3, status: "Draft" },
  { id: 4, client: "Michael Chen", title: "Plant-Based Starter", calories: 1900, days: 3, status: "Active" },
];

export default function MealPlansPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-serif text-chocolate-900">
            Meal Plans
          </h1>
          <p className="text-chocolate-400 mt-1">Active and draft meal plans for your clients.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {mealPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl border border-chocolate-100 p-5 hover:border-sage-400 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    plan.status === "Active"
                      ? "text-sage-600 bg-sage-100"
                      : "text-chocolate-400 bg-chocolate-50"
                  }`}
                >
                  {plan.status}
                </span>
                <span className="text-xs text-chocolate-400">{plan.days}-Day Plan</span>
              </div>
              <h3 className="text-base font-semibold text-chocolate-900 mb-1">{plan.title}</h3>
              <p className="text-sm text-chocolate-400 mb-3">For {plan.client}</p>
              <p className="text-sm font-medium text-chocolate-700">{plan.calories} kcal/day</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
"use client";

import { UserPlus, Calendar, ClipboardList, TrendingUp } from "lucide-react";

const steps = [
  { number: "01", icon: UserPlus, title: "Onboard Clients", description: "Easily import or manually add client profiles with comprehensive health assessments, dietary preferences, and goals." },
  { number: "02", icon: Calendar, title: "Schedule Consultations", description: "Set your availability, let clients book directly, and manage your calendar with automated reminders and follow-ups." },
  { number: "03", icon: ClipboardList, title: "Create Meal Plans", description: "Design personalized meal plans using our AI-assisted recipe builder, complete with macro tracking and grocery lists." },
  { number: "04", icon: TrendingUp, title: "Track & Optimize", description: "Monitor client progress with real-time analytics, adjust plans dynamically, and celebrate milestones together." },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-chocolate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-chocolate-900 mb-6">
            How It <span className="text-sage-600">Works</span>
          </h2>
          <p className="text-lg text-chocolate-400 leading-relaxed">
            Get started in minutes with our intuitive workflow designed for busy professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px bg-sage-200/60" />
                )}
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-chocolate-700 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-chocolate-700/20 mb-6">
                    {step.number}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-chocolate-100 flex items-center justify-center mb-5 shadow-sm">
                    <Icon className="w-6 h-6 text-sage-600" />
                  </div>
                  <h3 className="text-lg font-bold text-chocolate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-chocolate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
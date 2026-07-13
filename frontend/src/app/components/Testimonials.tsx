"use client";

import { Quote } from "lucide-react";

const useCases = [
  { name: "For Clinical Practice", avatar: "CP", content: "Manage your full client roster, generate AI-assisted meal plans, and track appointments — all from one dashboard built specifically for dietitians." },
  { name: "For Sports Nutrition", avatar: "SN", content: "Create structured, goal-based nutrition plans quickly, and keep every client's progress and history organized in one place." },
  { name: "For Growing Practices", avatar: "GP", content: "Invite clients with a single link, answer questions publicly or privately, and build a knowledge base your whole client community can benefit from." },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-chocolate-900 mb-6">
            Built for <span className="text-sage-600">Professionals</span>
          </h2>
          <p className="text-lg text-chocolate-400 leading-relaxed">
            Designed around the real day-to-day workflow of dietitians and their clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase) => (
            <div
              key={useCase.name}
              className="relative p-8 rounded-3xl bg-chocolate-50 border border-chocolate-100 hover:border-sage-400 hover:shadow-lg hover:shadow-sage-100/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-sage-200" />
              </div>
              <p className="text-chocolate-600 leading-relaxed mb-8 text-sm">{useCase.content}</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-sage-600">{useCase.avatar}</span>
                </div>
                <p className="text-sm font-bold text-chocolate-900">{useCase.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
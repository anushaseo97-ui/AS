"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "AI-generated meal plans",
  "Client & appointment management",
  "Community Q&A support",
  "No credit card required",
];

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-chocolate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-chocolate-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white mb-6">
          Ready to Transform Your <span className="text-sage-400">Practice</span>?
        </h2>
        <p className="text-lg text-chocolate-200 max-w-2xl mx-auto mb-10">
          Join the growing community of dietitians who have elevated their practice with NutriLife. Start your free trial today.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-2 px-4 py-2 bg-sage-900/20 border border-sage-700/40 rounded-full">
              <Check className="w-4 h-4 text-sage-400" />
              <span className="text-sm text-sage-100">{benefit}</span>
            </div>
          ))}
        </div>

        <Link
          href="/signup"
          className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-sage-600 text-white font-semibold text-lg rounded-2xl shadow-2xl shadow-sage-600/25 hover:bg-sage-500 hover:shadow-sage-600/40 transition-all duration-300"
        >
          Start Your Free Trial
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

        <p className="mt-6 text-sm text-chocolate-400">No credit card required.</p>
      </div>
    </section>
  );
}


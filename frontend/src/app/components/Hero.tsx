"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Shield } from "lucide-react";
import NutritionWheel from "./NutritionWheel";
import SketchyBackground from "./SketchyBackground";
import ConnectorRope from "./ConnectorRope";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-chocolate-50/50 pt-20">
      <SketchyBackground />
      <ConnectorRope />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-50 border border-sage-100 rounded-full">
              <Sparkles className="w-4 h-4 text-sage-600" />
              <span className="text-sm font-medium text-sage-600">
                Built for Modern Nutrition Practices
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-chocolate-900 leading-tight tracking-tight">
                Transform Your{" "}
                <span className="text-sage-600">Nutrition</span> Practice
              </h1>
              <p className="text-lg sm:text-xl text-chocolate-400 max-w-xl leading-relaxed">
                Streamline client consultations, automate meal planning, and
                deliver personalized wellness tracking — all in one elegant
                platform.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-chocolate-700 text-white font-semibold rounded-2xl shadow-xl shadow-chocolate-700/25 hover:bg-chocolate-900 transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-chocolate-400">
                <Shield className="w-4 h-4 text-sage-500" />
                <span>Secure Authentication</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-chocolate-400">
                <Sparkles className="w-4 h-4 text-sage-500" />
                <span>AI-Powered Meal Planning</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative hidden lg:block h-[500px] flex items-center justify-center">
            <NutritionWheel />
          </div>
        </div>
      </div>
    </section>
  );
}


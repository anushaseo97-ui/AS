"use client";

import Link from "next/link";
import { ArrowRight, Play, Sparkles, Shield, Clock } from "lucide-react";
import FallingVitamins from "./FallingVitamins";
import SketchyBackground from "./SketchyBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-chocolate-50/50 pt-20">
  <SketchyBackground />

     <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
    {/* ... baaki same rahega ... */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-50 border border-sage-100 rounded-full">
              <Sparkles className="w-4 h-4 text-sage-600" />
              <span className="text-sm font-medium text-sage-600">
                Trusted by 2,500+ Dietitians Worldwide
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

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-chocolate-700 text-white font-semibold rounded-2xl shadow-xl shadow-chocolate-700/25 hover:bg-chocolate-900 transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-chocolate-700 font-semibold rounded-2xl border border-chocolate-100 hover:border-sage-400 hover:bg-sage-50/50 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center group-hover:bg-sage-200 transition-colors">
                  <Play className="w-3.5 h-3.5 text-sage-600 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-chocolate-400">
                <Shield className="w-4 h-4 text-sage-500" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-chocolate-400">
                <Clock className="w-4 h-4 text-sage-500" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-chocolate-400">
                <Sparkles className="w-4 h-4 text-sage-500" />
                <span>Free 14-day Trial</span>
              </div>
            </div>
          </div>

          {/* Right Content - Animation confined here only */}
          <div className="relative hidden lg:block h-[500px]">
            <FallingVitamins count={14} />
          </div>
        </div>
      </div>
    </section>
  );
}
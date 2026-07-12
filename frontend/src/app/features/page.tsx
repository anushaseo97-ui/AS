"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Utensils, Activity, Users, Shield, Zap } from "lucide-react";

const featureList = [
  { icon: Utensils, title: "AI Meal Planning", desc: "Get smart, nutrition-focused meal plans generated instantly for your goals." },
  { icon: Activity, title: "Progress Tracking", desc: "Visualize your weight, hydration, and calorie intake with interactive dashboards." },
  { icon: Zap, title: "Customized Macros", desc: "Adjust your protein, fat, and carb targets based on expert recommendations." },
  { icon: Users, title: "Dietitian Connection", desc: "Direct messaging and appointment booking with verified nutrition professionals." },
  { icon: Shield, title: "Secure Privacy", desc: "Your health data is encrypted and kept completely private, always." },
  { icon: Shield, title: "Expert Vetting", desc: "Every dietitian on our platform is verified for your safety and success." },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold font-serif text-chocolate-900">Everything you need to thrive</h1>
          <p className="text-chocolate-500 mt-4 text-lg">Powerful tools built to help you reach your health goals faster.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((feat) => (
            <div key={feat.title} className="p-8 rounded-3xl border border-chocolate-100 hover:border-sage-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-sage-50 flex items-center justify-center mb-6">
                <feat.icon className="w-6 h-6 text-chocolate-500" />
              </div>
              <h3 className="text-lg font-bold text-chocolate-900">{feat.title}</h3>
              <p className="text-chocolate-500 mt-2 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
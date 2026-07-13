"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Check } from "lucide-react";
import Link from "next/link";

const tiers = [
  { name: "Starter", price: "$29", features: ["Basic Meal Plans", "Weekly Tracking", "Email Support"] },
  { name: "Pro", price: "$59", features: ["Customized Plans", "Daily Tracking", "Priority Support", "App Access"] },
  { name: "Enterprise", price: "$99", features: ["1-on-1 Coaching", "Advanced Analytics", "Personalized Consultation", "24/7 Access"] },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-chocolate-50">
      <Navbar />
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold font-serif text-chocolate-900">Simple, Transparent Pricing</h1>
          <p className="text-chocolate-500 mt-4 text-lg">Choose the plan that fits your wellness journey.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div key={tier.name} className="bg-white p-8 rounded-3xl border border-chocolate-100 flex flex-col">
              <h3 className="text-xl font-bold text-chocolate-900">{tier.name}</h3>
              <p className="text-4xl font-bold text-chocolate-900 my-6">{tier.price}<span className="text-base font-normal text-chocolate-400">/mo</span></p>
              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-chocolate-600 text-sm">
                    <Check className="w-5 h-5 text-sage-600" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="w-full py-3 bg-chocolate-700 text-white font-semibold rounded-xl hover:bg-chocolate-900 transition-colors text-center">
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
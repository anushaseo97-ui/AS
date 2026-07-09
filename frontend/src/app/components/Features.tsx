"use client";

import {
  LayoutDashboard,
  CalendarCheck,
  MessageCircle,
  Utensils,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    description:
      "Central control panel to manage client profiles, update meal schedules, and review comprehensive patient analytics at a glance.",
  },
  {
    icon: CalendarCheck,
    title: "Smart Scheduling",
    description:
      "Automated booking portal with real-time availability, calendar sync, and automated reminders for both you and your clients.",
  },
  {
    icon: MessageCircle,
    title: "Community Q&A",
    description:
      "Interactive discussion space for community engagement, public wellness queries, and direct expert responses.",
  },
  {
    icon: Utensils,
    title: "Dietary Workspace",
    description:
      "Personalized platform for individual dietary management, progress tracking, and expert-curated lifestyle plans.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Deep insights into client progress, meal adherence, and health metrics with beautiful, exportable reports.",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA Compliant",
    description:
      "Enterprise-grade security with end-to-end encryption, secure data storage, and full HIPAA compliance.",
  },
];

export default function Features() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-50 border border-sage-100 rounded-full mb-6">
            <span className="text-sm font-medium text-sage-600">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-chocolate-900 mb-6">
            Everything You Need to <span className="text-sage-600">Thrive</span>
          </h2>
          <p className="text-lg text-chocolate-400 leading-relaxed">
            A complete suite of tools designed specifically for modern dietitians who demand excellence in their practice.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group p-8 rounded-3xl bg-white border border-chocolate-100 hover:border-sage-400 hover:shadow-xl hover:shadow-sage-100/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-sage-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-sage-600" />
                </div>
                <h3 className="text-xl font-bold text-chocolate-900 mb-3">{feature.title}</h3>
                <p className="text-chocolate-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
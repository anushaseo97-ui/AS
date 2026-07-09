"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Dr. Emily Roberts", role: "Clinical Dietitian", location: "New York, USA", avatar: "ER", content: "NutriLife has completely transformed how I manage my practice. The meal planning tools alone save me 10 hours a week. My clients love the progress tracking features.", rating: 5 },
  { name: "Dr. Michael Chen", role: "Sports Nutritionist", location: "Sydney, Australia", avatar: "MC", content: "The analytics dashboard is incredibly powerful. I can see exactly where each client is thriving and where they need more support. The automated scheduling is a game-changer.", rating: 5 },
  { name: "Dr. Priya Sharma", role: "Pediatric Dietitian", location: "Mumbai, India", avatar: "PS", content: "As someone who works with children, the intuitive interface makes it easy for parents to engage with meal plans. The community Q&A feature has built a wonderful support network.", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-chocolate-900 mb-6">
            Loved by <span className="text-sage-600">Professionals</span>
          </h2>
          <p className="text-lg text-chocolate-400 leading-relaxed">
            Join thousands of dietitians who have elevated their practice with NutriLife.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative p-8 rounded-3xl bg-chocolate-50 border border-chocolate-100 hover:border-sage-400 hover:shadow-lg hover:shadow-sage-100/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-sage-200" />
              </div>
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-chocolate-600 leading-relaxed mb-8 text-sm">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-sage-600">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-chocolate-900">{testimonial.name}</p>
                  <p className="text-xs text-chocolate-400">{testimonial.role} · {testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
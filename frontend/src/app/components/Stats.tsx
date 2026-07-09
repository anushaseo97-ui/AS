"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Calendar, Award, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: 2500, suffix: "+", label: "Active Dietitians" },
  { icon: Calendar, value: 150000, suffix: "+", label: "Consultations Done" },
  { icon: Award, value: 98, suffix: "%", label: "Client Satisfaction" },
  { icon: Globe, value: 45, suffix: "+", label: "Countries Served" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 lg:py-28 bg-chocolate-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-chocolate-100 text-sm font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
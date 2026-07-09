"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Colorful particle shapes - pills, tablets, capsules in varied colors
const PARTICLE_TYPES = [
  (color: string, color2: string, key: number) => (
    <svg key={key} width="22" height="12" viewBox="0 0 22 12">
      <path d="M11 0 H17 A6 6 0 0 1 17 12 H11 Z" fill={color} />
      <path d="M11 0 H5 A6 6 0 0 0 5 12 H11 Z" fill={color2} />
    </svg>
  ),
  (color: string, _color2: string, key: number) => (
    <svg key={key} width="15" height="15" viewBox="0 0 15 15">
      <circle cx="7.5" cy="7.5" r="7.5" fill={color} />
      <circle cx="5.5" cy="5.5" r="2" fill="white" fillOpacity="0.5" />
    </svg>
  ),
  (color: string, _color2: string, key: number) => (
    <svg key={key} width="16" height="16" viewBox="0 0 16 16">
      <path d="M8 0 C 14 2, 16 8, 8 16 C 0 8, 2 2, 8 0 Z" fill={color} fillOpacity="0.9" />
    </svg>
  ),
];

// Bright, varied colors - still colorful vitamins, contrasting against the warm brown capsule
const COLOR_PAIRS = [
  ["#6B8E5A", "#ffffff"],
  ["#f97316", "#ffffff"],
  ["#ef4444", "#ffffff"],
  ["#3b82f6", "#ffffff"],
  ["#eab308", "#ffffff"],
  ["#ec4899", "#ffffff"],
  ["#8b5cf6", "#ffffff"],
];

interface Particle {
  id: number;
  left: string;
  delay: number;
  duration: number;
  drift: number;
  typeIndex: number;
  colorPair: string[];
  scale: number;
}

export default function FallingVitamins({ count = 26 }: { count?: number }) {
  // Start empty on both server and client, so the very first render matches
  // (avoids hydration mismatch). Random particles are generated only after
  // mount, purely in the browser.
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: `${50 + (Math.random() * 20 - 10)}%`,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 4,
        drift: (Math.random() - 0.5) * 180,
        typeIndex: Math.floor(Math.random() * PARTICLE_TYPES.length),
        colorPair: COLOR_PAIRS[Math.floor(Math.random() * COLOR_PAIRS.length)],
        scale: 0.8 + Math.random() * 1,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Luminous warm glow behind the capsule */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-chocolate-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-sage-100/60 rounded-full blur-2xl" />

      {/* BIG centered capsule, lying horizontal, split open left/right */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
        {/* Left half - chocolate brown */}
        <motion.div
          className="w-[180px] h-[180px] bg-chocolate-700 shadow-2xl relative overflow-hidden"
          style={{ borderRadius: "90px 0 0 90px" }}
          initial={{ x: 0, rotate: 0 }}
          animate={{ x: [-6, 0, -6], rotate: [-3, -1, -3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute top-8 left-7 w-3.5 h-7 rounded-full bg-white/20" />
        </motion.div>

        {/* Gap where particles emerge from */}
        <div className="w-5" />

        {/* Right half - warm cream */}
        <motion.div
          className="w-[180px] h-[180px] bg-chocolate-50 border-2 border-chocolate-200 shadow-2xl"
          style={{ borderRadius: "0 90px 90px 0" }}
          initial={{ x: 0, rotate: 0 }}
          animate={{ x: [6, 0, 6], rotate: [3, 1, 3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Colorful particles falling from the opening (center gap) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: p.left, top: "48%", scale: p.scale }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: ["0%", "380%"],
            opacity: [0, 1, 1, 0],
            rotate: [0, 220, 400],
            x: [0, p.drift],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeIn",
          }}
        >
          {PARTICLE_TYPES[p.typeIndex](p.colorPair[0], p.colorPair[1], p.id)}
        </motion.div>
      ))}
    </div>
  );
}
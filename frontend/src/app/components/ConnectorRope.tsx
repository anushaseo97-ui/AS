// src/app/components/ConnectorRope.tsx
"use client";

import { motion } from "framer-motion";

const dots = [
  { color: "#D9C2AE", delay: 0, offset: 0 },
  { color: "#E0A02E", delay: 0.4, offset: 0.35 },
  { color: "#8FA876", delay: 0.8, offset: 0.7 },
];

export default function ConnectorRope() {
  // Path arcs from left (near the heading), curves up and over the wheel,
  // then comes down to rest on the right side of the wheel.
  const path =
    "M 10 260 C 100 220, 160 100, 300 60 C 420 30, 520 40, 600 90 C 660 125, 690 170, 690 220";

  return (
    <svg
      viewBox="0 0 720 320"
      className="absolute top-10 left-[30%] w-[600px] h-[280px] pointer-events-none hidden lg:block z-10"
      fill="none"
    >
      <motion.path
        d={path}
        stroke="#8FA876"
        strokeWidth="3"
        strokeDasharray="10 10"
        strokeLinecap="round"
        opacity="0.55"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      />

      {/* Traveling particles along the same path */}
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          r="8"
          fill={d.color}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: d.delay,
          }}
        >
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin={`${d.delay}s`}
            path={path}
          />
        </motion.circle>
      ))}

      {/* Small resting dot where the rope ends on the right of the wheel */}
      <motion.circle
        cx="690"
        cy="220"
        r="6"
        fill="#557246"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
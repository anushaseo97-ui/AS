"use client";

import { motion } from "framer-motion";

const dots = [
  { color: "#D9C2AE", delay: 0 },
  { color: "#E0A02E", delay: 0.4 },
  { color: "#8FA876", delay: 0.8 },
];

export default function ConnectorRope() {
  // Extended further down so the line visibly overlaps into the wheel's top edge
  const path =
    "M 10 260 C 100 220, 160 100, 300 60 C 420 30, 520 40, 600 90 C 660 125, 690 170, 690 235";

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
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          r="8"
          fill={d.color}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: d.delay }}
        >
          <animateMotion dur="4s" repeatCount="indefinite" begin={`${d.delay}s`} path={path} />
        </motion.circle>
      ))}
    </svg>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wheat, Droplet, Citrus, Leaf, Gem, Zap } from "lucide-react";

const segments = [
  { label: "Protein", description: "Builds & repairs muscle tissue", color: "#C4634A", icon: Zap },
  { label: "Carbs", description: "Primary energy source for the body", color: "#E0A02E", icon: Wheat },
  { label: "Fats", description: "Supports hormones & cell health", color: "#D9C2AE", icon: Droplet },
  { label: "Vitamins", description: "Boosts immunity & metabolism", color: "#8FA876", icon: Citrus },
  { label: "Fiber", description: "Aids digestion & gut health", color: "#557246", icon: Leaf },
  { label: "Minerals", description: "Strengthens bones & nerve function", color: "#8B6F5C", icon: Gem },
];

const CENTER = 190;
const RADIUS = 160;
const ANGLE_PER = 360 / segments.length;
const FEED_DURATION = 3000; // ms — rest time on each slice (increased so it's readable)
const ROTATE_DURATION = 1100; // ms — smooth turn to next slice

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function segmentPath(index: number, total: number) {
  const start = polarToCartesian(CENTER, CENTER, RADIUS, (index + 1) * ANGLE_PER - ANGLE_PER / 2);
  const end = polarToCartesian(CENTER, CENTER, RADIUS, index * ANGLE_PER - ANGLE_PER / 2);
  return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 0 ${end.x} ${end.y} Z`;
}

function segmentMidAngle(index: number) {
  return index * ANGLE_PER ;
}

// Feed point sits right where the rope meets the wheel's rim
const FEED_POINT = { x: CENTER, y: CENTER - RADIUS - 6 };

export default function NutritionWheel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<"feeding" | "rotating">("feeding");
  const [feedTick, setFeedTick] = useState(0);
  const stepCount = useRef(0); // never resets — keeps growing so rotation never snaps back
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Rotation always increases (clockwise, moving right) — never wraps back to a smaller value
  const rotation = stepCount.current * ANGLE_PER ;

  useEffect(() => {
  if (phase === "feeding") {
    setFeedTick((t) => t + 1);
    timeoutRef.current = setTimeout(() => {
      // Start the rotation NOW — move to the next slice and switch phase,
      // so the wheel begins animating toward it immediately.
      stepCount.current += 1;
      setActiveIndex((segments.length - (stepCount.current % segments.length)) % segments.length);
      setPhase("rotating");
    }, FEED_DURATION);
  } else {
    // Wait for the rotation animation to fully finish before feeding starts again
    timeoutRef.current = setTimeout(() => setPhase("feeding"), ROTATE_DURATION);
  }
  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, [phase]);

  const isLifted = phase === "feeding";

  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      <svg viewBox="0 0 380 380" className="w-full h-full overflow-visible">
        <defs>
          <filter id="sliceShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Rotating wheel group — always spins the same direction (clockwise) */}
        <motion.g
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          animate={{ rotate: rotation }}
          transition={{ duration: ROTATE_DURATION / 1000, ease: "easeInOut" }}
        >
          {segments.map((seg, i) => {
            const isActive = i === activeIndex;
            const midAngle = segmentMidAngle(i);
            const midRad = ((midAngle - 90) * Math.PI) / 180;
            const liftOffset = isActive && isLifted ? 26 : 0;
            const dx = Math.cos(midRad) * liftOffset;
            const dy = Math.sin(midRad) * liftOffset;
            const iconPos = polarToCartesian(CENTER, CENTER, RADIUS * 0.68, midAngle);
            const Icon = seg.icon;

            return (
              <g key={seg.label} transform={`translate(${dx}, ${dy})`}>
                <path
                  d={segmentPath(i, segments.length)}
                  fill={seg.color}
                  stroke={isActive && isLifted ? seg.color : "#F7F2EE"}
                  strokeWidth={isActive && isLifted ? 5 : 3}
                  opacity={isActive ? 1 : 0.8}
                  style={{
                    filter: isActive && isLifted ? `drop-shadow(0 0 6px ${seg.color}90)` : "none",
                    transition: "opacity 0.4s, stroke 0.4s",
                  }}
                />
                <motion.g
                  style={{ transformOrigin: `${iconPos.x}px ${iconPos.y}px` }}
                  animate={{ rotate: -rotation }}
                  transition={{ duration: ROTATE_DURATION / 1000, ease: "easeInOut" }}
                >
                  <foreignObject x={iconPos.x - 17} y={iconPos.y - 17} width="34" height="34" style={{ pointerEvents: "none" }}>
                    <div className="w-8.5 h-8.5 rounded-full bg-white/95 flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4" style={{ color: seg.color }} />
                    </div>
                  </foreignObject>
                </motion.g>
              </g>
            );
          })}
        </motion.g>

        {/* Feeding dots — now travel further INTO the slice, past the rim, so it visibly "fills" it */}
        {phase === "feeding" &&
          [0, 0.15, 0.3].map((delay, idx) => (
            <motion.circle
              key={`${feedTick}-${idx}`}
              r={5 - idx * 0.5}
              fill={segments[activeIndex].color}
              initial={{ cx: FEED_POINT.x, cy: FEED_POINT.y, opacity: 0.9 }}
              animate={{ cx: CENTER, cy: CENTER - RADIUS * 0.35, opacity: 0 }}
              transition={{ duration: 0.8, delay, ease: "easeIn" }}
            />
          ))}

        {/* Center hub */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r="40"
          fill="#F7F2EE"
          stroke="#EDE0D6"
          strokeWidth="2"
          animate={{
            r: [40, 43, 40],
            filter: [
              "drop-shadow(0 0 0px #8FA87600)",
              "drop-shadow(0 0 10px #8FA87680)",
              "drop-shadow(0 0 0px #8FA87600)",
            ],
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x={CENTER}
          y={CENTER + 5}
          textAnchor="middle"
          className="font-serif font-bold"
          style={{ fontSize: "14px", fill: "#3E2723" }}
        >
          Nutrition
        </text>
      </svg>

      <AnimatePresence mode="wait">
        {isLifted && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full bg-white rounded-xl border border-chocolate-100 shadow-lg px-4 py-2.5 text-center whitespace-nowrap z-10"
          >
            <p className="text-sm font-semibold text-chocolate-900">{segments[activeIndex].label}</p>
            <p className="text-xs text-chocolate-400 mt-0.5">{segments[activeIndex].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
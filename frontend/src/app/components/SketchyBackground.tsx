// src/app/components/SketchyBackground.tsx
"use client";

const icons = [
  {
    // Apple (simplified: circle + stem)
    path: (
      <>
        <circle cx="12" cy="14" r="7" />
        <path d="M12 7V4" />
        <path d="M12 4c1-1 2-1 3-0.5" />
      </>
    ),
    top: "4%",
    left: "4%",
    size: 58,
    rotate: -10,
  },
  {
    // Leaf
    path: (
      <>
        <path d="M4 20c8-1 14-7 15-16-9 1-15 7-15 16z" />
        <path d="M6 18c3-4 6-7 11-11" />
      </>
    ),
    top: "10%",
    left: "17%",
    size: 46,
    rotate: 12,
  },
  {
    // Carrot (simplified triangle)
    path: (
      <>
        <path d="M15 4 5 19l4-3 4 4 4-13-2-3z" />
        <path d="M14 5c1-1 2-1 3-0.5" />
      </>
    ),
    top: "2%",
    left: "31%",
    size: 52,
    rotate: 18,
  },
  {
    // Droplet
    path: <path d="M12 2.7 17.7 8.3a8 8 0 1 1-11.4 0z" />,
    top: "8%",
    left: "44%",
    size: 44,
    rotate: -6,
  },
  {
    // Avocado (simplified)
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
    top: "3%",
    left: "56%",
    size: 54,
    rotate: 8,
  },
  {
    // Citrus slice
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
      </>
    ),
    top: "11%",
    left: "68%",
    size: 48,
    rotate: 15,
  },
  {
    // Broccoli (simplified)
    path: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="14" cy="7" r="3" />
        <circle cx="16" cy="11" r="2.5" />
        <path d="M11 10 9 21" />
      </>
    ),
    top: "3%",
    left: "80%",
    size: 50,
    rotate: -14,
  },
  {
    // Fork
    path: (
      <>
        <path d="M8 3v7a2 2 0 0 0 4 0V3" />
        <path d="M10 10v11" />
      </>
    ),
    top: "9%",
    left: "92%",
    size: 40,
    rotate: 10,
  },
];

export default function SketchyBackground() {
  return (
   <div className="absolute top-20 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
      {icons.map((icon, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute text-chocolate-400/40"
          style={{
            top: icon.top,
            left: icon.left,
            width: icon.size,
            height: icon.size,
            transform: `rotate(${icon.rotate}deg)`,
          }}
        >
          {icon.path}
        </svg>
      ))}
    </div>
  );
}
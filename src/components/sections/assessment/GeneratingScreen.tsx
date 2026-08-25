"use client";

import { useEffect, useState } from "react";

const stages = [
  "Reading your answers...",
  "Looking at the friction...",
  "Finding your opportunity...",
];

export default function GeneratingScreen() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setStage((s) => Math.min(s + 1, stages.length - 1)),
      2200
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#1F2A44] min-h-[100svh] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {/* Three dots, each fading in turn */}
        <div className="flex items-center justify-center gap-2 mb-9" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-[#A2D2FF] assessment-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>

        <p
          className="font-clash font-bold text-white text-xl sm:text-2xl leading-snug mb-3"
          aria-live="polite"
        >
          {stages[stage]}
        </p>
        <p className="font-jakarta text-white/50 text-sm leading-relaxed">
          This takes a few seconds. Please don&apos;t close this page.
        </p>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type Tab = "assess" | "transform" | "adopt";

const phases: {
  id: Tab;
  label: string;
  number: string;
  visualTitle: string;
  visualSubtitle: string;
  icon: string;
  accent: string;
  body: string[];
  highlight: string;
  quote: string;
}[] = [
  {
    id: "assess",
    label: "Assess",
    number: "01",
    visualTitle: "ASSESS",
    visualSubtitle: "Understand the current state",
    icon: "?",
    accent: "#A2D2FF",
    body: [
      "Every successful engagement begins with understanding how work happens today.",
      "We assess workflows, information flow, operational challenges, readiness, and organizational priorities before recommending any solution, implementation, or transformation initiative.",
      "Most organizations don't need more tools.",
      "They need clarity.",
    ],
    highlight: "Understand the problem before pursuing the solution.",
    quote: "Clarity creates better transformation decisions.",
  },
  {
    id: "transform",
    label: "Transform",
    number: "02",
    visualTitle: "TRANSFORM",
    visualSubtitle: "Redesign and implement what matters",
    icon: "→",
    accent: "#7CA9D8",
    body: [
      "Once opportunities are identified, we redesign workflows, information flows, and operational processes to improve execution and performance.",
      "Where implementation is required, we design and build practical AI-enabled solutions that support the desired future state and integrate into how work gets done.",
      "Transformation is not about adding technology.",
      "It's about improving outcomes.",
    ],
    highlight: "Improve how work gets done before scaling implementation.",
    quote: "Transformation happens when work changes.",
  },
  {
    id: "adopt",
    label: "Adopt",
    number: "03",
    visualTitle: "ADOPT",
    visualSubtitle: "Create sustainable change",
    icon: "✓",
    accent: "#5B8FC4",
    body: [
      "Building a solution is only part of the journey.",
      "Organizations need adoption strategies, capability building, leadership alignment, governance, and practical support to ensure new ways of working become sustainable.",
      "This is where long-term value is created.",
    ],
    highlight: "Build capability alongside implementation.",
    quote: "Adoption is where value becomes real.",
  },
];

export default function ApproachTabs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("assess");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.04 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = phases.find((p) => p.id === activeTab)!;

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden"
    >
      {/* Decorative corners — desktop only */}
      <div className="hidden lg:block absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-[#A2D2FF]/30 pointer-events-none" />
      <div className="hidden lg:block absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-[#A2D2FF]/30 pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* Section header */}
        <div className={`mb-8 md:mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
            Our Approach
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight">
            How Transformation Happens
          </h2>
        </div>

        {/* ══════════════════════════════════════════
            MOBILE  — stacked phase cards (hidden ≥ lg)
            ══════════════════════════════════════════ */}
        <div className="lg:hidden space-y-5">
          {phases.map((phase, i) => (
            <div
              key={phase.id}
              className={`rounded-3xl border border-[#DDE3EE] overflow-hidden bg-white shadow-sm transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Card header strip */}
              <div className="flex items-center gap-4 px-5 pt-5 pb-4 border-b border-[#DDE3EE]">
                {/* Number badge */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: phase.accent + "25" }}
                >
                  <span
                    className="font-clash font-extrabold text-xs tracking-wider"
                    style={{ color: phase.accent === "#A2D2FF" ? "#1F2A44" : phase.accent }}
                  >
                    {phase.number}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-clash font-extrabold text-[15px] text-[#1F2A44] uppercase tracking-wide leading-none">
                    {phase.visualTitle}
                  </p>
                  <p className="font-jakarta text-xs text-[#5a6580] mt-0.5">
                    {phase.visualSubtitle}
                  </p>
                </div>
              </div>

              {/* Body copy */}
              <div className="px-5 py-4 space-y-3">
                {phase.body.map((para, j) => (
                  <p
                    key={j}
                    className={`font-jakarta text-[14px] leading-relaxed ${
                      j >= phase.body.length - 2
                        ? "text-[#1F2A44] font-semibold"
                        : "text-[#5a6580]"
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Highlight + quote */}
              <div className="px-5 pb-5 space-y-3">
                <div className="bg-gradient-to-br from-[#E6EAF0] to-[#A2D2FF]/10 rounded-2xl px-4 py-3">
                  <p className="font-clash font-bold text-[#1F2A44] text-[13px] leading-snug">
                    {phase.highlight}
                  </p>
                </div>
                <blockquote className="pl-3 border-l-[3px] border-[#A2D2FF]">
                  <p className="font-clash text-[13px] font-semibold italic text-[#1F2A44]">
                    &ldquo;{phase.quote}&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            DESKTOP  — tab + side-panel (hidden < lg)
            ══════════════════════════════════════════ */}
        <div className="hidden lg:block">
          {/* Tab nav */}
          <div className={`mb-8 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
            <div className="flex gap-1 border-b-2 border-[#DDE3EE]">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setActiveTab(phase.id)}
                  className={`relative px-6 py-3 font-clash font-semibold text-sm transition-all duration-300 ${
                    activeTab === phase.id
                      ? "text-[#1F2A44]"
                      : "text-[#5a6580] hover:text-[#1F2A44]"
                  }`}
                >
                  {phase.label}
                  {activeTab === phase.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A2D2FF]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Two-column panel */}
          <div className={`grid grid-cols-12 gap-16 items-start transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

            {/* Left visual */}
            <div className="col-span-5">
              <div className="sticky top-24">
                <div className="aspect-square bg-gradient-to-br from-[#A2D2FF]/20 via-[#A2D2FF]/10 to-transparent rounded-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
                    <span className="text-[160px] font-clash font-bold text-[#1F2A44] leading-none select-none">
                      {active.icon}
                    </span>
                  </div>
                  <div className="relative z-10 text-center p-10">
                    <p className="font-clash font-extrabold text-5xl text-[#1F2A44] mb-2 tracking-tight">
                      {active.visualTitle}
                    </p>
                    <p className="font-jakarta text-sm text-[#5a6580]">
                      {active.visualSubtitle}
                    </p>
                  </div>
                  <div className="absolute top-8 right-8 w-16 h-16 bg-[#A2D2FF]/30 rounded-full blur-xl" />
                  <div className="absolute bottom-12 left-12 w-20 h-20 bg-[#5B6CFF]/20 rounded-full blur-xl" />
                </div>
                <div className="mt-6 pl-4 border-l-4 border-[#A2D2FF]">
                  <p className="font-clash text-sm font-semibold text-[#1F2A44] uppercase tracking-wide leading-relaxed">
                    The Refactrd Approach.<br />Built For Adoption.
                  </p>
                </div>
              </div>
            </div>

            {/* Right copy */}
            <div className="col-span-7">
              <div className="space-y-5 mb-7">
                {active.body.map((para, i) => (
                  <p
                    key={`${activeTab}-${i}`}
                    className={`font-jakarta text-[16px] leading-relaxed ${
                      i >= active.body.length - 2
                        ? "text-[#1F2A44] font-semibold"
                        : "text-[#5a6580]"
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div className="bg-gradient-to-br from-[#E6EAF0] to-[#A2D2FF]/10 rounded-2xl p-6 mb-5">
                <p className="font-clash font-bold text-[#1F2A44] text-[17px] leading-snug">
                  {active.highlight}
                </p>
              </div>
              <blockquote className="pl-4 border-l-4 border-[#A2D2FF]">
                <p className="font-clash text-lg font-semibold italic text-[#1F2A44]">
                  &ldquo;{active.quote}&rdquo;
                </p>
              </blockquote>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

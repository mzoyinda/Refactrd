"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const trustItems = [
  "Workflow Transformation",
  "AI Knowledge Systems",
  "AI-Enabled Products",
  "Intelligent Workflows",
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#E6EAF0] via-white to-white">

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#A2D2FF]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 w-full px-5 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 md:pt-32 lg:pt-40 lg:pb-28">
        <div className="max-w-4xl mx-auto text-center">

          {/* Label */}
          <div className={`mb-5 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1F2A44]/15 text-[#5a6580] text-[11px] font-clash font-semibold uppercase tracking-[0.14em] bg-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F2A44] flex-shrink-0" />
              {/* Shorter label on mobile */}
              <span className="sm:hidden">AI Transformation Studio</span>
              <span className="hidden sm:inline">AI Transformation Studio &amp; Adoption Partner</span>
            </span>
          </div>

          {/* Headline — mobile-first sizing */}
          <h1
            className={`font-clash font-bold text-[#1F2A44] leading-[1.08] tracking-tight mb-5 transition-all duration-700 delay-75
              text-[32px] sm:text-[42px] md:text-5xl lg:text-6xl xl:text-7xl
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Move From AI Experimentation
            <br className="hidden sm:block" />
            {" "}To{" "}
            <span className="relative">
              <span className="relative z-10 text-[#1F2A44]">Operational Adoption</span>
              {/* Underline accent — only visible md+ where wrapping is predictable */}
              <span className="hidden md:block absolute bottom-1 left-0 w-full h-3 lg:h-4 bg-[#A2D2FF]/40 -z-0 rounded-sm" />
            </span>
          </h1>

          {/* Body copy */}
          <p
            className={`font-jakarta text-[#475569] leading-relaxed mx-auto mb-8 transition-all duration-700 delay-150
              text-[15px] sm:text-base lg:text-lg
              max-w-[90%] sm:max-w-xl lg:max-w-3xl
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Refactrd helps organizations identify opportunities, redesign workflows, implement practical AI solutions, and create measurable operational impact.
          </p>

          {/* CTAs — stacked on mobile, row on sm+ */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-700 delay-200
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <Link
              href="/get-started"
              className="group inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-white font-clash font-bold rounded-full transition-all duration-300 hover:bg-[#263352] hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto
                px-7 py-4 text-[15px] sm:text-base"
            >
              Find Your Starting Point
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/approach"
              className="inline-flex items-center justify-center font-clash font-semibold border border-[#1F2A44]/25 text-[#1F2A44] rounded-full transition-all duration-300 hover:bg-[#1F2A44] hover:text-white hover:border-[#1F2A44] w-full sm:w-auto
                px-7 py-4 text-[15px] sm:text-base"
            >
              Explore How We Help
            </Link>
          </div>

          {/* Trust strip — 2-col grid on mobile, single row on md+ */}
          <div
            className={`mt-10 md:mt-12 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <p className="font-clash text-[10px] sm:text-xs uppercase tracking-[0.16em] text-[#94A3B8] mb-3">
              Transformation Areas
            </p>
            {/* Mobile: 2-column grid | Desktop: single centered row */}
            <div className="grid grid-cols-2 gap-2 sm:hidden max-w-[320px] mx-auto">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-[#E2E8F0] text-[#475569] font-clash font-medium text-[11px] shadow-sm justify-center"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
            <div className="hidden sm:flex items-center justify-center gap-3">
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#475569] font-clash font-medium text-xs shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

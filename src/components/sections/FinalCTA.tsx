"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  headingPrefix?: string;
  headingAccent?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function FinalCTA({
  headingPrefix = "Ready To Turn AI Into ",
  headingAccent = "Operational Impact?",
  body = "Whether you're redesigning workflows, building an AI assistant, improving operations, or exploring AI-enabled products, we'll help you identify the right opportunity and determine the best way forward.",
  primaryLabel = "Talk With Refactrd",
  primaryHref = "/get-started",
  secondaryLabel,
  secondaryHref,
}: FinalCTAProps) {
  return (
    <section className="section-padding bg-[#1F2A44] overflow-hidden relative">
      {/* Subtle background texture, matching other dark sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(162,210,255,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0e5d7d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl lg:text-6xl font-clash font-bold text-white leading-tight mb-6">
            {headingPrefix}
            <span className="relative inline-block">
              <span className="relative z-10">{headingAccent}</span>
              <span className="hidden md:block absolute bottom-1 left-0 w-full h-3 lg:h-4 bg-[#A2D2FF]/40 -z-0 rounded-sm" />
            </span>
          </h2>

          {/* Subheading */}
          <p className="font-jakarta text-white/70 text-base sm:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            {body}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryHref}
              className="group inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-[#E6EAF0] rounded-full transition-all duration-300 hover:scale-105 px-8 py-4 font-clash font-bold"
            >
              {primaryLabel}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center font-clash font-semibold border border-white/25 text-white rounded-full transition-all duration-300 hover:bg-white hover:text-[#1F2A44] px-8 py-4"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ArrowRight, Clock, Lock, FileText } from "lucide-react";
import { PHASES, QUESTIONS } from "@/lib/assessment/questions";

const assurances = [
  { icon: Clock, label: `${QUESTIONS.length} questions`, detail: "About four minutes" },
  { icon: FileText, label: "A written report", detail: "Yours to keep or share" },
  { icon: Lock, label: "One workflow", detail: "No prep, no data required" },
];

export default function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative bg-[#1F2A44] overflow-hidden min-h-[100svh] flex items-center py-20 sm:py-24">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(162,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-custom relative z-10 w-full">
        <div className="max-w-3xl">
          <p className="font-clash font-bold text-[10px] uppercase tracking-[0.24em] text-[#A2D2FF]/70 mb-6">
            Founders Conference · AI Opportunity Assessment
          </p>

          <h1 className="font-clash font-bold text-white leading-[1.04] tracking-tight mb-7 text-[38px] sm:text-[52px] lg:text-[62px]">
            Find your AI opportunity.
          </h1>

          <p className="font-jakarta text-white/75 text-base sm:text-lg leading-relaxed max-w-2xl mb-4">
            Take a few minutes to look at one real workflow in your business.
          </p>
          <p className="font-jakarta text-white/60 text-[15px] sm:text-base leading-relaxed max-w-2xl mb-10">
            We&apos;ll help you identify where the friction is, what could change, and where AI can create meaningful leverage.
          </p>

          {/* Phase preview */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-10">
            {PHASES.map((phase, i) => (
              <div key={phase} className="flex items-center gap-3">
                {i > 0 && <span className="hidden sm:block w-6 h-px bg-white/15" />}
                <span className="font-jakarta text-[13px] text-white/45">
                  <span className="text-[#A2D2FF]/70 font-medium">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ml-2">{phase}</span>
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={onStart}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-[15px] transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2A44]"
          >
            Begin the assessment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          {/* Assurances */}
          <div className="grid sm:grid-cols-3 gap-5 sm:gap-8 mt-14 pt-10 border-t border-white/10">
            {assurances.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon className="w-4 h-4 text-[#A2D2FF]/60 mt-0.5 flex-shrink-0" strokeWidth={2} />
                <div>
                  <p className="font-clash font-semibold text-white text-sm leading-snug">{item.label}</p>
                  <p className="font-jakarta text-white/45 text-[13px] mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

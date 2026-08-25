"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Compass, FileText } from "lucide-react";

// Placeholder copy — replaced once the assessment brief lands.
const previewPoints = [
  {
    icon: ClipboardCheck,
    title: "A structured self-assessment",
    body: "A short guided set of questions about how your organization works today — no preparation needed.",
  },
  {
    icon: Compass,
    title: "A clear read on where you stand",
    body: "See which parts of your operation are ready for AI, and which need groundwork first.",
  },
  {
    icon: FileText,
    title: "A practical set of next steps",
    body: "Leave with specific, prioritized recommendations you can act on — whether or not you work with us.",
  },
];

export default function AssessmentComingSoon() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative bg-[#1F2A44] overflow-hidden pt-32 pb-20 md:pt-48 md:pb-28"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <div className={`mb-6 transition-all duration-600 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#A2D2FF]/10 border border-[#A2D2FF]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF]" />
                <span className="font-clash font-bold text-[10px] uppercase tracking-[0.22em] text-[#A2D2FF]">
                  Coming Soon
                </span>
              </span>
            </div>

            <h1
              className={`font-clash font-bold text-white leading-[1.06] tracking-tight mb-6 transition-all duration-700 delay-75
                text-[36px] sm:text-[48px] lg:text-[56px]
                ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              The Refactrd Assessment
            </h1>

            <div className={`space-y-4 mb-8 transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <p className="font-jakarta text-white/70 text-[15px] sm:text-base leading-relaxed">
                Find your AI opportunity. Take a few minutes to look at one real workflow in your business. We'll help you identify where the friction is, what could change, and where AI can create meaningful leverage.
              </p>
              <p className="font-jakarta text-white/70 text-[15px] sm:text-base leading-relaxed">
                It isn&apos;t ready to share just yet. In the meantime, we&apos;re happy to walk through the same questions with you directly.
              </p>
            </div>

            <div className={`transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-[15px] transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
              >
                Talk With Refactrd
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT WILL DO */}
      <section className="bg-[#F8FAFC] border-b border-[#E8ECF2] py-14 md:py-16">
        <div className="container-custom">
          <p className="font-clash font-bold text-[9px] uppercase tracking-[0.22em] text-[#94A3B8] mb-10">
            What To Expect
          </p>
          <div className="grid sm:grid-cols-3 gap-8 lg:gap-10">
            {previewPoints.map((point) => (
              <div key={point.title} className="flex flex-col gap-3">
                <point.icon className="w-5 h-5 text-[#A2D2FF]" strokeWidth={2} />
                <h2 className="font-clash font-bold text-[#1F2A44] text-[17px] leading-snug">
                  {point.title}
                </h2>
                <p className="font-jakarta text-[#64748B] text-sm leading-relaxed">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL SECTION */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl font-clash font-bold text-[#1F2A44] mb-4 leading-tight">
            Don&apos;t Want To Wait?
          </h2>
          <p className="font-jakarta text-[#5a6580] text-base sm:text-lg leading-relaxed mb-8">
            The assessment is designed to start a conversation. If you already know what you&apos;re trying to solve, you can skip straight to that conversation today.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352]"
          >
            Start The Conversation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </>
  );
}

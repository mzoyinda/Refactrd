"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ApproachHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-24 pb-14 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Background blobs */}
      <div className="absolute top-1/3 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* ── MOBILE / TABLET layout: stacked ── */}
        {/* ── DESKTOP layout: two columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* Headline */}
            <h1
              className={`text-[36px] sm:text-5xl lg:text-[56px] font-clash font-bold text-[#1F2A44] leading-tight transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              The Refactrd Approach
            </h1>

            {/* Subheadline */}
            <p
              className={`font-jakarta text-base sm:text-lg text-[#5a6580] leading-relaxed transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              A practical system for moving from AI experimentation to operational adoption.
            </p>

            {/* Badge */}
            <div
              className={`inline-flex flex-wrap items-start gap-2 bg-[#A2D2FF]/15 border border-[#A2D2FF]/30 rounded-2xl px-4 py-3 transition-all duration-700 delay-150 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F2A44] mt-[6px] flex-shrink-0" />
              <span className="font-clash font-semibold text-sm text-[#1F2A44] leading-snug">
                Built around assessment, transformation, implementation, adoption, and measurable outcomes.
              </span>
            </div>

            {/* Main hero image — full width on mobile, shown in left col on desktop */}
            <div
              className={`relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-xl transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Image
                src="/images/abouthero-one.jpg"
                alt="Refactrd approach in action"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/50 via-transparent to-transparent" />

              {/* Floating tags */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {["✦ Assessment", "✦ Transformation", "✦ Adoption"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#1F2A44] rounded-full text-xs font-clash font-semibold shadow-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-6">

            {/* Second image — sits at top of right col on desktop, below left col on mobile (hidden on mobile, shown lg) */}
            <div
              className={`hidden lg:block relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <Image
                src="/images/abouthero-two.jpg"
                alt="Team planning session"
                fill
                className="object-cover"
              />
            </div>

            {/* Info Card */}
            <div
              className={`bg-[#1F2A44] rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-x-0 lg:translate-x-0 translate-y-0" : "opacity-0 translate-y-8 lg:translate-y-0 lg:translate-x-12"
              }`}
            >
              <p className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#A2D2FF] mb-4">
                How We Work
              </p>

              <div className="space-y-4 mb-7">
                <p className="font-jakarta text-[15px] text-white/75 leading-relaxed">
                  Most organizations don&apos;t struggle because they lack AI tools.
                </p>
                <p className="font-jakarta text-[15px] text-white/75 leading-relaxed">
                  They struggle because successful adoption requires clarity, workflow change, thoughtful implementation, capability building, and sustained execution.
                </p>
                <p className="font-jakarta text-[15px] text-white font-semibold leading-relaxed">
                  The Refactrd Approach provides a structured path for turning opportunities into measurable operational impact.
                </p>
              </div>

              <a
                href="#approach"
                className="inline-flex items-center gap-2 bg-[#A2D2FF] text-[#1F2A44] font-clash font-bold px-6 py-3.5 rounded-full hover:bg-white transition-colors duration-300 group text-sm sm:text-base"
              >
                Explore The Approach
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Second image shown on mobile/tablet below the card */}
            <div
              className={`lg:hidden relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Image
                src="/images/abouthero-two.jpg"
                alt="Team planning session"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

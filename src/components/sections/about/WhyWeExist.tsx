"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

export default function WhyWeExist() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Decorative corner frames */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-[#A2D2FF]/30" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-[#A2D2FF]/30" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Image/Visual Element */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative">
              {/* Large visual element - like the design */}
              <div className="aspect-square bg-gradient-to-br from-[#A2D2FF]/20 via-[#A2D2FF]/10 to-transparent rounded-3xl flex items-center justify-center relative overflow-hidden">
                {/* 3D-style text background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-[200px] font-clash font-bold text-[#1F2A44] leading-none select-none">
                    75
                  </span>
                </div>

                {/* Main visual content placeholder */}
                <div className="relative z-10 text-center p-12">
                  <div className="inline-block">
                    <div className="w-32 h-32 bg-[#A2D2FF] rounded-full flex items-center justify-center mb-6 shadow-2xl">
                      <span className="text-5xl font-clash font-bold text-white">R</span>
                    </div>
                    <div className="flex justify-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-[#1F2A44] text-[#1F2A44]"
                        />
                      ))}
                    </div>
                    <p className="text-sm font-clash font-semibold text-[#1F2A44] uppercase tracking-wider">
                      We're a creative and
                      <br />
                      talented team of engineers
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-[#A2D2FF]/30 rounded-full blur-xl" />
                <div className="absolute bottom-12 left-12 w-20 h-20 bg-[#5B6CFF]/20 rounded-full blur-xl" />
              </div>

              {/* Small tagline */}
              <div className="mt-8 pl-4 border-l-4 border-[#A2D2FF]">
                <p className="text-lg font-clash font-semibold text-[#1F2A44] uppercase tracking-wide">
                  Build With Refactrd.
                  <br />
                  Build Efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="max-w-2xl">
              {/* Section Tag */}
              <div className="mb-6">
                <span className="text-sm font-clash font-semibold text-[#64748B] uppercase tracking-wider">
                  Our Story
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-clash font-bold text-[#1F2A44] mb-8 leading-tight">
                Why Refactrd Exists
              </h2>

              {/* Content */}
              <div className="space-y-6">
                <p className="font-clash text-lg text-[#0F172A] leading-relaxed">
                  Many businesses reach a point where software becomes unavoidable.
                </p>

                <p className="font-clash text-base text-[#64748B] leading-relaxed">
                  Internal tools, customer platforms, operational systems, or
                  automation are needed to support growth. But building and
                  maintaining software internally is expensive, time-consuming, and
                  often distracting from core business priorities.
                </p>

                <p className="font-clash text-lg text-[#1F2A44] leading-relaxed font-semibold">
                  Refactrd exists to give businesses a reliable alternative.
                </p>

                <p className="font-clash text-base text-[#64748B] leading-relaxed">
                  We were created to take on the responsibility of software delivery
                  so organizations can move forward without assembling large internal
                  teams or managing fragmented technical work.
                </p>

                <div className="pt-6 mt-6 border-t-2 border-[#A2D2FF]/30">
                  <p className="font-clash text-xl text-[#1F2A44] leading-relaxed font-bold">
                    Our focus is not speed for its own sake, but clarity,
                    continuity, and dependable execution.
                  </p>
                </div>

                {/* Additional context */}
                <div className="bg-gradient-to-br from-[#E6EAF0] to-[#A2D2FF]/10 rounded-2xl p-6 lg:p-8 mt-8">
                  <p className="font-clash text-base text-[#0F172A] leading-relaxed">
                    We understand that every line of code, every architectural
                    decision, and every piece of documentation represents a commitment
                    to your business's future. That's why we don't just build
                    software, we build trust, understanding, and systems designed to
                    last.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
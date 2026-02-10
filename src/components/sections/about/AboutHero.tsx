"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
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
      className="relative min-h-screen flex items-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden"
    >
      {/* Decorative corner frames */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-[#A2D2FF]" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-[#A2D2FF]" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-[#A2D2FF]" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-[#A2D2FF]" />

      <div className="container-custom w-full pt-32 pb-20 lg:pt-40 lg:pb-28 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Small tag */}
          <div
            className={`mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-8 bg-[#A2D2FF]" />
                <div className="w-2 h-8 bg-[#A2D2FF]" />
                <div className="w-2 h-8 bg-[#A2D2FF]" />
              </div>
              <span className="text-sm font-clash font-semibold text-[#1F2A44] uppercase tracking-wider">
                AN ENGINEERING STUDIO
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-6xl lg:text-7xl xl:text-8xl font-clash font-bold text-[#1F2A44] leading-none mb-8 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            WE ARE A <br />
            <span className="relative inline-block">
              WINNING
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#A2D2FF]" />
            </span>
            <br />
            SOFTWARE <br />
            DELIVERY TEAM
          </h1>

          {/* Subheading with decorative elements */}
          <div
            className={`mb-12 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[#1F2A44]/20" />
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#A2D2FF] rotate-45" />
                <div className="w-2 h-2 bg-[#A2D2FF] rotate-45" />
                <div className="w-2 h-2 bg-[#A2D2FF] rotate-45" />
              </div>
              <div className="flex-1 h-px bg-[#1F2A44]/20" />
            </div>
            <p className="text-xl font-clash font-semibold text-[#1F2A44] uppercase tracking-wider text-center">
              Built around one principle
            </p>
          </div>

          {/* Description */}
          <div
            className={`max-w-3xl transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <p className=" font-clash text-xl lg:text-2xl text-[#1F2A44] leading-relaxed mb-6 font-medium">
              Refactrd is a software delivery company built around one principle:{" "}
              <span className="font-clash font-bold">
                software should be easy to trust, easy to understand, and built to
                last.
              </span>
            </p>
            <p className="font-clash text-lg text-[#64748B] leading-relaxed mb-8">
              We partner with businesses that need software built or improved, and
              want the confidence that it is being handled properly from start to
              finish.
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={`flex items-center gap-4 transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-semibold hover:bg-[#5B6CFF] transition-all duration-300 hover:scale-105 group"
            >
              Let's Talk
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A2D2FF] to-transparent" />
    </section>
  );
}
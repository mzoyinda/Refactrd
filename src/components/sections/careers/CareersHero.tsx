"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Users, TrendingUp, Award } from "lucide-react";


export default function CareersHero() {
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
      className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-32 pb-20"
    >
      <div className="container-custom w-full relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Small tag */}
          <div
            className={`mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-block px-4 py-2 bg-[#A2D2FF]/20 text-[#1F2A44] rounded-full text-sm font-clash font-semibold uppercase tracking-wider">
              ✱ Join Our Team
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Build Your Career at{" "}
            <span className="relative inline-block">
              Refactrd
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#A2D2FF]" />
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-lg font-clash lg:text-xl text-[#64748B] leading-relaxed mb-12 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We're looking for talented, driven individuals who want to work on
            meaningful projects, grow their skills, and contribute to building
            reliable software that lasts.
          </p>

          {/* Stats Grid */}
          {/* <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#A2D2FF]/30 hover:border-[#5B6CFF] transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-8 h-8 text-[#5B6CFF] mx-auto mb-3" />
                  <div className="text-3xl font-clash font-bold text-[#1F2A44] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-[#64748B] font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl" />
    </section>
  );
}
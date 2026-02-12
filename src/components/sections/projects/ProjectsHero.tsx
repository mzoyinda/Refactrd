"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function ProjectsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-32 pb-8 lg:pb-20"
    >
      <div className="container-custom w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1
              className={`text-4xl lg:text-6xl xl:text-7xl font-clash font-medium text-[#1F2A44] leading-tight mb-6 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Building reliable software, systems & automation
            </h1>

            {/* Description */}
            <p
              className={`font-clash text-lg text-[#64748B] leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              ✱ We are a professional software delivery team working with
              clarity and precision since 2023
            </p>

            {/* Large Featured Image */}
            <div
              className={`relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Placeholder - Replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A2D2FF]/20 to-[#5B6CFF]/10 flex items-center justify-center">
                <span className="text-[#64748B] text-sm">
                  Team collaboration image
                </span>
              </div>

              <Image
                src="/images/projects-one.jpg"
                alt="Refactrd team collaborating on projects"
                fill
                className="object-cover"
              />

              {/* Tags/Badges on the image */}
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1F2A44] rounded-full text-sm font-clash font-semibold shadow-lg">
                  ✦ Innovative
                </span>
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1F2A44] rounded-full text-sm font-clash font-semibold shadow-lg">
                  ✦ Scalable
                </span>
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1F2A44] rounded-full text-sm font-clash font-semibold shadow-lg">
                  ✦ Advanced ✱
                </span>
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1F2A44] rounded-full text-sm font-clash font-semibold shadow-lg">
                  ✦ Real-Time Analytics ✱
                </span>
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#1F2A44] rounded-full text-sm font-clash font-semibold shadow-lg">
                  ✦ Agile Approach ✱
                </span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Small team image - top right */}
            <div
              className={`relative aspect-[4/3] rounded-3xl overflow-hidden transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              {/* Placeholder - Replace with actual image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B6CFF]/20 to-[#A2D2FF]/10 flex items-center justify-center">
                <span className="text-[#64748B] text-sm">
                  Team meeting image
                </span>
              </div>

              <Image
                src="/images/projects-two.jpg"
                alt="Team brainstorming session"
                fill
                className="object-cover"
              />
            </div>

            {/* Info Card */}
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#A2D2FF]/30 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <p className="font-clash text-base text-[#64748B] leading-relaxed mb-6">
                We deliver customer-facing applications, internal systems,
                automation workflows, and comprehensive technical documentation.
                Every project is handled with senior expertise and complete
                ownership from start to finish.
              </p>
              <Link
                href="https://cal.com/refactrd/technical-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#A2D2FF] font-clash font-semibold text-[#1F2A44] transition-colors duration-300 group"
              >
                Start a project with us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl" />
    </section>
  );
}

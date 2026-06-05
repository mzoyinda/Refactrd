"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesHero() {
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
      className="relative min-h-screen flex items-center bg-gradient-to-br from-tertiary-light via-white to-white overflow-hidden"
    >
      <div className="container-custom w-full pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Small tag */}

            {/* Main Heading */}
            {/* Subheadline */}
            <p
              className={`font-jakarta text-base text-[#5a6580] uppercase tracking-[0.14em] font-semibold mb-4 transition-all duration-700 delay-75 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Helping organizations move from AI experimentation to operational adoption.
            </p>

            <h1
              className={`text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-secondary leading-tight mb-8 transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Our Services
            </h1>

            {/* Description Paragraphs */}
            <div
              className={`space-y-5 mb-8 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="font-jakarta text-base text-[#475569] leading-relaxed">
                Refactrd helps organizations improve workflows, implement practical AI solutions, and build the capabilities required for successful adoption.
              </p>
              <p className="font-jakarta text-base text-[#475569] leading-relaxed">
                We create impact across operations, knowledge systems, products, and AI-enabled workflows.
              </p>
              <p className="font-clash text-base text-[#1F2A44] leading-relaxed font-semibold">
                Focused on operational outcomes, not technology for its own sake.
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-clash font-semibold hover:bg-[#263352] transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Find Your Starting Point
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Top Left - Large */}
              <div className="col-span-1 row-span-2">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-tertiary to-tertiary-dark shadow-lg">
                  {/* Replace with actual image */}
                  <Image
                    src="/images/services-one.webp"
                    alt="Team member collaborating"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Top Right - Small */}
              <div className="col-span-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 shadow-lg">
                  <Image
                    src="/images/services-two.webp"
                    alt="Team member working"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Middle Right - Small */}
              <div className="col-span-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-primary/20 shadow-lg">
                  <Image
                    src="/images/services-three.webp"
                    alt="Team collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bottom Left - Medium */}
              <div className="col-span-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-tertiary/50 to-white shadow-lg">
                  <Image
                    src="/images/services-four.webp"
                    alt="Team discussion"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Bottom Right - Medium */}
              <div className="col-span-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-tertiary shadow-lg">
                  <Image
                    src="/images/services-five.webp"
                    alt="Team planning"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

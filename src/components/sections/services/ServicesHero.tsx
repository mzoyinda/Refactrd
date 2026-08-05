"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
      className="relative bg-gradient-to-br from-tertiary-light via-white to-white overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      <div className="container-custom w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1F2A44]/15 text-[#5a6580] text-[11px] font-clash font-semibold uppercase tracking-[0.14em] bg-white/70 mb-5 transition-all duration-700 delay-75 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1F2A44] flex-shrink-0" />
              AI Transformation Studio
            </span>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-secondary leading-tight mb-5 transition-all duration-700 delay-100 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Our Services
            </h1>

            {/* Tagline */}
            <p
              className={`font-clash text-xl sm:text-2xl font-bold text-[#1F2A44] leading-snug mb-6 transition-all duration-700 delay-150 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Practical AI. Better Operations. Measurable Impact.
            </p>

            {/* Description Paragraphs */}
            <div
              className={`space-y-5 mb-8 transition-all duration-700 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="font-jakarta text-base text-[#475569] leading-relaxed">
                Refactrd helps organizations improve how work gets done through workflow transformation, knowledge systems, intelligent operations, and AI-enabled products.
              </p>
              <p className="font-jakarta text-base text-[#475569] leading-relaxed">
                Whether you&apos;re exploring your first AI initiative or scaling adoption across the business, our services are designed to create lasting operational impact.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/get-started"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-clash font-semibold hover:bg-[#263352] transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Talk With Refactrd
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/approach"
                className="inline-flex items-center justify-center font-clash font-semibold border border-[#1F2A44]/25 text-[#1F2A44] rounded-full transition-all duration-300 hover:bg-[#1F2A44] hover:text-white hover:border-[#1F2A44] px-8 py-4"
              >
                Explore Our Approach
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/services-one.webp"
                alt="Team collaborating on AI-enabled operations"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/30 via-transparent to-transparent" />
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

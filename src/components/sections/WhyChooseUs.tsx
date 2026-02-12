"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Target,
  Boxes,
  FileText,
  Zap,
  Award,
  Globe,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: Target,
    number: "1",
    title: "Single point of ownership",
    description:
      "We manage delivery from build through documentation and handover.",
  },
  {
    icon: Boxes,
    number: "2",
    title: "Systems designed to last",
    description:
      "We prioritize clarity, maintainability, and scalability from the outset.",
  },
  {
    icon: FileText,
    number: "3",
    title: "Documentation as a standard deliverable",
    description:
      "Every system is delivered with clear and usable documentation.",
  },
  {
    icon: Zap,
    number: "4",
    title: "Automation with intent",
    description:
      "Manual processes are reduced where it improves efficiency and reliability.",
  },
  {
    icon: Award,
    number: "5",
    title: "Senior, hands-on execution",
    description: "Work is led by experienced engineers focused on outcomes.",
  },
  {
    icon: Globe,
    number: "6",
    title: "Global standards, efficient delivery",
    description:
      "High-quality software delivered with speed, focus, and consistency.",
  },
];

export default function WhyChooseUs() {
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
      className="section-padding bg-gradient-to-br from-[#0A1F1A] via-[ #1F2A44] to-[#0A1F1A] text-white overflow-hidden relative"
      id="why-choose-us"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CCFF00]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <div
              className={`inline-block mb-4 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="font-clash text-[#E6EAF0] font-semibold text-sm uppercase tracking-wider">
                BENEFITS
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-12">
              <h2
                className={`text-4xl lg:text-5xl xl:text-6xl font-clash font-bold leading-tight transition-all duration-700 delay-100 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                Why Businesses Choose Refactrd
              </h2>

              <div
                className={`transition-all duration-700 delay-200 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <p className="font-clash text-lg text-white/80 mb-6 leading-relaxed">
                  We partner with you to ensure that your software elevates your
                  brand to new levels with reliability, quality, and ownership.
                </p>
                <Link
                  href="https://cal.com/refactrd/technical-discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-clash inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
                >
                  Book a Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits Grid - 3 columns */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`group relative transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-[#CCFF00]/50 transition-all duration-300 hover:bg-white/10 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-[#CCFF00]/10 rounded-lg flex items-center justify-center group-hover:bg-[#CCFF00]/20 transition-colors duration-300">
                        <Icon className="w-7 h-7 text-[#E6EAF0]" />
                      </div>
                    </div>

                    {/* Number and Title */}
                    <div className="mb-4 flex-1">
                      <h3 className="text-xl font-clash font-semibold text-white mb-3 group-hover:text-[#E6EAF0] transition-colors duration-300">
                        <span className="text-[#E6EAF0]/60 mr-2">
                          {benefit.number}.
                        </span>
                        {benefit.title}
                      </h3>
                      <p className="font-clash text-sm text-white/70 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <div className="mt-4 h-1 bg-gradient-to-r from-[#CCFF00] to-accent w-0 group-hover:w-full transition-all duration-500 rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

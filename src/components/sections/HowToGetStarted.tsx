"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Target, Package } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    number: "01",
    title: "Understand Your Situation",
    description:
      "Clarify your goals, challenges, opportunities, and current state.",
  },
  {
    icon: Target,
    number: "02",
    title: "Identify The Right Path",
    description:
      "Determine whether you need opportunity identification, strategic planning, implementation support, or startup validation.",
  },
  {
    icon: Package,
    number: "03",
    title: "Move Forward With Confidence",
    description:
      "Follow a structured path designed to create measurable operational impact.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#1F2A44] overflow-hidden relative"
      id="how-it-works"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(162,210,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A2D2FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div
            className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div>
              <span className="font-clash font-semibold text-[11px] uppercase tracking-[0.18em] text-[#A2D2FF] mb-4 block">
                HOW WE WORK
              </span>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-clash font-bold text-white leading-tight">
                How To Get Started
              </h2>
            </div>
            <p className="font-jakarta text-base text-white/60 leading-relaxed max-w-sm lg:text-right">
              Every engagement begins with understanding your situation and finding the most practical path forward.
            </p>
          </div>

          {/* Steps */}
          <div className="grid lg:grid-cols-3 gap-5 mb-14">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl p-8 flex flex-col gap-5 transition-all duration-700 group hover:-translate-y-1 hover:shadow-2xl ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${200 + index * 150}ms` }}
                >
                  {/* Large decorative number */}
                  <span className="absolute top-5 right-7 font-clash font-bold text-[72px] leading-none text-[#1F2A44]/[0.05] select-none pointer-events-none">
                    {step.number}
                  </span>

                  {/* Step label */}
                  <span className="font-clash font-bold text-[10px] uppercase tracking-[0.2em] text-[#A2D2FF]">
                    Step {step.number}
                  </span>

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl bg-[#1F2A44] flex items-center justify-center group-hover:bg-[#0e5d7d] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-clash font-bold text-[#1F2A44] mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="font-jakarta text-sm text-[#64748B] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#A2D2FF] group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10 transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-jakarta text-white/50 text-sm max-w-md">
              Not sure which path fits? Start with a conversation — we'll help you figure out the right next step.
            </p>
            <Link
              href="/get-started"
              className="group font-clash inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-white rounded-full transition-all duration-300 hover:bg-[#E6EAF0] hover:scale-105 px-8 py-4 font-bold whitespace-nowrap flex-shrink-0"
            >
              Find Your Starting Point
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

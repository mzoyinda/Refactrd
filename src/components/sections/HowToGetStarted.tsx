"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Target, Package } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    number: "01",
    title: "You pick your starting point",
    description:
      "Choose the path that matches where you are. Exploring? Book a Mini Consultation. Ready to transform your organization? Book an Enterprise Consultation. Know exactly what you want to build? Submit your brief and we will respond within 24 hours.",
  },
  {
    icon: Target,
    number: "02",
    title: "We align on scope and outcomes",
    description:
      "Before any work begins, we agree on what success looks like. Deliverables, timelines, and expectations are set in writing. No vague engagements.",
  },
  {
    icon: Package,
    number: "03",
    title: "We deliver, you own it",
    description:
      "Everything we build is production-ready, documented, and yours. We do not create dependency. We build things that keep working after we hand them over.",
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
      className="section-padding bg-black/90 text-white overflow-hidden relative"
      id="how-it-works"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="mb-4">
                <span className="text-[#E6EAF0] font-clash font-semibold text-sm uppercase tracking-wider">
                  HOW IT WORKS
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-clash font-bold leading-tight">
                From first conversation to working AI, here is what to expect.
              </h2>
            </div>

            <div
              className={`transition-all duration-1000 ease-out delay-200 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <p className="font-clash text-lg text-white/80 leading-relaxed">
                Every engagement starts with a conversation. We work together to turn your operational bottleneck into a working AI system with clarity and precision.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting Line - Desktop */}
            <div className="hidden lg:block absolute top-[72px] left-[72px] right-[72px] h-0.5 bg-white/10">
              <div
                className={`h-full bg-[#E6EAF0] origin-left transition-all duration-2000 ease-out ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className={`relative transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                  >
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <div className="w-[94px] h-[94px] lg:w-[144px] lg:h-[144px] bg-[#E6EAF0] rounded-full flex items-center justify-center mx-auto lg:mx-0">
                        <Icon className="lg:w-16 lg:h-16 w-10 h-10 text-secondary" strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center lg:text-left">
                      <span className="font-clash text-[#E6EAF0]/40 text-sm font-bold mb-2 block">
                        Step {step.number}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-clash font-semibold text-white mb-4 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-base font-clash text-white/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className={`mt-16 text-center transition-all duration-700 delay-1200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-clash text-lg text-white/80 mb-4 max-w-2xl mx-auto">
              Not sure which path fits? Start with a Mini Consultation for $99 and leave with a clear plan.
            </p>
            <a
              href="https://cal.com/refactrd/mini-consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-clash inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
            >
              Book a Mini Consultation ($99)
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Rocket, Bell, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: Rocket,
    title: "Understand what you need to build or improve",
    description:
      "We listen carefully to your business goals and technical requirements to fully understand your vision and challenges.",
  },
  {
    icon: Bell,
    title: "Clarify scope, timelines, and delivery expectations",
    description:
      "We outline clear deliverables, realistic timelines, and set concrete expectations so everyone is aligned from day one.",
  },
  {
    icon: RefreshCw,
    title: "Recommend a clear and practical next step",
    description:
      "We provide straightforward recommendations and actionable next steps tailored specifically to your needs and goals.",
  },
];

export default function HowToGetStarted() {
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
      className="section-padding bg-gradient-to-br from-[#0A1814] via-[#0D1F1A] to-[#0A1814] text-white overflow-hidden relative"
      id="get-started"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Left: Heading */}
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="mb-4">
                <span className="text-[#E6EAF0] font-montserrat font-semibold text-sm uppercase tracking-wider">
                  HOW WE WORK
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-clash font-bold leading-tight">
                How to Get Started
              </h2>
            </div>

            {/* Right: Description + CTA */}
            <div
              className={`transition-all duration-1000 ease-out delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <p className="font-jakarta text-lg text-white/80 mb-6 leading-relaxed">
                It begins with a conversation. When you book a call, we work together to turn your vision into reality with clarity and precision.
              </p>
             <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
                >
                  Book a Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>
          </div>

          {/* Process Steps with Connecting Lines */}
          <div className="relative">
            {/* Connecting Line - Desktop Only */}
            <div className="hidden lg:block absolute top-[72px] left-[72px] right-[72px] h-0.5 bg-accent/20">
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
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${400 + index * 200}ms` }}
                  >
                    {/* Icon */}
                    <div className="mb-6 relative">
                      <div className="w-[144px] h-[144px] bg-[#E6EAF0] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto lg:mx-0">
                        <Icon className="w-16 h-16 text-secondary" strokeWidth={2.5} />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-[144px] h-[144px] bg-accent/20 rounded-full blur-2xl -z-10 mx-auto lg:mx-0" />
                    </div>

                    {/* Content */}
                    <div className="text-center lg:text-left">
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

          {/* Bottom Statement + CTAs */}
          <div
            className={`mt-16 text-center transition-all duration-700 delay-1200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="font-clash text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              If there is a strong fit, we proceed from there.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-500">
            <Link
              href="/contact"
              // className="button-primary group flex items-center gap-2 px-8 py-4 text-lg"
              className="inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
            >
              Book a call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/hire"
              className="border border-[#1F2A44] px-8 py-4 rounded-full font-jakarta"
            >
              Hire a team
            </Link>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
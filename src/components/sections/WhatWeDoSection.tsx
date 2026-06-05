"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const aiServices = [
  {
    level: "01",
    title: "Workflow Transformation",
    description:
      "Redesign workflows, reduce friction, and improve execution across teams and operations.",
    challenges: [
      "Repetitive manual processes",
      "Operational bottlenecks",
      "Inconsistent execution",
      "Difficulty scaling workflows",
    ],
    bestFor:
      "Best For: Organizations looking to reduce operational friction and improve performance.",
  },
  {
    level: "02",
    title: "Knowledge Systems & AI Assistants",
    description:
      "Design and implement AI-enabled systems that help teams access information faster and make better decisions.",
    challenges: [
      "Information scattered across tools",
      "Knowledge silos",
      "Slow onboarding",
      "Dependence on key individuals",
    ],
    bestFor:
      "Best For: Organizations struggling with fragmented information and knowledge silos.",
  },
  {
    level: "03",
    title: "AI-Enabled Products",
    description:
      "Introduce practical AI capabilities that improve customer experiences and create additional value.",
    challenges: [
      "Limited product differentiation",
      "Manual customer workflows",
      "Missed personalization opportunities",
      "Customer experience inefficiencies",
    ],
    bestFor:
      "Best For: Product teams exploring meaningful AI enhancements.",
  },
  {
    level: "04",
    title: "AI Operations & Intelligent Workflows",
    description:
      "Design and implement AI-enabled operational systems that improve execution and scalability.",
    challenges: [
      "Operational complexity",
      "Slow decision-making",
      "Resource constraints",
      "Scaling execution across functions",
    ],
    bestFor:
      "Best For: Organizations ready to embed AI into core business operations.",
  },
];

export default function WhatWeDoSectionv2({ showChallenges = false }: { showChallenges?: boolean }) {
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
      className="section-padding bg-black/90 text-white relative overflow-hidden"
      id="services"
    >
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2
            className={`text-4xl lg:text-6xl font-clash font-bold leading-tight mb-6 transition-all duration-1000 ease-out delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Where We <span className="text-white/90">Create Impact</span>
          </h2>

          <p
            className={`text-lg text-white leading-relaxed font-jakarta transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            We help organizations improve how work gets done. These are the areas where we most frequently create measurable operational impact.

          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {aiServices.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-[1.02] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="p-8 bg-gradient-to-br from-secondary to-secondary-light text-white transition-all duration-300 min-h-[340px] flex flex-col">
                <h3 className="text-2xl font-clash font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-white/80 leading-relaxed mb-5 font-jakarta tracking-[-0.03em]">
                  {service.description}
                </p>
                {showChallenges && service.challenges && (
                  <div className="mb-5">
                    <p className="text-xs font-clash font-bold uppercase tracking-[0.14em] text-white/40 mb-2">Common Challenges</p>
                    <ul className="space-y-1.5">
                      {service.challenges.map((c, ci) => (
                        <li key={ci} className="flex items-start gap-2 font-jakarta text-sm text-white/65">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#A2D2FF] flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="pt-4 border-t border-white/10 mt-auto">
                  <p className="text-sm text-white font-jakarta tracking-[-0.03em]">
                    {service.bestFor}
                  </p>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#0e5d7d]/20 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
              </div>
              <div className="h-1 bg-gradient-to-r from-[#A2D2FF] to-[#5B6CFF] w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Mid CTA Block */}
        <div
          className={`relative overflow-hidden rounded-2xl transition-all duration-1000 ease-out delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="p-8 lg:p-10 bg-white border-2 border-white/10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-clash font-bold mb-3 text-black">
                  Not Sure Where To Begin?
                </h3>
                <p className="text-black leading-[25px] font-jakarta text-md tracking-[-0.03em]">
                  Find the right engagement based on your goals, challenges, and stage of adoption.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/get-started"
                  onClick={() => trackCTAClick("what_we_do_find_starting_point", "/get-started")}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-[#E6EAF0] rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group whitespace-nowrap"
                >
                  Find Your Starting Point
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0e5d7d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
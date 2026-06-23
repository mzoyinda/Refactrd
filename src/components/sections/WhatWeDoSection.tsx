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
      "Redesign workflows, eliminate operational friction, and improve execution across teams and functions.",
    challenges: [
      "Repetitive manual processes",
      "Operational bottlenecks",
      "Inconsistent execution",
      "Difficulty scaling workflows",
    ],
    bestFor:
      "Best For: Organizations looking to improve performance, remove bottlenecks, and redesign how work gets done.",
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
      "Best For: Organizations struggling with fragmented information, scattered knowledge, and inconsistent decision-making.",
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
      "Best For: Organizations exploring meaningful AI-enabled enhancements and opportunities.",
  },
  {
    level: "04",
    title: "AI Operations & Intelligent Workflows",
    description:
      "Design and implement AI-enabled operational systems that improve execution, scalability, and performance.",
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
      className="section-padding bg-[#1F2A44] text-white relative overflow-hidden"
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {aiServices.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-[#2c3f66] border border-[#3d5585] hover:border-[#A2D2FF]/50 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 80}ms` }}
            >
              <div className="p-6 flex flex-col h-full">
                <span className="font-clash font-bold text-[10px] tracking-[0.2em] text-[#A2D2FF]/50 uppercase mb-4">
                  {service.level}
                </span>
                <h3 className="text-[15px] font-clash font-bold text-white leading-snug mb-3">
                  {service.title}
                </h3>
                <p className="text-white/70 text-[13px] leading-relaxed font-jakarta flex-1">
                  {service.description}
                </p>
                {showChallenges && service.challenges && (
                  <div className="mt-4">
                    <p className="text-[9px] font-clash font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Challenges</p>
                    <ul className="space-y-1.5">
                      {service.challenges.map((c, ci) => (
                        <li key={ci} className="flex items-start gap-2 font-jakarta text-[12px] text-white/55">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#A2D2FF] flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-4 pt-4 border-t border-white/8">
                  <p className="text-[11px] text-white/50 font-jakarta leading-relaxed">
                    {service.bestFor.replace('Best For: ', '')}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#A2D2FF] to-[#5B6CFF] w-0 group-hover:w-full transition-all duration-400" />
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
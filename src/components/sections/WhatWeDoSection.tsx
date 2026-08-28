"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

interface ServiceItem {
  level: string;
  title: string;
  tagline: string;
  description: string;
  challenges?: string[];
  bestFor?: string;
  exploreHref?: string;
}

const aiServices: ServiceItem[] = [
  {
    level: "01",
    title: "Workflow Transformation",
    tagline: "Redesign how work gets done.",
    description:
      "Redesign workflows, eliminate operational friction, and improve execution across teams and functions.",
    challenges: [
      "Repetitive manual processes",
      "Operational bottlenecks",
      "Inconsistent execution",
      "Difficulty scaling workflows",
    ],
    bestFor:
      "Ideal for organizations looking to improve performance by redesigning how work flows across the business.",
  },
  {
    level: "02",
    title: "Knowledge Systems & AI Assistants",
    tagline: "Help teams find information and make better decisions.",
    description:
      "Design AI-powered knowledge systems that make expertise, documentation, and institutional knowledge instantly accessible.",
    challenges: [
      "Information scattered across tools",
      "Knowledge silos",
      "Slow onboarding",
      "Dependence on key individuals",
    ],
    bestFor:
      "Ideal for organizations struggling with fragmented information, slow onboarding, or inconsistent decision-making.",
  },
  {
    level: "03",
    title: "Intelligent Operations",
    tagline: "Embed AI into day-to-day operations.",
    description:
      "Use AI to improve execution, operational visibility, coordination, and decision support across the organization.",
    challenges: [
      "Operational complexity",
      "Slow decision-making",
      "Resource constraints",
      "Scaling execution across functions",
    ],
    bestFor:
      "Ideal for organizations looking to make operations more intelligent, scalable, and responsive.",
  },
  {
    level: "04",
    title: "AI-Enabled Products",
    tagline: "Create smarter customer and employee experiences.",
    description:
      "Design and implement AI capabilities that create differentiated products, services, and internal experiences.",
    challenges: [
      "Limited product differentiation",
      "Manual customer workflows",
      "Missed personalization opportunities",
      "Customer experience inefficiencies",
    ],
    bestFor:
      "Ideal for organizations exploring practical AI-enabled product opportunities.",
  },
];

interface WhatWeDoSectionProps {
  showChallenges?: boolean;
  subheading?: string;
  services?: ServiceItem[];
  showBottomCTA?: boolean;
}

export default function WhatWeDoSectionv2({
  showChallenges = false,
  subheading = "Every organization has different priorities. These are the areas where we most frequently help teams improve execution, decision-making, and operational performance.",
  services = aiServices,
  showBottomCTA = true,
}: WhatWeDoSectionProps) {
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
            Where We <span className="text-white/90">Create Operational Impact</span>
          </h2>

          <p
            className={`text-lg text-white leading-relaxed font-jakarta transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {subheading}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {services.map((service, index) => (
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
                <h3 className="text-[15px] font-clash font-bold text-white leading-snug mb-2">
                  {service.title}
                </h3>
                <p className="text-[#A2D2FF] text-[12px] font-clash font-semibold leading-snug mb-3">
                  {service.tagline}
                </p>
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
                  {service.exploreHref ? (
                    <Link
                      href={service.exploreHref}
                      className="inline-flex items-center gap-1.5 text-[12px] text-[#A2D2FF] font-clash font-semibold group-hover:gap-2.5 transition-all duration-300"
                    >
                      Explore {service.title}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <p className="text-[11px] text-white/50 font-jakarta leading-relaxed">
                      {service.bestFor}
                    </p>
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#A2D2FF] to-[#5B6CFF] w-0 group-hover:w-full transition-all duration-400" />
            </div>
          ))}
        </div>

        {/* Mid CTA Block */}
        {showBottomCTA && (
          <div
            className={`relative overflow-hidden rounded-2xl transition-all duration-1000 ease-out delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="p-8 lg:p-10 bg-white border-2 border-white/10">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-clash font-bold mb-3 text-black">
                    Ready To Explore What&apos;s Possible?
                  </h3>
                  <p className="text-black leading-[25px] font-jakarta text-md tracking-[-0.03em]">
                    Tell us what you&apos;re trying to achieve and we&apos;ll recommend the best path forward.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href="/contact"
                    onClick={() => trackCTAClick("what_we_do_talk_with_refactrd", "/contact")}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-[#E6EAF0] rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group whitespace-nowrap"
                  >
                    Talk With Refactrd
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0e5d7d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

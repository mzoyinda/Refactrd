"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const aiServices = [
  {
    level: "Level 01",
    title: "Workflow Automation",
    description:
      "We identify the manual processes slowing your team down and automate them using AI. Onboarding, reporting, support handoffs, recurring internal tasks, we scope one workflow and eliminate it.",
    bestFor:
      "Best for: Teams doing repetitive operational work that could be handled faster and more consistently.",
  },
  {
    level: "Level 02",
    title: "AI Assistants and Internal Copilots",
    description:
      "We build AI assistants that give your team instant access to knowledge. Instead of searching Notion, asking on Slack, or waiting on someone, they just ask and get what they need.",
    bestFor:
      "Best for: Teams where information is scattered across tools, or where the same questions get answered over and over.",
  },
  {
    level: "Level 03",
    title: "AI Features for Your Product",
    description:
      "We help product teams add practical AI capabilities to their existing platforms — search, recommendations, intelligent filtering, automated summaries. Features that improve the user experience without rebuilding from scratch.",
    bestFor:
      "Best for: SaaS companies and product teams adding AI features that deliver real value to their users.",
  },
  {
    level: "Level 04",
    title: "Agentic Workflows and AI Operations",
    description:
      "For teams ready to go further, we design AI systems that handle multi-step processes autonomously, making decisions and integrating across your entire stack without constant manual input.",
    bestFor:
      "Best for: Companies that have proven early AI wins and want to scale automation into how they operate at a deeper level.",
  },
];

export default function WhatWeDoSectionv2() {
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
      className="section-padding bg-black/90 text-white relative overflow-hidden"
      id="services"
    >
      {/* Decorative dotted borders */}
      <div className="absolute inset-8 rounded-2xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">

         

          <h2
            className={`text-4xl lg:text-6xl font-clash font-bold leading-tight mb-6 transition-all duration-1000 ease-out delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            What We <span className="text-white/90">Do</span>
          </h2>

          <p
            className={`text-lg text-white leading-relaxed font-jakarta transition-all duration-1000 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            We help companies introduce AI in a way that fits how they actually
            work. No overbuilt platforms. No months-long projects before
            anything ships. We start with one high-impact improvement and build
            from there.
          </p>
        </div>

        {/* Service Cards - 2 Column Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {aiServices.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-[1.02] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 min-h-[340px] flex flex-col"> */}
             
                 <div className="p-8  bg-gradient-to-br from-secondary to-secondary-light text-white hover:border-white/20 hover:bg-white/10 transition-all duration-300 min-h-[340px] flex flex-col">

                {/* Title */}
                <h3 className="text-2xl font-clash font-bold mb-4 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 leading-relaxed mb-6 flex-1 font-jakarta tracking-[-0.03em]">
                  {service.description}
                </p>

                {/* Best For - Aside */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-white  font-jakarta tracking-[-0.03em]">
                    {service.bestFor}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#0e5d7d]/20 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
              </div>

              {/* Bottom border animation */}
              <div className="h-1 bg-gradient-to-r from-[#A2D2FF] to-[#5B6CFF] w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* CTA Block */}
        <div
          className={`relative overflow-hidden rounded-2xl transition-all duration-1000 ease-out delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="p-8 lg:p-10 bg-white backdrop-blur-sm border-2 border-white/10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Left: Content */}
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-clash font-bold mb-3 text-black">
                  Not sure which one fits your situation?
                </h3>
                <p className="text-black leading-[25px] font-jakarta text-md tracking-[-0.03em]">
                  That is exactly what our free AI Opportunity Mapping is for.
                  We listen, identify where AI can help most, and recommend a
                  starting point. No commitment required.
                </p>
              </div>

              {/* Right: CTA Button */}
              <div className="flex-shrink-0">
                <Link
                  href="https://cal.com/refactrd/technical-discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackCTAClick("what_we_do_mapping_call", "cal.com")
                  }
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-[#E6EAF0] rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group whitespace-nowrap"
                >
                  Book a Free AI Mapping Call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0e5d7d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
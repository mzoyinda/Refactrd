"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Assess The Current State",
    copy: "Understand operations, workflows, knowledge, priorities, and opportunities for improvement.",
  },
  {
    number: "02",
    title: "Identify The Highest-Impact Opportunities",
    copy: "Evaluate where AI, operational redesign, or implementation can create meaningful business outcomes.",
  },
  {
    number: "03",
    title: "Determine The Best Path Forward",
    copy: "Recommend the most appropriate engagement, implementation approach, or transformation initiative based on organizational goals.",
  },
];

export default function ApproachSystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-[#F9FAFC] overflow-hidden">
      <div className="container-custom">

        {/* Header */}
        <div className={`mb-8 md:mb-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
            The Refactrd System
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight max-w-[600px]">
            Every Engagement Starts The Same Way
          </h2>
          <p className="mt-4 font-jakarta text-[15px] sm:text-[17px] text-[#5a6580] leading-relaxed max-w-[720px]">
            Whether you&apos;re redesigning workflows, building a knowledge system, improving operations, or creating an AI-enabled product, every engagement begins by understanding the organization before recommending a solution.
          </p>
        </div>

        {/* Steps — vertical timeline */}
        <div className="relative max-w-[760px]">
          {/* Connecting line */}
          <div className="absolute left-[22px] top-6 bottom-6 w-px bg-gradient-to-b from-[#1F2A44] via-[#A2D2FF] to-[#DDE3EE]" />

          <div className="space-y-5">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative pl-14 sm:pl-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${150 + i * 120}ms` }}
              >
                {/* Circle */}
                <div className="absolute left-0 top-0 w-11 h-11 rounded-full bg-[#1F2A44] flex items-center justify-center flex-shrink-0 shadow-md z-10">
                  <span className="font-clash font-extrabold text-[10px] text-[#A2D2FF] tracking-wider">
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl border border-[#DDE3EE] p-5 sm:p-6 shadow-sm">
                  <h3 className="font-clash font-bold text-[16px] sm:text-[18px] text-[#1F2A44] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-jakarta text-[14px] sm:text-[15px] text-[#5a6580] leading-relaxed">
                    {step.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-10 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <Link
            href="/get-started"
            className="group inline-flex items-center gap-2 bg-[#1F2A44] text-white font-clash font-bold px-7 py-4 rounded-full hover:bg-[#2d3e62] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Talk With Refactrd
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}

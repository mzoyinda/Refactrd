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
    title: "We Focus On Business Outcomes",
    description:
      "Every engagement begins with a business challenge, not a technology recommendation.",
  },
  {
    icon: Boxes,
    number: "2",
    title: "We Understand Before We Build",
    description:
      "We assess workflows, operations, and priorities before recommending or implementing solutions.",
  },
  {
    icon: FileText,
    number: "3",
    title: "We Prioritize Adoption",
    description:
      "Success is measured by operational change and business outcomes, not implementation activity alone.",
  },
  {
    icon: Zap,
    number: "4",
    title: "We Identify High-Impact Opportunities",
    description:
      "We focus on initiatives capable of creating meaningful value and sustainable improvement.",
  },
  {
    icon: Award,
    number: "5",
    title: "Senior, Hands-On Delivery",
    description:
      "Every engagement is led directly by experienced practitioners from discovery through implementation.",
  },
  {
    icon: Globe,
    number: "6",
    title: "Built For Long-Term Impact",
    description:
      "Our goal is to help organizations build lasting capability, operational maturity, and sustainable adoption.",
  },
];

export default function WhyChooseUs() {
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
      id="why-choose-us"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CCFF00]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div
              className={`inline-block mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="font-clash text-[#E6EAF0] font-semibold text-sm uppercase tracking-wider">
                WHY REFACTRD
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end mb-12">
              <h2
                className={`text-4xl lg:text-5xl xl:text-6xl font-clash font-bold leading-tight transition-all duration-700 delay-100 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Why Organizations Choose Refactrd
              </h2>

              <div
                className={`transition-all duration-700 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <p className="font-clash text-lg text-white/80 mb-6 leading-relaxed">
                  Most organizations don&apos;t struggle to access AI. They struggle to apply it in ways that improve how work gets done. Refactrd helps organizations identify the right opportunities, implement practical solutions, and create lasting operational impact.
                </p>
                <Link
                  href="/get-started"
                  className="font-clash inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
                >
                  Find Your Starting Point
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-secondary to-secondary-light text-white rounded-xl p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 h-full flex flex-col">
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center transition-colors duration-300">
                        <Icon className="w-7 h-7 text-secondary" />
                      </div>
                    </div>
                    <div className="mb-4 flex-1">
                      <h3 className="text-xl font-clash font-semibold text-white mb-3 group-hover:text-[#E6EAF0] transition-colors duration-300">
                        <span className="text-[#E6EAF0]/60 mr-2">{benefit.number}.</span>
                        {benefit.title}
                      </h3>
                      <p className="font-clash text-sm text-white/70 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
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
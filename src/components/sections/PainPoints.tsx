"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const painPoints = [
  {
    problem: "Your team uses AI every day.",
    consequence: "But everyone has developed their own process.",
  },
  {
    problem: "You're investing in AI tools.",
    consequence: "But productivity improvements are difficult to measure.",
  },
  {
    problem: "Interesting AI experiments exist.",
    consequence: "But workflows haven't fundamentally changed.",
  },
  {
    problem: "You know AI can create value.",
    consequence: "But you're not sure where to focus.",
  },
  {
    problem: "Information is difficult to find.",
    consequence: "Knowledge remains fragmented across systems and teams.",
  },
  {
    problem: "Operational bottlenecks still exist.",
    consequence: "Despite new AI tools, execution remains slower than it should be.",
  },
];

export default function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[#F9FAFC]"
      id="pain-points"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span
            className={`font-clash text-secondary font-semibold text-sm uppercase tracking-wider transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            DOES ANY OF THIS SOUND FAMILIAR?
          </span>
          <h2
            className={`text-4xl lg:text-5xl xl:text-6xl font-clash font-bold text-[#1F2A44] leading-tight mt-4 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            The signs are usually obvious.
          </h2>
        </div>

        {/* Pain point grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className={`rounded-2xl border-2 border-[#DDE3EE] bg-white p-7 transition-all duration-700 hover:border-[#1F2A44] hover:shadow-md ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              <p className="font-clash font-bold text-[#1F2A44] text-lg mb-2 leading-snug">
                {point.problem}
              </p>
              <p className="font-jakarta text-[#64748B] text-sm leading-relaxed">
                {point.consequence}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group"
          >
            Find Your Starting Point
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

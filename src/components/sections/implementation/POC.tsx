"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, TrendingUp, ArrowRight, Sparkles } from "lucide-react";

const pocOrganizations = [
  {
    name: "TechCorp Solutions",
    industry: "SaaS Platform",
    problem:
      "Support team overwhelmed with repetitive tier-1 queries during peak hours",
    role: "AI Support Agent",
    metric: "67% reduction in response time",
    status: "In Production",
    statusColor: "bg-[#639922] text-white",
  },
  {
    name: "BuildRight Construction",
    industry: "Construction Management",
    problem:
      "Manual data entry across multiple project management systems eating 15 hours/week",
    role: "AI Operations Assistant",
    metric: "92% time saved on data entry",
    status: "Week 2",
    statusColor: "bg-[#1F2A44] text-white",
  },
];

export default function POC() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
      id="poc"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container max-w-[1200px] mx-auto px-[5vw] relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-[#E6EAF0] border border-[#A2D2FF]/30 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#1F2A44]" />
            <span className="text-sm font-bold tracking-wider uppercase text-[#1F2A44] font-clash">
              Proof of concept
            </span>
          </div>

          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-5 leading-tight transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Early Adopters already Building
          </h2>
          <p
            className={`text-lg text-[#5a6580] max-w-[650px] mx-auto leading-relaxed font-jakarta transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            These are real builds in progress. Full case studies publish as each
            one ships to production.
          </p>
        </div>

        {/* POC Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {pocOrganizations.map((org, index) => (
            <div
              key={index}
              className={`group relative bg-white border-2 border-[#DDE3EE] rounded-2xl p-8 hover:border-[#A2D2FF] hover:shadow-xl transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Status Badge */}
              <div className="absolute -top-3 right-6">
                <span
                  className={`${org.statusColor} text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg font-jakarta`}
                >
                  {org.status}
                </span>
              </div>

              {/* Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#E6EAF0] flex items-center justify-center group-hover:bg-[#daeeff] transition-colors duration-300">
                  <Building2
                    className="w-6 h-6 text-[#1F2A44]"
                    strokeWidth={2}
                  />
                </div>
              </div>

              {/* Organization Info */}
              <div className="mb-5">
                <h3 className="text-xl font-clash font-bold text-[#1F2A44] mb-1">
                  {org.name}
                </h3>
                <p className="text-sm font-semibold text-[#5a6580] font-clash uppercase tracking-wider">
                  {org.industry}
                </p>
              </div>

              {/* Problem Statement */}
              <div className="mb-5">
                <p className="text-xs font-bold tracking-wider uppercase text-[#5a6580] mb-2 font-jakarta">
                  Challenge
                </p>
                <p className="text-sm text-[#1F2A44] leading-relaxed font-jakarta">
                  {org.problem}
                </p>
              </div>

              {/* AI Role */}
              <div className="mb-5">
                <p className="text-xs font-bold tracking-wider uppercase text-[#5a6580] mb-2 font-jakarta">
                  AI Role Deployed
                </p>
                <span className="inline-block bg-[#E6EAF0] text-[#1F2A44] text-sm font-semibold px-3 py-1.5 rounded-lg font-clash">
                  {org.role}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-[#DDE3EE] mb-5" />

              {/* Result Metric */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#639922]/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp
                    className="w-5 h-5 text-[#639922]"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-wider uppercase text-[#5a6580] mb-0.5 font-jakarta">
                    Early Result
                  </p>
                  <p className="text-base font-bold text-[#639922] font-jakarta">
                    {org.metric}
                  </p>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-[#A2D2FF]">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Organization Card - Full Width */}
        <div
          className={`relative transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-br from-[#E6EAF0] to-white border-2 border-[#A2D2FF] rounded-2xl p-10 md:p-12 text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#daeeff]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-[600px] mx-auto">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border-2 border-[#A2D2FF] mb-6 shadow-lg">
                <Building2 className="w-8 h-8 text-[#1F2A44]" strokeWidth={2} />
              </div>

              {/* Heading */}
              <h3 className="text-2xl md:text-3xl font-clash font-bold text-[#1F2A44] mb-4">
                Your organization could be here
              </h3>

              {/* Description */}
              <p className="text-base text-[#5a6580] leading-relaxed mb-8 font-clash">
                We're actively taking on founding participants. Spots are
                limited per cohort to ensure quality delivery. Submit your
                application to reserve a slot.
              </p>

              {/* CTA */}
              <a
                href="https://refactrd.substack.com/subscribe?params=%5Bobject%20Object%5D"
                target="_blank"
                rel="noopener noreferrer"
                className="font-clash inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
              >
                Apply for the 2-Week Build
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              {/* Trust Badge */}
              <p className="text-base text-[#5a6580] mt-6 font-clash">
                <span className="inline-block w-2 h-2 rounded-full bg-[#639922] mr-2" />
                Free audit included • No commitment to proceed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-base text-[#5a6580] leading-relaxed max-w-[600px] mx-auto font-clash">
            <span className="font-semibold text-[#1F2A44]">
              Want to read full case studies?
            </span>{" "}
            They'll be published here as each build completes and goes live in
            production.
          </p>
        </div>
      </div>
    </section>
  );
}

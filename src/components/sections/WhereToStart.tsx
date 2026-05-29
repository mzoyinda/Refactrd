"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const paths = [
  {
    label: "EXPLORING YOUR OPTIONS",
    headline: "Mini Consultation",
    price: "$99",
    body: "You know AI should be part of your operations but you are not sure where to start or what is realistic. In a focused 60-minute session, we map your workflows, identify your highest-impact opportunity, and hand you a written action plan you own. No pitch. No fluff. Just a clear answer to where do we begin.",
    bestFor: "Founders and growing business teams at the early stage of their AI thinking.",
    whatYouGet: [
      "60-minute focused session",
      "Written AI opportunity summary",
      "Prioritised recommendations with next steps",
      "Honest assessment of what is feasible and what is not",
    ],
    cta: "Book a Mini Consultation",
    href: "https://cal.com/refactrd/mini-consultation",
    external: true,
    highlight: false,
  },
  {
    label: "TRANSFORMING YOUR ORGANIZATION",
    headline: "AI Enterprise Consultation",
    price: "$499",
    body: "Your organization is ready to move beyond experimenting. You want AI embedded into how you operate at a deeper level but you need a clear, structured plan before committing to a build. We spend dedicated time with your leadership team to audit your existing systems, map your workflows, identify high-value integration points, and deliver a structured implementation roadmap you can actually use.",
    bestFor: "Companies with existing systems and a serious intent to become AI-powered across departments.",
    whatYouGet: [
      "Deep-dive workflow and systems audit",
      "AI integration roadmap across departments",
      "Risk and security assessment",
      "Prioritised implementation plan with realistic timelines",
      "Post-consultation follow-up session",
    ],
    cta: "Book an Enterprise Consultation",
    href: "https://cal.com/refactrd/enterprise-consultation",
    external: true,
    highlight: true,
  },
  {
    label: "YOU KNOW WHAT YOU WANT",
    headline: "Ready to Get Started",
    price: "No consultation needed",
    body: "You have a specific problem, a clear idea of what you want built, and you are ready to move. Tell us what you need and we will get back to you within 24 hours to scope it together.",
    bestFor: "Teams with a defined ask who want to move directly into a build without back and forth.",
    whatYouGet: [
      "Direct response within 24 hours",
      "Scoping call to confirm requirements and timeline",
      "Proposal and engagement start",
    ],
    cta: "Submit Your Brief",
    href: "/start",
    external: false,
    highlight: false,
  },
  {
    label: "EARLY-STAGE STARTUP",
    headline: "AI Startups Launchpad",
    price: "Cohort-based program",
    body: "A selective cohort program for early-stage startups that want to get AI working in their operations without the full cost of a build engagement. We take a small number of qualifying startups through a structured process: audit, build, deploy. Cohorts are limited and open periodically.",
    bestFor: "Startups with 5 to 20 people who have a clear operational bottleneck and are ready to test AI in live operations.",
    whatYouGet: [],
    cta: "Join the Waitlist",
    href: "/ai-startups-launchpad",
    external: false,
    highlight: false,
  },
];

export default function WhereToStart() {
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
      className="section-padding bg-[#F9FAFC]"
      id="where-to-start"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mb-14">
          <span
            className={`font-clash text-secondary font-semibold text-sm uppercase tracking-wider transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            WHERE DO YOU WANT TO START
          </span>

          <h2
            className={`text-4xl lg:text-5xl xl:text-6xl font-clash font-bold text-[#1F2A44] leading-tight mt-4 mb-4 max-w-3xl transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Choose the path that matches where you are right now.
          </h2>

          <p
            className={`font-jakarta text-lg text-secondary/70 max-w-2xl leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Not every company needs the same entry point. Some are still figuring out where AI fits. Some know exactly what they want to build. We have a clear path for each.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {paths.map((path, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 flex flex-col transition-all duration-700 ${
                path.highlight
                  ? "bg-[#1F2A44] border-[#1F2A44] text-white"
                  : "bg-white border-[#DDE3EE] hover:border-[#1F2A44]"
              } ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="p-8 flex flex-col h-full">
                {/* Label */}
                <span
                  className={`font-clash font-bold text-xs uppercase tracking-widest mb-4 ${
                    path.highlight ? "text-[#A2D2FF]" : "text-[#0e5d7d]"
                  }`}
                >
                  {path.label}
                </span>

                {/* Headline + Price */}
                <div className="mb-5">
                  <h3
                    className={`text-2xl font-clash font-bold mb-2 ${
                      path.highlight ? "text-white" : "text-[#1F2A44]"
                    }`}
                  >
                    {path.headline}
                  </h3>
                  <span
                    className={`font-clash font-semibold text-sm ${
                      path.highlight ? "text-[#A2D2FF]" : "text-[#0e5d7d]"
                    }`}
                  >
                    {path.price}
                  </span>
                </div>

                {/* Body */}
                <p
                  className={`font-jakarta text-sm leading-relaxed mb-5 ${
                    path.highlight ? "text-white/80" : "text-secondary/70"
                  }`}
                >
                  {path.body}
                </p>

                {/* Best For */}
                <p
                  className={`font-clash font-semibold text-xs mb-5 ${
                    path.highlight ? "text-white/60" : "text-secondary/50"
                  }`}
                >
                  Best for: {path.bestFor}
                </p>

                {/* What You Get */}
                {path.whatYouGet.length > 0 && (
                  <ul className="space-y-2 mb-8 flex-1">
                    {path.whatYouGet.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            path.highlight ? "text-[#A2D2FF]" : "text-[#0e5d7d]"
                          }`}
                        />
                        <span
                          className={`font-jakarta text-sm ${
                            path.highlight ? "text-white/80" : "text-secondary/70"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Spacer for cards without list */}
                {path.whatYouGet.length === 0 && <div className="flex-1" />}

                {/* CTA */}
                {path.external ? (
                  <a
                    href={path.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-clash font-semibold text-sm transition-all duration-300 hover:scale-105 group ${
                      path.highlight
                        ? "bg-white text-[#1F2A44] hover:bg-[#E6EAF0]"
                        : "bg-[#1F2A44] text-white hover:bg-[#0e5d7d]"
                    }`}
                  >
                    {path.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                ) : (
                  <Link
                    href={path.href}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-clash font-semibold text-sm transition-all duration-300 hover:scale-105 group ${
                      path.highlight
                        ? "bg-white text-[#1F2A44] hover:bg-[#E6EAF0]"
                        : "bg-[#1F2A44] text-white hover:bg-[#0e5d7d]"
                    }`}
                  >
                    {path.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fallback Line */}
        <div
          className={`text-center transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-jakarta text-secondary/60 mb-4">
            Not sure which path fits? The Mini Consultation is the right starting point for most people. It gives you a clear answer without a large commitment.
          </p>
          <a
            href="https://cal.com/refactrd/mini-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 border-2 border-[#1F2A44] text-[#1F2A44] rounded-full font-clash font-semibold text-sm hover:bg-[#1F2A44] hover:text-white transition-all duration-300"
          >
            Book a Mini Consultation ($99)
          </a>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    category: "AI · Compliance & Risk",
    title: "AI Fraud Detection & AML System",
    description:
      "A machine learning system that monitors transactions in real time, flags suspicious activity, and generates explainable outputs for compliance teams.",
    resultLine: "Reduced manual review time while improving detection accuracy across fragmented compliance workflows.",
    whatReplaced:
      "Manual transaction review and fragmented AML compliance workflows across multiple teams.",
    tags: ["Machine Learning", "Real-Time Detection", "AML Compliance", "Fintech"],
    slug: "ai-fraud-detection-aml-system",
  },
  {
    id: 2,
    category: "AI · Sales Intelligence",
    title: "AI Sales Intelligence Tool",
    description:
      "An AI system that scores inbound leads automatically, surfaces deal risks before they go cold, and gives sales teams a live view of pipeline health.",
    resultLine: "Eliminated hours of manual CRM updates and inconsistent lead qualification across the sales team.",
    whatReplaced:
      "Manual lead qualification, inconsistent follow-up, and hours spent updating CRM records that were already out of date.",
    tags: ["AI Scoring", "Pipeline Intelligence", "Sales Tech", "CRM Automation"],
    slug: "ai-sales-intelligence-tool",
  },
  {
    id: 3,
    category: "AI · RAG System",
    title: "AI Legal Research Assistant",
    description:
      "An internal AI assistant built for a law firm, trained on case law, internal precedents, and regulatory documents. Lawyers ask questions in plain language and get sourced answers fast.",
    resultLine: "Lawyers went from hours of manual research to sourced answers in under five minutes.",
    whatReplaced:
      "Hours of manual research across filing systems, databases, and document libraries.",
    tags: ["RAG System", "Internal Copilot", "Legal Tech", "Knowledge Retrieval"],
    slug: "ai-legal-research-assistant",
  },
  {
    id: 4,
    category: "AI · E-commerce · Agentic",
    title: "AI Shopping Agent",
    description:
      "An agentic AI system embedded into an e-commerce platform that handles product discovery, personalised recommendations, and post-purchase follow-up autonomously.",
    resultLine: "Replaced manual upsell campaigns and freed the support team from repeat order and tracking queries.",
    whatReplaced:
      "Generic product listings, manual upsell campaigns, and a support team fielding repeat order and tracking queries every day.",
    tags: ["Agentic AI", "Product AI", "E-commerce", "Personalisation"],
    slug: "ai-shopping-agent",
  },
];

export default function ProofOfWork() {
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
    <section ref={sectionRef} className="section-padding bg-white" id="work">
      <div className="container-custom max-w-7xl">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <span
            className={`font-clash text-secondary font-semibold text-sm uppercase tracking-wider transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            CASE STUDIES
          </span>

          <h2
            className={`text-4xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-6 leading-tight mt-4 transition-all duration-1000 ease-out delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Real problems. Real systems. Real results.
          </h2>

          <p
            className={`text-lg lg:text-[18px] text-black leading-relaxed font-jakarta tracking-[-0.03em] transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Every project on this page is a working AI system we built, deployed, and handed over to a team that uses it daily.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl border-2 border-[#CBD5E1] hover:border-[#0e5d7d] transition-all duration-500 hover:shadow-xl bg-white ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="p-8 flex flex-col h-full">
                {/* Category Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center px-3 py-1.5 bg-[#E6EAF0] text-[#1F2A44] text-xs font-clash font-bold rounded-full">
                    {project.category}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-3 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-secondary leading-relaxed mb-4 font-jakarta tracking-[-0.03em]">
                  {project.description}
                </p>

                {/* Result Line */}
                <div className="mb-4 p-3 bg-[#f0f7ff] rounded-lg border-l-4 border-[#A2D2FF]">
                  <p className="text-sm text-[#1F2A44] font-jakarta tracking-[-0.03em] leading-relaxed">
                    {project.resultLine}
                  </p>
                </div>

                {/* What it Replaced */}
                <div className="mb-6 p-4 bg-[#E6EAF0]/30 rounded-lg border-l-4 border-[#0e5d7d]">
                  <p className="text-xs font-clash font-bold text-secondary mb-2">
                    What it replaced
                  </p>
                  <p className="text-sm text-[#1F2A44] font-jakarta tracking-[-0.03em] leading-relaxed">
                    {project.whatReplaced}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-clash font-semibold rounded-full bg-white border border-[#CBD5E1] text-[#64748B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read Case Study CTA */}
                <div className="mt-auto">
                  <Link
                    href={`/case-studies/${project.slug}`}
                    className="inline-flex items-center gap-2 text-[#0e5d7d] font-clash font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  >
                    Read Case Study
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center transition-all duration-1000 ease-out delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group"
          >
            See All Case Studies
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
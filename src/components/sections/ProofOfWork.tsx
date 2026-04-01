"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    category: "AI · Document Automation",
    title: "AI Contract Generator",
    description:
      "A web application that generates fully structured, professional contracts in seconds from user input. No manual templates, the AI interprets the requirements and produces a ready-to-use document.",
    whatReplaced:
      "Hours spent manually drafting, reviewing, and formatting legal documents from scratch.",
    tags: ["AI Generation", "Document Automation", "Legal Tech"],
  },
  {
    id: 2,
    category: "AI · Compliance & Risk",
    title: "AI Fraud Detection & AML System",
    description:
      "A machine learning system that monitors transactions in real time, flags suspicious activity, and generates explainable outputs for compliance teams, reducing manual review while improving accuracy.",
    whatReplaced:
      "Manual transaction review and fragmented AML compliance workflows across multiple teams.",
    tags: [
      "Machine Learning",
      "Real-Time Detection",
      "AML Compliance",
      "Fintech",
    ],
  },
  {
    id: 3,
    category: "AI · Sales Intelligence",
    title: "AI Sales Intelligence Tool",
    description:
      "An AI system that scores inbound leads automatically, surfaces deal risks before they go cold, and gives sales teams a live view of pipeline health, without manually updating a single spreadsheet or CRM field.",
    whatReplaced:
      "Manual lead qualification, inconsistent follow-up, and hours spent updating CRM records that were already out of date.",
    tags: ["AI Scoring", "Pipeline Intelligence", "Sales Tech", "CRM Automation"],
  },
  {
    id: 4,
    category: "AI · RAG System",
    title: "AI Legal Research Assistant",
    description:
      "An internal AI assistant built for a law firm,  trained on case law, internal precedents, and regulatory documents. Lawyers ask questions in plain language and get sourced answers in seconds instead of hours.",
    whatReplaced:
      "Hours of manual research across filing systems, databases, and document libraries.",
    tags: ["RAG System", "Internal Copilot", "Legal Tech", "Knowledge Retrieval"],
  },
  {
    id: 5,
    category: "AI · Workflow Automation",
    title: "AI Onboarding Copilot",
    description:
      "An AI-powered system that guides new employees through their first weeks automatically, delivering the right information at the right time, answering questions instantly, and escalating to a human only when genuinely needed.",
    whatReplaced:
      "Manual onboarding coordination, repeated messages, and inconsistent first-week experiences across hires.",
    tags: ["Workflow Automation", "AI Assistant", "HR Tech", "Onboarding"],
  },
  {
    id: 6,
    category: "AI · E-commerce · Agentic",
    title: "AI Shopping Agent",
    description:
      "An agentic AI system embedded into an e-commerce platform that handles product discovery, personalised recommendations, and post-purchase follow-up autonomously, responding to customer behaviour in real time without any manual input from the team.",
    whatReplaced:
      "Generic product listings, manual upsell campaigns, and a support team fielding repeat order and tracking queries every day.",
    tags: ["Agentic AI", "Product AI", "E-commerce", "Personalisation"],
  },
];

export default function ProofOfWork() {
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
    <section ref={sectionRef} className="section-padding bg-white" id="work">
      <div className="container-custom max-w-7xl">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          {/* Section Label */}
         

          <h2
            className={`text-4xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-6 leading-tight transition-all duration-1000 ease-out delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            We Build AI Systems That Work in the Real World
          </h2>

          <p
            className={`text-lg lg:text-[18px] text-black leading-relaxed font-jakarta tracking-[-0.03em] transition-all duration-1000 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            A focused selection of AI systems and automation tools we have
            delivered. Each one started with a discovery conversation and
            shipped within a defined scope and timeline.
          </p>
        </div>

        {/* Projects Grid - 2 Columns */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl border-2 border-[#CBD5E1] hover:border-[#0e5d7d] transition-all duration-500 hover:shadow-xl bg-white ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center px-3 py-1.5 bg-[#E6EAF0] text-[#1F2A44] text-xs font-clash font-bold rounded-full">
                    {project.category}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-3 group-hover:text-[#0e5d7d] transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-secondary leading-relaxed mb-6 font-jakarta tracking-[-0.03em]">
                  {project.description}
                </p>

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
                      className={`px-3 py-1 text-xs font-clash font-semibold rounded-full bg-white border border-[#CBD5E1] text-[#64748B]`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                <div className="flex items-center gap-2 text-[#0e5d7d] font-clash font-semibold group-hover:gap-3 transition-all duration-300 cursor-pointer">
                  <span>View Details</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom border animation */}
              
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center transition-all duration-1000 ease-out delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-jakarta tracking-[-0.03em] text-lg text-black mb-6">
            Ready to build with Refactrd?
          </p>
          <Link
            href="https://cal.com/refactrd/technical-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold hover:bg-[#0e5d7d] transition-all duration-300 hover:scale-105 group"
          >
            Book a Free AI Mapping Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
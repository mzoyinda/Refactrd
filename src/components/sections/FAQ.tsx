"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Why should I outsource software development to Refactrd?",
    answer:
      "Outsourcing to Refactrd eliminates the overhead of hiring, managing, and coordinating technical resources. We take full ownership of delivery from development and infrastructure to documentation, so you can focus on running and scaling your business. You get senior, hands-on execution without the commitment of permanent hiring.",
  },
  {
    question: "What types of projects does Refactrd work on?",
    answer:
      "We work on a wide range of projects including customer-facing web and mobile applications, internal business systems, AI-driven automation workflows, DevOps infrastructure setup, technical documentation, and team delivery support. Whether you're starting from an idea or improving an existing product, we can help.",
  },
  {
    question: "How does Refactrd ensure code quality and maintainability?",
    answer:
      "We prioritize clean architecture, scalability, and long-term maintainability from the outset. Our senior engineers follow industry best practices, conduct thorough code reviews, implement automated testing, and deliver comprehensive documentation with every project. Systems are built to last, not just to launch.",
  },
  {
    question: "What is included in your technical documentation service?",
    answer:
      "Our documentation covers system architecture, API references, setup and deployment guides, user manuals, onboarding materials, and maintenance procedures. Every deliverable includes clear, usable documentation to support continuity, making it easy for your team to understand and maintain the system.",
  },
  {
    question: "How long does it take to see results from a project?",
    answer:
      "Timelines vary based on project scope and complexity. During our initial consultation, we clarify deliverables, realistic timelines, and expectations upfront. We work iteratively, providing regular updates and incremental deliveries so you can see progress throughout the engagement rather than waiting until the end.",
  },
  {
    question: "Do you work with startups, SMEs, or enterprises?",
    answer:
      "We work with organizations at all stages. Startups building core products, SMEs scaling existing systems, and enterprises outsourcing specific software initiatives all benefit from our services. Our approach adapts to your stage—whether you need rapid prototyping or enterprise-grade architecture.",
  },
  {
    question: "What happens after the initial delivery?",
    answer:
      "We provide ongoing support and incremental improvements beyond delivery. If needed, we help with system maintenance, feature additions, performance optimization, and scaling. Our goal is to ensure your software remains stable, secure, and ready to grow with your business.",
  },
  {
    question: "How is Refactrd different from hiring an in-house team?",
    answer:
      "With Refactrd, you get immediate access to senior engineers without the time and cost of recruiting, onboarding, and managing a full team. We handle development, infrastructure, and documentation under a single engagement model with clear accountability—no coordination complexity, just predictable delivery.",
  },
  {
    question: "Can you help fix or improve an existing messy codebase?",
    answer:
      "Absolutely. Many clients come to us with systems that have grown messy over time. We assess the current state, identify issues, refactor code for clarity and performance, add missing documentation, and implement proper structure. We step in, take ownership, and help you move forward with confidence.",
  },
  {
    question: "What technologies and tools does Refactrd use?",
    answer:
      "We work with modern, proven technologies including React, Next.js, TypeScript, Node.js, Python, AWS, Docker, Kubernetes, PostgreSQL, MongoDB, and more. Our tech stack choices are driven by your specific needs, prioritizing performance, scalability, and long-term maintainability over trends.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-padding bg-gradient-to-br from-white via-tertiary-light to-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-clash font-bold text-secondary mb-6 leading-tight">
                Frequently Asked Questions
              </h1>
              <p className="font-clash text-lg text-[#64748B] mb-8 leading-relaxed">
                As a leading software development partner, we are dedicated to
                providing comprehensive answers to help our clients make informed
                decisions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 py-3 bg-secondary text-white rounded-full font-clash font-semibold transition-all duration-300 hover:scale-105"
                >
                  Contact Us
                </Link>
               
              </div>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-7" id="all-questions">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-[#CBD5E1] rounded-xl overflow-hidden hover:border-[#A2D2FF] transition-all duration-300"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-start justify-between gap-4 p-6 text-left group"
                  >
                    <h3 className="text-lg font-clash font-semibold text-secondary group-hover:text-[#A2D2FF]transition-colors duration-300 flex-1">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 bg-tertiary rounded-full flex items-center justify-center group-hover:bg-[#A2D2FF] transition-all duration-300">
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-secondary group-hover:text-white transition-colors duration-300" />
                      ) : (
                        <Plus className="w-5 h-5 text-secondary group-hover:text-white transition-colors duration-300" />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  {openIndex === index && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="pt-2 border-t border-[#CBD5E1]">
                        <p className="font-clash text-[#64748B] leading-relaxed mt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 bg-gradient-to-br from-secondary to-secondary-light rounded-2xl p-8 lg:p-10 text-white text-center">
              <h3 className="text-2xl font-clash font-bold mb-4">
                Still have questions?
              </h3>
              <p className="font-clash text-white/80 mb-6 max-w-md mx-auto">
                Can't find the answer you're looking for? Our team is here to help
                you understand how Refactrd can support your project.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 bg-white text-black rounded-full font-clash font-semibold hover:bg-[#A2D2FF] transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
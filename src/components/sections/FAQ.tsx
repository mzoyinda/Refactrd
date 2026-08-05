"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFaqs: FAQItem[] = [
  {
    question: "What does Refactrd actually do?",
    answer:
      "Refactrd helps organizations move from AI experimentation to operational adoption through workflow transformation, solution implementation, adoption support, and capability building.",
  },
  {
    question: "Are these services or transformation areas?",
    answer:
      "These represent the areas where we most frequently help organizations create impact. The appropriate path depends on your goals, challenges, and stage of adoption.",
  },
  {
    question: "How do I know which area is right for me?",
    answer:
      "You don't need to decide that upfront. We'll help identify the opportunities, priorities, and challenges most relevant to your organization.",
  },
  {
    question: "Do you only work with organizations already using AI?",
    answer:
      "No. Many organizations are still exploring opportunities and evaluating where AI can create value. We help determine where adoption makes sense and how to approach it effectively.",
  },
  {
    question: "Do you implement solutions as well?",
    answer:
      "Yes. When implementation is the right path, our team supports solution design, engineering, deployment, adoption, and optimization. We help organizations move beyond planning and into practical execution while ensuring every implementation supports a broader operational objective.",
  },
  {
    question: "Do you work with startups, SMEs, and enterprises?",
    answer:
      "Yes. Our engagements are designed to support organizations at different stages of growth and adoption maturity.",
  },
  {
    question: "How is Refactrd different from other AI firms?",
    answer:
      "Most AI firms focus on technology. We focus on helping organizations improve workflows, implement practical solutions, drive adoption, and create measurable business outcomes.",
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "Choose the engagement path that best reflects your current situation and we'll guide you through the next steps.",
  },
];

export default function FAQ({ faqs = defaultFaqs }: { faqs?: FAQItem[] }) {
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
                Common Questions
              </h1>
              <p className="font-clash text-lg text-[#64748B] mb-8 leading-relaxed">
                Everything you need to know before getting started.
              </p>

              <a
                href="mailto:info@refactrd.com"
                className="inline-flex items-center gap-2 font-clash font-semibold text-[#1F2A44] hover:text-[#5a6580] transition-colors duration-200"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@refactrd.com
              </a>
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
                        <p className="font-clash text-secondary leading-relaxed mt-4">
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
                Reach out directly and we&apos;ll help you understand the right path forward.
              </p>
              <a
                href="mailto:info@refactrd.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-[#1F2A44] rounded-full font-clash font-semibold hover:bg-[#A2D2FF] hover:text-white transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@refactrd.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

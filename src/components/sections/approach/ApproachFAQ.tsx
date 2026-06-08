"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is the Refactrd Approach?",
    a: "The Refactrd Approach is a structured methodology for helping organizations move from AI experimentation to operational adoption through assessment, transformation, implementation, adoption, and capability building.",
  },
  {
    q: "Why do you focus on assessment first?",
    a: "Most organizations rush toward technology decisions. We focus on understanding challenges, opportunities, and priorities before recommending solutions or committing resources to implementation.",
  },
  {
    q: "What kinds of opportunities do you look for?",
    a: "We evaluate workflows, information flow, operations, customer experiences, products, and organizational readiness to identify areas where AI and workflow transformation can create meaningful business impact.",
  },
  {
    q: "Do all engagements follow this approach?",
    a: "Yes. The scope may vary, but every engagement begins with understanding the current state before moving toward transformation, implementation, and adoption.",
  },
  {
    q: "Can Refactrd help us implement solutions?",
    a: "Yes. When implementation is the right path, our team supports solution design, engineering, deployment, adoption, and optimization. We help organizations move beyond planning and into practical execution while ensuring every implementation supports a broader operational objective.",
  },
  {
    q: "How is this different from traditional AI consulting?",
    a: "Traditional AI consulting often begins with technology. Our approach begins with understanding how the organization works, what needs to change, and where implementation can create meaningful operational outcomes.",
  },
  {
    q: "Who is this approach designed for?",
    a: "Organizations looking to create measurable business outcomes through workflow transformation, operational improvement, implementation, and AI adoption.",
  },
  {
    q: "How do we get started?",
    a: "Start by choosing the engagement path that best reflects your current situation. Whether you're exploring opportunities, building a roadmap, or preparing to implement an initiative, we'll guide you through the next steps.",
  },
];

export default function ApproachFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-white">
      <div className="container-custom">

        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">FAQ</span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight max-w-[560px]">
            Common Questions About The Approach
          </h2>
        </div>

        {/* Accordion */}
        <div className={`space-y-3 max-w-[860px] transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#1F2A44]/20 shadow-md"
                    : "bg-white border-[#DDE3EE] hover:border-[#1F2A44]/20 hover:shadow-sm"
                }`}
              >
                <button
                  className="w-full flex items-start sm:items-center justify-between gap-4 p-5 sm:p-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-clash font-bold text-[15px] sm:text-[16px] text-[#1F2A44] leading-snug">
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 sm:mt-0 ${
                    isOpen ? "bg-[#1F2A44]" : "bg-[#F0F4F8]"
                  }`}>
                    {isOpen
                      ? <Minus className="w-4 h-4 text-white" strokeWidth={2} />
                      : <Plus className="w-4 h-4 text-[#5a6580]" strokeWidth={2} />
                    }
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="h-px bg-[#DDE3EE] mb-4" />
                    <p className="font-jakarta text-[14px] sm:text-[15px] text-[#5a6580] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

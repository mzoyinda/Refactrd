"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What exactly are we getting at the end of two weeks?",
    answer:
      "A deployed AI role handling a real function inside your business. Not a prototype, not a demo environment, not a report. A working system with documentation, defined decision boundaries, a data handling brief, and a handover review. You own everything we build.",
  },
  {
    question: "What does the paid build cost?",
    answer:
      "The audit, feasibility check, and security scoping are free. The build is fixed-scope and fixed-price, determined after the audit. We price based on complexity and build path. No surprises after you commit.",
  },
  {
    question: "What tools do you actually build on?",
    answer:
      "We build against enterprise-grade LLM APIs with signed data processing agreements in place, not consumer chat interfaces. Depending on the build path — determined by task complexity, integration depth, and data sensitivity — we use self-hosted workflow orchestration, a hybrid API service layer, or a full custom backend. The specific stack is never chosen before the audit. We score your problem first, then pick the infrastructure that fits it.",
  },
  {
    question: "Do we need a technical team internally?",
    answer:
      "No. We handle the engineering end to end. You need to brief us on the operational problem, give us access to the relevant tools and systems, and be available for weekly check-ins. The handover documentation is written to be understood without an engineering background.",
  },
  {
    question: "Is this replacing our team?",
    answer:
      "No. Every AI role we deploy is designed with human escalation points built in. AI handles execution and repetitive decisions within defined boundaries. Your team keeps strategy, direction, and anything outside the agent's defined scope. The goal is more output from the same headcount.",
  },
  {
    question: "What about our data? Where does it go?",
    answer:
      "This is scoped before the build starts, not after. We map what data the agent needs to access, establish the minimum permissions required, and choose an infrastructure path that matches your data sensitivity. At handover you receive a plain-language data handling brief covering where data goes, what logs exist, and how to revoke access.",
  },
  {
    question: "Why are spots limited?",
    answer:
      "We cap each cohort at a number we can genuinely deliver on. Doing the security scoping, data mapping, and infrastructure setup properly takes focused attention per client. We would rather do fewer builds well than spread thin.",
  },
  {
    question: "What if we want more after the two weeks?",
    answer:
      "We can scope a follow-on engagement to expand your AI workforce. That conversation only happens if you want it. The 2-Week Build is self-contained by design.",
  },
];

export default function ImplementationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-white via-[#F9FAFC] to-white">
      <div className="container max-w-[1200px] mx-auto px-[5vw]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#5a6580] mb-4 font-clash">
                Questions
              </span>
              <h2 className="text-4xl lg:text-5xl xl:text-5xl font-clash font-bold text-[#1F2A44] mb-6 leading-tight">
                Straightforward answers
              </h2>
              <p className="text-lg text-[#5a6580] mb-8 leading-relaxed font-jakarta">
                Clear information about the 2-Week Build. No marketing speak,
                just what you need to know before applying.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://refactrd.substack.com/subscribe?params=%5Bobject%20Object%5D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-clash inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
                >
                  Join the Waitlist
                </a>
              </div>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-[#DDE3EE] rounded-2xl overflow-hidden hover:border-[#A2D2FF] transition-all duration-300"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-start justify-between gap-4 p-6 text-left group"
                  >
                    <h3 className="text-lg font-clash font-bold text-[#1F2A44] group-hover:text-[#1F2A44] transition-colors duration-300 flex-1">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 bg-[#E6EAF0] rounded-full flex items-center justify-center group-hover:bg-[#A2D2FF] transition-all duration-300">
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-[#1F2A44] group-hover:text-white transition-colors duration-300" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#1F2A44] group-hover:text-white transition-colors duration-300" />
                      )}
                    </div>
                  </button>

                  {/* Answer with smooth animation */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-2 border-t border-[#DDE3EE]">
                        <p className="text-[#5a6580] leading-relaxed mt-4 font-jakarta">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "What exactly does Refactrd build?",
    answer:
      "We build AI-powered systems that help companies do less manual work. This includes workflow automations, internal AI assistants that give teams instant access to knowledge, AI features for existing products, and more advanced agentic systems for companies ready to go further. Every engagement starts with understanding your specific workflows, we do not offer generic solutions.",
  },
  {
    question: "How do you decide what to build first?",
    answer:
      "We start with a free AI Opportunity Mapping call, a short diagnostic conversation where we learn how your team works and identify two to three places where AI could make a meaningful difference. After the call, we map the highest-impact opportunity and recommend a focused starting point. You do not need to know what you want built before talking to us.",
  },
  {
    question: "What does delivery actually look like?",
    answer:
      "We scope the first engagement as a focused, single integration or automation. We build it, test it, and hand it over with documentation so your team knows how it works and can use it immediately. We also provide a roadmap for next steps, which often includes expanding the initial system or building the other opportunities we identified. But the first delivery is always a discrete, usable system that solves a specific problem.",
  },
  {
    question: "Do you work with teams that are new to AI?",
    answer:
      "Yes, most of our clients are at the beginning of their AI journey. You do not need any prior AI experience or infrastructure in place. Our job is to identify the right starting point and make the implementation straightforward. We handle the technical complexity so you do not have to.",
  },
  {
    question: "Do you work with startups, SMEs, or enterprises?",
    answer:
      "All three — what matters is whether your team has real operational friction that AI can fix. Startups often need automation early so their small teams can punch above their weight. Growing companies need smarter internal systems. Enterprise teams need a reliable technical partner for specific AI initiatives. We adapt our approach to where you are.",
  },
  {
    question: "What happens after the first project is delivered?",
    answer:
      "During the initial discovery, we typically identify two to three opportunities. We lead with the highest-impact one. After delivery, the others become natural next steps. The expansion feels like a continuation of the work, not a new sales conversation. Clients who see fast results almost always come back for the next one.",
  },
  {
    question: "How is Refactrd different from hiring an in-house AI engineer?",
    answer:
      "Hiring a senior AI engineer takes months and comes with overhead: salary, benefits, onboarding, and management. Refactrd gives you senior-level execution on a focused engagement, without the commitment of permanent hiring. And because we have built similar systems before, we move faster and avoid the trial-and-error that comes with figuring it out from scratch internally.",
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "Very little. Book a free AI Opportunity Mapping call and show up ready to talk through how your team operates day to day. We take it from there. No brief or technical specification required upfront.",
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
                As Refactrd's AI engineering studio, we want you to walk into any conversation informed. Here are the questions we hear most often.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://cal.com/refactrd/technical-discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
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
                Can't find the answer you're looking for? Our team is here to
                help you understand how Refactrd can support your project.
              </p>
              <Link
                href="https://cal.com/refactrd/technical-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
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

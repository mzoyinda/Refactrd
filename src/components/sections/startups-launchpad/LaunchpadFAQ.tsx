"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What kind of problems can the Launchpad solve?",
    answer:
      "The Launchpad works best for repetitive operational workflows that eat your team's time. Examples: manual reporting, support ticket triage, onboarding documentation, data entry across tools, recurring admin tasks. If it's repetitive and currently manual, we can likely automate it.",
  },
  {
    question: "How is this different from hiring a developer?",
    answer:
      "We're not building custom software from scratch. We're using existing AI tools and automation platforms to solve a specific workflow problem fast. A developer would take months and cost significantly more. We deliver in weeks.",
  },
  {
    question: "Do we need technical expertise on our team?",
    answer:
      "No. We handle all the technical work. You just need someone who understands the workflow problem well enough to walk us through it during the mapping call and test the solution during the trial.",
  },
  {
    question: "What happens during the 3-week trial?",
    answer:
      "The solution runs live in your operations. Your team uses it daily with real data and real workflows. We monitor it constantly and fix any issues within 24 hours.",
  },
  {
    question: "Can we expand to other workflows later?",
    answer:
      "Yes. If you subscribe after the trial, we can add additional workflows one at a time. Most companies start with one bottleneck, see results, then expand to the next one.",
  },
  {
    question: "How many companies are accepted per cohort?",
    answer:
      "We limit each cohort to ensure quality delivery. If your application is strong and the problem is a good fit, we'll let you know within 3-5 business days.",
  },
];

export default function LaunchpadFAQ() {
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
                Common questions about the Launchpad
              </h2>
              <p className="text-lg text-[#5a6580] mb-8 leading-relaxed font-jakarta">
                Everything you need to know before applying.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://forms.gle/sE5AhgZQrUN3mbC2A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-clash inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
                >
                  Apply Here
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

                  {/* Answer */}
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
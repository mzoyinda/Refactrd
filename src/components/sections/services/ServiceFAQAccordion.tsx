"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { ServiceFAQItem } from "@/data/services";

export default function ServiceFAQAccordion({ faqs }: { faqs: ServiceFAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
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
                {faq.question}
              </span>
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-0.5 sm:mt-0 ${
                  isOpen ? "bg-[#1F2A44]" : "bg-[#F0F4F8]"
                }`}
              >
                {isOpen ? (
                  <Minus className="w-4 h-4 text-white" strokeWidth={2} />
                ) : (
                  <Plus className="w-4 h-4 text-[#5a6580]" strokeWidth={2} />
                )}
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="h-px bg-[#DDE3EE] mb-4" />
                <p className="font-jakarta text-[14px] sm:text-[15px] text-[#5a6580] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

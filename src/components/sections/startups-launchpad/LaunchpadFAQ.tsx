'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What happens after the validation period?',
    a: 'If the initiative creates measurable value, you\'ll have the option to continue under a paid implementation, support, or transformation engagement. If it doesn\'t, you can exit without moving forward.',
  },
  {
    q: 'Do we need technical expertise?',
    a: 'No. The Launchpad is focused on operational improvement and validation, not technical capability.',
  },
  {
    q: 'Will a solution actually be implemented?',
    a: 'Yes. Accepted founders receive a practical implementation designed to be tested inside real operations.',
  },
  {
    q: 'Are we required to continue after the program?',
    a: 'No. Continuation is optional and based on the value demonstrated during the validation period.',
  },
];

export default function LaunchpadFAQ() {
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
    <section ref={sectionRef} id="faq" className="py-14 md:py-16 bg-[#F9FAFC]">
      <div className="container max-w-[1100px] mx-auto px-[5vw]">

        {/* Header */}
        <div className={`mb-8 grid lg:grid-cols-2 gap-8 items-end transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div>
            <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">FAQ</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight">
              Common Questions About The Launchpad
            </h2>
          </div>
          <p className="font-jakarta text-[16px] text-[#5a6580] leading-relaxed lg:pb-2">
            Still have something we haven&apos;t covered? Apply and ask us directly in your application. We respond to every submission personally, not with an autoresponder.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className={`space-y-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#1F2A44]/20 shadow-md'
                    : 'bg-white border-[#DDE3EE] hover:border-[#1F2A44]/20 hover:shadow-sm'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-6 p-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className={`font-clash font-bold text-[16px] leading-snug transition-colors ${isOpen ? 'text-[#1F2A44]' : 'text-[#1F2A44]'}`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-[#1F2A44]' : 'bg-[#F0F4F8] group-hover:bg-[#E8EDF5]'
                  }`}>
                    {isOpen
                      ? <Minus className="w-4 h-4 text-white" strokeWidth={2} />
                      : <Plus className="w-4 h-4 text-[#5a6580]" strokeWidth={2} />
                    }
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-72' : 'max-h-0'}`}>
                  <div className="px-6 pb-6">
                    <div className="h-px bg-[#DDE3EE] mb-4" />
                    <p className="font-jakarta text-[15px] text-[#5a6580] leading-relaxed max-w-[680px]">
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

'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  { label: 'Apply', detail: 'Submit your application and describe the challenge you\'d like to address.' },
  { label: 'Fit Review', detail: 'Refactrd reviews the opportunity and assesses program fit.' },
  { label: 'Founder Conversation', detail: 'Discuss goals, challenges, and validation objectives.' },
  { label: 'Acceptance', detail: 'Selected founders are invited into the program.' },
  { label: 'Begin The Launchpad', detail: 'Start implementation and validation.' },
];

export default function HowApplicationsWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 md:py-16 bg-white border-b border-[#E8ECF2] overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-[5vw]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">How Applications Work</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-clash font-bold text-[#1F2A44] leading-tight mb-8">
              A Selective Program Built For Fit
            </h2>

            <div className="space-y-4 mb-8">
              {steps.map((s, i) => (
                <div key={i} className={`flex items-start gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${100 + i * 80}ms` }}>
                  <span className="w-8 h-8 rounded-full bg-[#1F2A44] text-white font-clash font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-clash font-bold text-[#1F2A44] text-[15px]">{s.label}</p>
                    <p className="font-jakarta text-[#5a6580] text-[13px] leading-relaxed mt-0.5">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-jakarta text-[#5a6580] text-[14px] leading-relaxed mb-8 max-w-md">
              Applications are selective and reviewed individually. The goal is to ensure every participating founder has a meaningful opportunity to validate.
            </p>

            <a
              href="https://forms.gle/ECCpy6aoH5icfY4d9"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-[#1F2A44] text-white font-clash font-bold px-8 py-4 rounded-full hover:bg-[#2d3e62] transition-all duration-300 hover:shadow-lg"
            >
              Apply To The Launchpad
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="bg-[#F9FAFC] rounded-3xl border border-[#DDE3EE] p-8 md:p-10">
              <p className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#5a6580] mb-6">What To Expect</p>
              <div className="space-y-6">
                {[
                  { label: 'Response Time', value: 'Within 3–5 business days' },
                  { label: 'Program Length', value: '5 weeks' },
                  { label: 'Scope', value: 'One operational challenge' },
                  { label: 'Spots Per Cohort', value: 'Limited and selective' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 border-b border-[#DDE3EE] pb-5 last:border-0 last:pb-0">
                    <span className="font-jakarta text-sm text-[#5a6580]">{item.label}</span>
                    <span className="font-clash font-bold text-[#1F2A44] text-sm text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

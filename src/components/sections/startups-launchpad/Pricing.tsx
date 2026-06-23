'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, TrendingUp, X } from 'lucide-react';

const continuationOptions = [
  'Continuing with the implementation',
  'Expanding the solution to additional workflows',
  'Ongoing support and optimization',
  'Broader transformation initiatives',
];

const exitTakeaways = [
  'Operational insights',
  'Validation findings',
  'Lessons learned',
  'A clearer understanding of what should happen next',
];

export default function AfterTrial() {
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
    <section ref={sectionRef} id="after-trial" className="py-14 md:py-16 bg-white overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-[5vw]">

        {/* Header */}
        <div className={`mb-8 max-w-[600px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
            After The Validation Period
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight">
            Your decision. Your next step.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* Left: If it creates value */}
          <div className={`relative rounded-3xl overflow-hidden bg-[#1F2A44] transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#A2D2FF]/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#A2D2FF]" strokeWidth={2} />
                </div>
                <span className="font-clash font-bold text-[#A2D2FF] text-sm uppercase tracking-wider">
                  If The Initiative Creates Value
                </span>
              </div>

              <h3 className="text-2xl font-clash font-bold text-white mb-4 leading-tight">
                Continue With Confidence
              </h3>
              <p className="font-jakarta text-[15px] text-white/70 leading-relaxed mb-3 flex-1">
                If the solution creates measurable operational impact, you&apos;ll have the option to continue under a paid engagement.
              </p>
              <p className="font-jakarta text-[14px] text-white/55 leading-relaxed mb-5">
                Based on the results achieved, Refactrd will recommend the most appropriate continuation path. This may include:
              </p>

              <div className="space-y-2 border-t border-white/10 pt-6 mb-6">
                {continuationOptions.map((line, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#A2D2FF] flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-jakarta text-[14px] text-white/80">{line}</span>
                  </div>
                ))}
              </div>

              <p className="font-jakarta text-[13px] text-white/45 mb-6">
                You&apos;ll receive a recommended engagement plan and continuation options. The decision to continue is entirely yours.
              </p>

            
            </div>
          </div>

          {/* Right: If it isn't the right fit */}
          <div className={`flex flex-col gap-5 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex-1 rounded-3xl bg-[#F9FAFC] border border-[#DDE3EE] p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#5a6580]/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-[#5a6580]" strokeWidth={2} />
                </div>
                <span className="font-clash font-bold text-[#5a6580] text-sm uppercase tracking-wider">
                  If The Initiative Isn&apos;t The Right Fit
                </span>
              </div>

              <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-4 leading-tight">
                Exit With Clarity
              </h3>
              <p className="font-jakarta text-[15px] text-[#5a6580] leading-relaxed mb-5">
                Not every initiative should move forward. If the results don&apos;t justify continued investment, you can choose not to continue into a paid engagement.
              </p>

              <p className="font-jakarta text-[14px] text-[#5a6580] mb-4">You&apos;ll leave with:</p>
              <div className="space-y-2 mb-8">
                {exitTakeaways.map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#5a6580] flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-jakarta text-[14px] text-[#5a6580]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-l-2 border-[#DDE3EE] pl-4 mt-auto">
                <p className="font-clash font-semibold text-[#1F2A44] text-sm mb-1">Success isn&apos;t building something.</p>
                <p className="font-jakarta text-[#5a6580] text-sm">Success is knowing whether the opportunity is worth pursuing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

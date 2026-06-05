'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, TrendingUp, X } from 'lucide-react';
import Image from 'next/image';

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
            After The Program
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight">
            What happens next?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* Left: If it works */}
          <div className={`relative rounded-3xl overflow-hidden bg-[#1F2A44] transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Background image */}
            <div className="absolute inset-0">
              <Image src="/images/ai-sales.jpg" alt="Results" fill className="object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F2A44]/95 to-[#1F2A44]/80" />
            </div>

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
                Expand The Impact
              </h3>
              <p className="font-jakarta text-[15px] text-white/70 leading-relaxed mb-6 flex-1">
                Successful initiatives often reveal additional opportunities across workflows, knowledge systems, operations, and customer experiences. For teams ready to continue building, we&apos;ll help identify the next highest-impact opportunities and determine the most appropriate path forward.
              </p>

              <div className="space-y-2 border-t border-white/10 pt-6">
                {['Additional transformation opportunities', 'Workflow improvement initiatives', 'Operational capability building', 'Flexible follow-on engagements'].map((line, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#A2D2FF] flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-jakarta text-[14px] text-white/80">{line}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://forms.gle/ECCpy6aoH5icfY4d9"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-[#A2D2FF] text-[#1F2A44] font-clash font-bold px-6 py-3.5 rounded-full hover:bg-white transition-colors duration-300 self-start"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: If it doesn't */}
          <div className={`flex flex-col gap-5 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Walk away card */}
            <div className="flex-1 rounded-3xl bg-[#F9FAFC] border border-[#DDE3EE] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#5a6580]/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-[#5a6580]" strokeWidth={2} />
                </div>
                <span className="font-clash font-bold text-[#5a6580] text-sm uppercase tracking-wider">
                  If The Initiative Isn&apos;t The Right Fit
                </span>
              </div>

              <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-4 leading-tight">
                Leave With Clarity
              </h3>
              <p className="font-jakarta text-[15px] text-[#5a6580] leading-relaxed">
                Not every initiative should move forward. The purpose of the Launchpad is to validate opportunities before larger commitments are made. You&apos;ll leave with operational insights, recommendations, and a clearer understanding of what should happen next.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '5 Weeks', label: 'Typical Program Duration' },
                { value: '1 Opportunity', label: 'Focused Transformation Scope' },
                { value: 'Founder-Led', label: 'Hands-On Support' },
                { value: 'Real Operations', label: 'Built Inside Existing Workflows' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#F9FAFC] border border-[#DDE3EE] rounded-2xl p-5">
                  <p className="font-clash font-extrabold text-2xl text-[#1F2A44] leading-none mb-1">{stat.value}</p>
                  <p className="font-jakarta text-xs text-[#5a6580] leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

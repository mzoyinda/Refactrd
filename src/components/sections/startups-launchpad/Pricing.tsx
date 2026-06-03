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
            After the Trial
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight">
            What happens when the three weeks are up?
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
                  If it delivers results
                </span>
              </div>

              <h3 className="text-2xl font-clash font-bold text-white mb-4 leading-tight">
                You move to a monthly support plan
              </h3>
              <p className="font-jakarta text-[15px] text-white/70 leading-relaxed mb-6 flex-1">
                Your solution stays live, monitored, and maintained as your operations evolve. You get priority access to expand into additional workflows whenever you&apos;re ready. Most clients start with one bottleneck and build from there.
              </p>

              <div className="space-y-2 border-t border-white/10 pt-6">
                {['Flexible pricing — no fixed packages', 'No long-term contract', 'Cancel any time it stops delivering value', 'Priority access to expand to new workflows'].map((line, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-[#A2D2FF] flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-jakarta text-[14px] text-white/80">{line}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://forms.gle/sE5AhgZQrUN3mbC2A"
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
                  If it doesn&apos;t deliver
                </span>
              </div>

              <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-4 leading-tight">
                You walk away. No invoice.
              </h3>
              <p className="font-jakarta text-[15px] text-[#5a6580] leading-relaxed">
                If the solution doesn&apos;t hit the measurable outcomes we agreed on at the start, there is nothing to pay. No partial invoices, no &quot;almost there&quot; fees. We share the risk entirely.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '5 weeks', label: 'From audit to live AI solution' },
                { value: '$0', label: 'Upfront cost to participate' },
                { value: '24 hrs', label: 'Issue resolution during trial' },
                { value: '3 weeks', label: 'Live trial in real operations' },
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

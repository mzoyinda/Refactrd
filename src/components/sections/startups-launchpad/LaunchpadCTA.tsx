'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const reassurances = [
  { icon: '✦', text: 'No upfront payment to participate' },
  { icon: '✦', text: 'Response within 3 to 5 business days' },
  { icon: '✦', text: "If it's not the right fit, we'll tell you" },
];

export default function LaunchpadCTA() {
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
    <section ref={sectionRef} id="apply" className="py-24 md:py-32 bg-[#1F2A44] relative overflow-hidden">

      {/* Background image layer */}
      <div className="absolute inset-0 pointer-events-none">
        <Image src="/images/ai-operations.jpg" alt="" fill className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2A44]/95 via-[#1F2A44]/90 to-[#1F2A44]/95" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#A2D2FF]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#A2D2FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-[1100px] mx-auto px-[5vw] relative z-10">
        <div className={`max-w-[760px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-[#A2D2FF]/10 border border-[#A2D2FF]/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#639922] animate-pulse" />
            <span className="font-clash font-bold text-xs text-[#A2D2FF] tracking-[0.2em] uppercase">
              Cohort 2 Applications Open Now
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-[58px] font-clash font-extrabold text-white leading-tight mb-6">
            Cohort 1 is live.{' '}
            <span className="text-[#A2D2FF]">Cohort 2 applications are open now.</span>
          </h2>

          {/* Body */}
          <p className="font-jakarta text-[17px] text-white/65 leading-relaxed mb-10 max-w-[620px]">
            We review every application personally and only accept startups where we are genuinely confident we can deliver a meaningful result. If your problem is a strong fit, you will hear from us within three to five business days. If it is not, we will tell you honestly and point you toward a better option.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://forms.gle/sE5AhgZQrUN3mbC2A"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-[#A2D2FF] text-[#1F2A44] font-clash font-bold px-8 py-4 rounded-full hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <span className="font-clash text-sm text-white/40">
              Limited spots per cohort · Applications reviewed on a rolling basis
            </span>
          </div>

          {/* Reassurances */}
          <div className="mt-12 pt-10 border-t border-white/10">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              {reassurances.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[#A2D2FF] text-sm">{item.icon}</span>
                  <span className="font-jakarta text-[14px] text-white/60">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

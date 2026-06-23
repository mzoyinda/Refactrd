'use client';

import { useEffect, useRef, useState } from 'react';

const timeline = [
  { period: 'Week 1', title: 'Opportunity Discovery & Workflow Design', body: 'Identify the challenge, assess the workflow, and define the implementation path.' },
  { period: 'Week 2', title: 'Solution Build & Deployment', body: 'Implement a practical solution and integrate it into day-to-day operations.' },
  { period: 'Weeks 3–5', title: 'Validation Period', body: 'Use the solution, gather feedback, and measure results.' },
  { period: 'Final Review', title: 'Impact Assessment', body: 'Review outcomes, lessons learned, and determine the next step.' },
];

export default function LaunchpadTimeline() {
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
    <section ref={sectionRef} className="py-14 md:py-16 bg-[#1F2A44] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: 'linear-gradient(rgba(162,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="container max-w-[1200px] mx-auto px-[5vw] relative z-10">
        <div className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#A2D2FF]/60">The Five-Week Journey</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-clash font-bold text-white leading-tight">From Challenge To Measurable Outcome</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
          {timeline.map((t, i) => (
            <div
              key={i}
              className={`bg-white/[0.06] border border-white/10 rounded-2xl p-7 flex flex-col gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${150 + i * 100}ms` }}
            >
              <span className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#A2D2FF]/70">{t.period}</span>
              <h3 className="font-clash font-bold text-white text-[15px] leading-snug">{t.title}</h3>
              <p className="font-jakarta text-white/55 text-sm leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>

        <div className={`bg-white/[0.04] border border-white/10 rounded-2xl p-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="font-clash font-bold text-[9px] uppercase tracking-[0.2em] text-[#A2D2FF]/70 mb-3 block">Your Decision</span>
          <h3 className="font-clash font-bold text-white text-xl mb-3">Continue Or Exit With Clarity</h3>
          <p className="font-jakarta text-white/55 text-[14px] leading-relaxed max-w-2xl">
            If the initiative creates measurable value, continue with the solution and explore additional opportunities. If it doesn&apos;t, leave with operational insights, lessons learned, and a clearer understanding of what should happen next.
          </p>
        </div>
      </div>
    </section>
  );
}

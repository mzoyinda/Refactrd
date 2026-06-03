'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, XCircle } from 'lucide-react';

const goodFit = [
  'You have one specific, repetitive workflow eating your team\'s time',
  'Someone on your team will actually use the solution every day',
  'You can describe the problem concretely — time lost, tasks done manually, friction points',
  'You\'re ready to test AI in real operations, not just a demo environment',
  'Your team is 5 to 20 people',
];

const notRightTime = [
  'You\'re looking for a full operational transformation across every department',
  'You haven\'t identified your biggest bottleneck yet',
  'You need strategic advice more than a working solution',
  'Your team can\'t commit three weeks to properly test something new',
];

export default function WhoThisIsFor() {
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
    <section ref={sectionRef} id="who-this-is-for" className="pt-10 pb-14 md:pt-12 md:pb-16 bg-white overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-[5vw]">

        {/* Header */}
        <div className={`mb-8 max-w-[700px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
            Is this right for you?
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight">
            Built for early-stage startups with a specific problem to solve.
          </h2>
          <p className="mt-4 text-[17px] text-[#5a6580] leading-relaxed font-jakarta">
            The Launchpad works best when you have one clear operational bottleneck eating your team&apos;s time.
            If you&apos;re not sure where to start,{' '}
            <a  href="https://cal.com/refactrd/technical-discovery-call" target="_blank" rel="noopener noreferrer" className="text-[#1F2A44] font-semibold underline underline-offset-4 decoration-[#A2D2FF] hover:decoration-[#1F2A44] transition-all">
            Start with the free AI Mapping Call 
            </a>{' '}
            instead it is the better first step — it will give you that clarity before you commit to anything.
          </p>
        </div>

        {/* Main grid: image + cards */}
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-8 items-start">

          {/* Left: image */}
          <div className={`relative transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <Image
                src="/images/solving-problems.webp"
                alt="Team solving operational problems"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/60 via-transparent to-transparent" />
              {/* Floating label */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4">
                <p className="font-clash font-bold text-[#1F2A44] text-sm leading-snug">
                  One bottleneck. Five weeks. A working AI solution in your live operations.
                </p>
              </div>
            </div>
          </div>

          {/* Right: fit cards */}
          <div className="space-y-5">
            {/* Good Fit */}
            <div
              className={`bg-[#F4FBF0] border border-[#639922]/20 rounded-2xl p-7 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#639922]/15 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#639922]" strokeWidth={2.5} />
                </div>
                <h3 className="font-clash font-bold text-lg text-[#1F2A44]">You&apos;re a strong fit if</h3>
              </div>
              <ul className="space-y-3">
                {goodFit.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#639922] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="font-jakarta text-[14px] text-[#1F2A44] leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Right Time */}
            <div
              className={`bg-[#F9FAFC] border border-[#DDE3EE] rounded-2xl p-7 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-full bg-[#5a6580]/10 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-5 h-5 text-[#5a6580]" strokeWidth={2.5} />
                </div>
                <h3 className="font-clash font-bold text-lg text-[#1F2A44]">Not the right time if</h3>
              </div>
              <ul className="space-y-3">
                {notRightTime.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-[#5a6580] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="font-jakarta text-[14px] text-[#5a6580] leading-relaxed">
                      {point === 'You haven\'t identified your biggest bottleneck yet' ? (
                        <>
                          You haven&apos;t identified your biggest bottleneck yet.{' '}
                          <a href="/consultation" className="text-[#1F2A44] font-semibold underline underline-offset-2 hover:text-[#5a6580] transition-colors">
                          Start with the free AI Mapping Call 
                          </a>{' '}
                          instead.
                        </>
                      ) : point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

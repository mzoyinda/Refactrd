'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, XCircle } from 'lucide-react';

const goodFit = [
  'Your team has a repetitive or inefficient workflow',
  'You can clearly describe the challenge',
  'The challenge affects execution or decision-making',
  'You\'re willing to test a new approach',
  'You care about measurable outcomes',
];

const notRightTime = [
  'You\'re looking for a broad AI strategy engagement',
  'You haven\'t identified a challenge yet',
  'You\'re seeking technical training',
  'You want ideas without implementation',
  'You\'re not prepared to test changes in real operations',
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
            Is This Right For You?
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight">
            Built For Founders Ready To Improve How Work Gets Done
          </h2>
          <p className="mt-4 text-[17px] text-[#5a6580] leading-relaxed font-jakarta">
            The Launchpad is designed for founders with a clear operational challenge and a willingness to test a better way of working.
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
                  One challenge. One workflow. One measurable outcome.
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
                <h3 className="font-clash font-bold text-lg text-[#1F2A44]">You&apos;re A Strong Fit If</h3>
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
                <h3 className="font-clash font-bold text-lg text-[#1F2A44]">This May Not Be The Right Fit If</h3>
              </div>
              <ul className="space-y-3">
                {notRightTime.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-[#5a6580] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="font-jakarta text-[14px] text-[#5a6580] leading-relaxed">{point}</span>
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

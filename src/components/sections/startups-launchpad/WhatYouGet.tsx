'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, Rocket, ShieldCheck, Target } from 'lucide-react';
import Image from 'next/image';

const items = [
  {
    icon: Bot,
    tag: '01',
    title: 'Custom AI Solution',
    description:
      'Built specifically for your workflow — not a generic chatbot or off-the-shelf tool. We connect to your existing systems, automate the process end-to-end, and deploy it exactly where your team already works.',
    image: '/images/ai-workflow.jpg',
  },
  {
    icon: Rocket,
    tag: '02',
    title: 'Live Deployment',
    description:
      'Runs in your actual operations from day one. Real data, real workflows, real results. No sandbox testing, no staged environments, no hypothetical scenarios — just the solution working where it counts.',
    image: '/images/ai-operations.jpg',
  },
  {
    icon: ShieldCheck,
    tag: '03',
    title: 'Active Monitoring',
    description:
      "We watch the solution every single day during your trial. If something breaks or behaves unexpectedly, we fix it within 24 hours. You're not handed a tool and left to figure it out — we're in it with you.",
    image: '/images/ai-analytics.jpg',
  },
  {
    icon: Target,
    tag: '04',
    title: 'Clear Success Metrics',
    description:
      'Before we write a single line of code, we agree on exactly what success looks like. Specific, measurable outcomes. At the end of the trial, there is no ambiguity — you either hit the target or you walk away.',
    image: '/images/ai-dashboard.jpg',
  },
];

export default function WhatYouGet() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-you-get"
      className="py-14 md:py-16 bg-[#1F2A44] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A2D2FF]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#A2D2FF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-[1200px] mx-auto px-[5vw] relative z-10">
        {/* Header */}
        <div className={`text-center max-w-[680px] mx-auto mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#A2D2FF]">
            What Is Included
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-clash font-bold text-white leading-tight">
            Everything you need to run AI in production.
          </h2>
          <p className="mt-5 text-[17px] text-white/60 leading-relaxed font-jakarta">
            This is not a proof of concept. You get a working solution deployed in your real operations, plus the support to run it confidently from day one.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === i;

            return (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden cursor-default transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + i * 100}ms` }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background image (reveals on hover) */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-[#1F2A44]/85" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 border border-white/10 rounded-2xl hover:border-white/20 transition-colors duration-300 min-h-[280px] flex flex-col bg-white/5">
                  {/* Icon + tag */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-[#A2D2FF]/20' : 'bg-white/10'}`}>
                      <Icon className="w-6 h-6 text-[#A2D2FF]" strokeWidth={1.8} />
                    </div>
                    <span className="font-clash font-bold text-4xl text-white/10">{item.tag}</span>
                  </div>

                  <h3 className="text-xl font-clash font-bold text-white mb-3">{item.title}</h3>
                  <p className="font-jakarta text-[14px] text-white/65 leading-relaxed flex-1">{item.description}</p>

                  {/* Bottom accent bar */}
                  <div className={`mt-6 h-0.5 bg-[#A2D2FF] transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

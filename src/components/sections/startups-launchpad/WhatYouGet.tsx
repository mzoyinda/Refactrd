'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, Rocket, BookOpen, Eye, BarChart3, Sparkles } from 'lucide-react';

const deliverables = [
  {
    icon: Bot,
    title: 'Custom AI Solution',
    description:
      'Built specifically for your workflow. Not a generic chatbot or off-the-shelf tool. We connect to your systems, automate the process, and deploy it where your team works.',
  },
  {
    icon: Rocket,
    title: 'Live Deployment',
    description:
      'Runs in your actual operations from day one. Real data, real workflows, real results. No sandbox testing or hypothetical scenarios.',
  },
  {
    icon: BookOpen,
    title: 'Structured Handoff',
    description:
      'A walkthrough session with your team showing exactly what the solution does, how to use it, and what to do if something unexpected happens. Plus documentation you can reference later.',
  },
  {
    icon: Eye,
    title: 'Active Monitoring',
    description:
      "We watch the solution daily during your trial. If something breaks or behaves unexpectedly, we fix it within 24 hours. You're not left to figure it out alone.",
  },
  {
    icon: BarChart3,
    title: 'Clear Success Metrics',
    description:
      'Before we build anything, we agree on exactly what success looks like. Specific, measurable outcomes. At the end of the trial, you know whether it worked or not.',
  },
];

export default function WhatYouGet() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-br from-[#1F2A44] via-[#2a3a5c] to-[#1F2A44] text-white relative overflow-hidden"
      id="what-you-get"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#daeeff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-[1200px] mx-auto px-[5vw] relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#A2D2FF]" />
            <span className="text-sm font-bold tracking-wider uppercase font-clash">
              What's Included
            </span>
          </div>

          <h2
            className={`text-4xl lg:text-5xl font-clash font-bold leading-tight mb-6 transition-all duration-1000 ease-out delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Everything you need to run AI in production
          </h2>

          <p
            className={`text-lg text-white/90 leading-relaxed font-jakarta transition-all duration-1000 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            This isn't a proof of concept or a demo. You get a working solution deployed in your operations, plus everything you need to run it confidently.
          </p>
        </div>

        {/* Deliverables Grid - 2 Column Grid with 5th centered */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 md:items-stretch">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            const isLastOdd = deliverables.length % 2 !== 0 && index === deliverables.length - 1;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-[1.02] h-full ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isLastOdd ? 'md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto' : ''}`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/15 transition-all duration-300">
                      <Icon className="w-6 h-6 text-[#A2D2FF]" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-clash font-bold mb-4 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed flex-1 text-[15px] font-jakarta">
                    {item.description}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#A2D2FF]/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
                </div>

                {/* Bottom border animation */}
                <div className="h-1 bg-[#A2D2FF] w-0 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
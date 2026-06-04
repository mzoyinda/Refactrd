'use client';

import { useEffect, useRef, useState } from 'react';
import { ClipboardList, Map, Wrench, FlaskConical } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Identify The Opportunity',
    duration: 'Step 01',
    durationLabel: 'discovery',
    description:
      'Define the challenge, bottleneck, or workflow limiting execution, growth, or decision-making.',
  },
  {
    number: '02',
    icon: Map,
    title: 'Map The Current Workflow',
    duration: 'Step 02',
    durationLabel: 'assessment',
    description:
      'Assess how work gets done today, identify friction points, and determine what should change.',
  },
  {
    number: '03',
    icon: Wrench,
    title: 'Implement The Solution',
    duration: 'Step 03',
    durationLabel: 'implementation',
    description:
      'Deploy an AI-enabled solution within the workflow and support adoption inside real operations.',
  },
  {
    number: '04',
    icon: FlaskConical,
    title: 'Measure Results',
    duration: 'Step 04',
    durationLabel: 'measurement',
    description:
      'Evaluate performance, adoption, and business outcomes to determine the impact of the initiative.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance on desktop
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-12 md:py-16 bg-[#F9FAFC] overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-[5vw]">

        {/* Header */}
        <div className={`mb-8 max-w-[640px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
            The Process
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-clash font-bold text-[#1F2A44] leading-tight">
            From operational challenge to measurable outcome.
          </h2>
          <p className="mt-4 text-[16px] text-[#5a6580] leading-relaxed font-jakarta">
            A structured process designed to help founders move from exploration to implementation and validation without unnecessary complexity.
          </p>
        </div>

        {/* ── MOBILE: Vertical timeline (always visible) ── */}
        <div className="lg:hidden relative">
          {/* Connecting line */}
          <div className="absolute left-[19px] top-6 bottom-6 w-px bg-gradient-to-b from-[#1F2A44] via-[#A2D2FF] to-[#DDE3EE]" />

          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <div
                  key={i}
                  className={`relative pl-12 transition-all duration-700 ${!isLast ? 'pb-8' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${150 + i * 120}ms` }}
                >
                  {/* Circle dot on the line */}
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#1F2A44] flex items-center justify-center flex-shrink-0 shadow-md z-10">
                    <Icon className="w-5 h-5 text-[#A2D2FF]" strokeWidth={1.8} />
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl border border-[#DDE3EE] p-5 shadow-sm ml-2">
                    {/* Duration pill */}
                    <div className="inline-flex items-center gap-1.5 bg-[#A2D2FF]/10 rounded-full px-3 py-1 mb-3">
                      <span className="w-1 h-1 rounded-full bg-[#A2D2FF]" />
                      <span className="font-clash font-bold text-[10px] text-[#1F2A44] tracking-wider uppercase">
                        {step.duration} · {step.durationLabel}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-[17px] font-clash font-bold text-[#1F2A44] leading-tight">
                        {step.title}
                      </h3>
                      <span className="font-clash font-extrabold text-2xl text-[#1F2A44]/10 leading-none flex-shrink-0">
                        {step.number}
                      </span>
                    </div>

                    <p className="font-jakarta text-[14px] text-[#5a6580] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DESKTOP: Interactive tab + panel ── */}
        <div className="hidden lg:grid lg:grid-cols-[340px_1fr] gap-10 items-start">

          {/* Left: step selectors */}
          <div className="space-y-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeStep === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`w-full text-left rounded-2xl p-5 transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#1F2A44] border-[#1F2A44] shadow-lg'
                      : 'bg-white border-[#DDE3EE] hover:border-[#1F2A44]/30 hover:shadow-sm'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: isVisible ? `${i * 80}ms` : '0ms' }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive ? 'bg-[#A2D2FF]/20' : 'bg-[#F0F4FF]'
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#A2D2FF]' : 'text-[#5a6580]'}`} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-clash font-extrabold text-xs transition-colors ${isActive ? 'text-[#A2D2FF]' : 'text-[#5a6580]'}`}>
                          STEP {step.number}
                        </span>
                        <span className={`text-xs font-jakarta px-2 py-0.5 rounded-full transition-colors ${isActive ? 'bg-[#A2D2FF]/15 text-[#A2D2FF]' : 'bg-[#F0F4FF] text-[#5a6580]'}`}>
                          {step.duration}
                        </span>
                      </div>
                      <p className={`font-clash font-bold text-sm leading-tight transition-colors ${isActive ? 'text-white' : 'text-[#1F2A44]'}`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: active step detail */}
          <div className={`sticky top-28 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className={activeStep === i ? 'block' : 'hidden'}>
                  <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#DDE3EE] shadow-sm">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-[#1F2A44] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-[#A2D2FF]" strokeWidth={1.6} />
                      </div>
                      <span className="font-clash font-extrabold text-6xl text-[#1F2A44]/08 leading-none">{step.number}</span>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-[#A2D2FF]/10 rounded-full px-4 py-1.5 mb-5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF]" />
                      <span className="font-clash font-bold text-xs text-[#1F2A44] tracking-wider uppercase">
                        {step.duration} · {step.durationLabel}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-clash font-bold text-[#1F2A44] mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="font-jakarta text-[16px] text-[#5a6580] leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-8 flex gap-2">
                      {steps.map((_, j) => (
                        <div key={j} className={`h-1 flex-1 rounded-full transition-all duration-300 ${j <= i ? 'bg-[#1F2A44]' : 'bg-[#DDE3EE]'}`} />
                      ))}
                    </div>
                    <p className="mt-2 font-clash text-xs text-[#5a6580]">Step {i + 1} of {steps.length}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { ClipboardList, Target, Settings, CheckCircle2 } from 'lucide-react';

const processSteps = [
  {
    number: '01',
    icon: ClipboardList,
    title: "Tell us what's broken",
    description:
      'Apply with a specific operational problem. Not "we need AI" but "our team spends 10 hours weekly on manual reporting" or "support ticket triage eats our mornings." The more specific, the better we can help.',
    duration: '1 day',
  },
  {
    number: '02',
    icon: Target,
    title: 'Map the exact workflow',
    description:
      "A 45-minute call where we walk through your current process step by step. Every tool, every handoff, every friction point. We're not guessing what's broken - we're mapping it in detail. By the end, we agree on exactly what success looks like.",
    duration: 'Week 1',
  },
  {
    number: '03',
    icon: Settings,
    title: 'We build your solution',
    description:
      "1-2 weeks to build a custom AI solution for your exact problem. No templates. No generic tools. We connect to your systems, automate the workflow, and deploy it where your team actually works. You stay informed but you don't need to manage the build.",
    duration: 'Weeks 2-3',
    featured: true,
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Test it in real operations',
    description:
      "3 weeks to run the solution live. Not in a sandbox, in your actual operations with real data and real workflows. We monitor it daily, fix issues within 24 hours, and make sure it's delivering the results we agreed on.",
    duration: 'Weeks 4-6',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // Observe each step for scroll animations
  useEffect(() => {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleSteps((prev) => new Set(prev).add(index));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) stepObserver.observe(ref);
    });

    return () => stepObserver.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-white to-[#F9FAFC] relative overflow-hidden"
      id="how-it-works"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#A2D2FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#daeeff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-[1100px] mx-auto px-[5vw] relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#5a6580] mb-4 font-clash transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The Process
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-5 leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            From problem to solution in 5 weeks
          </h2>
          <p
            className={`text-lg text-[#5a6580] max-w-[700px] mx-auto leading-relaxed font-jakarta transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            No long discovery phases. No theoretical frameworks. We find your biggest operational bottleneck, build AI to handle it, and deploy it in your actual workflows.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-[800px] mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-[31px] top-8 bottom-8 w-0.5 bg-[#DDE3EE] hidden md:block overflow-hidden">
            <div 
              className="w-full bg-gradient-to-b from-[#A2D2FF] to-[#1F2A44] transition-all duration-1000 ease-out"
              style={{ 
                height: `${(visibleSteps.size / processSteps.length) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isStepVisible = visibleSteps.has(index);
              const isFeatured = step.featured;

              return (
                <div
                  key={index}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div
                    className={`relative bg-white border-2 rounded-2xl p-6 md:p-8 md:ml-20 transition-all duration-500 ${
                      isFeatured || isStepVisible
                        ? 'border-[#A2D2FF] shadow-xl'
                        : 'border-[#DDE3EE] shadow-lg hover:shadow-xl hover:border-[#A2D2FF]'
                    }`}
                  >
                    {/* Number Badge - Desktop */}
                    <div className="hidden md:block absolute -left-20 top-8">
                      <div
                        className={`relative w-16 h-16 rounded-full border-4 border-white flex items-center justify-center font-clash font-bold text-xl transition-all duration-500 ${
                          isFeatured || isStepVisible
                            ? 'bg-[#1F2A44] text-white shadow-lg scale-110'
                            : 'bg-[#E6EAF0] text-[#1F2A44]'
                        }`}
                      >
                        {step.number}
                        
                        {/* Animated ring */}
                        {isStepVisible && (
                          <div className="absolute inset-0 rounded-full border-2 border-[#A2D2FF] animate-ping-once" />
                        )}
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E6EAF0] text-[#1F2A44] font-clash font-bold mb-4">
                      {step.number}
                    </div>

                    {/* Icon & Title Row */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#E6EAF0] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#1F2A44]" strokeWidth={2} />
                        </div>
                        <h3 className={`text-2xl font-clash font-bold text-[#1F2A44] transition-all duration-500 ${
                          isStepVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                        }`}>
                          {step.title}
                        </h3>
                      </div>

                      {/* Duration */}
                      <span className={`text-sm font-semibold text-[#5a6580] font-clash flex-shrink-0 transition-all duration-500 ${
                        isStepVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                      }`}>
                        {step.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`text-[15px] text-[#5a6580] leading-relaxed font-jakarta transition-all duration-500 ${
                      isStepVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}>
                      {step.description}
                    </p>

                    {/* Featured badge */}
                    {isFeatured && (
                      <div className="mt-4">
                        <span className="inline-block bg-[#A2D2FF] text-[#1F2A44] text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg font-clash">
                          Main Build Phase
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

       
      </div>

      <style jsx>{`
        @keyframes ping-once {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping-once {
          animation: ping-once 1s cubic-bezier(0, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}
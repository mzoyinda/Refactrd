'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

const processSteps = [
  {
    number: '01',
    tag: 'Free',
    tagColor: 'bg-[#639922] text-white',
    title: 'Application review',
    description:
      'Submit your use case. We review and respond within 48 hours with next steps or an honest assessment of fit.',
    duration: '48 hours',
  },
  {
    number: '02',
    tag: 'Free',
    tagColor: 'bg-[#639922] text-white',
    title: 'AI audit',
    description:
      'We map your operations at the task level: what work happens, how often, how complex, and what data it touches. You get a prioritised view of what AI should own.',
    duration: '1 week',
  },
  {
    number: '03',
    tag: 'Free',
    tagColor: 'bg-[#639922] text-white',
    title: 'Role and security design',
    description:
      'We define the first AI role: its ownership, decision boundaries, inputs, and outputs. We also scope data access and the right build path. Only then do we price the build.',
    duration: '3-5 days',
  },
  {
    number: '04',
    tag: 'Paid',
    tagColor: 'bg-[#1F2A44] text-white',
    title: 'Build and deploy',
    description:
      '14 days for standard builds. Up to 3 weeks for engineered paths. Weekly check-ins. Live environment to test in. We ship the role into your actual operations, not a sandbox.',
    duration: '2-3 weeks',
    featured: true,
  },
  {
    number: '05',
    tag: 'Free',
    tagColor: 'bg-[#639922] text-white',
    title: 'Handover',
    description:
      'Working system, technical documentation, data handling brief, defined escalation paths, performance review, and access revocation instructions. You own everything. The build stands alone.',
    duration: '1 day',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
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

  // Observe each step individually for scroll animations
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
      id="process"
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
            Process
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-5 leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            From Application to Deployment
          </h2>
          <p
            className={`text-lg text-[#5a6580] max-w-[600px] mx-auto leading-relaxed font-jakarta transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Clear stages. No hidden steps. The timeline is set before we start.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-[800px] mx-auto">
          {/* Vertical Line - Animated */}
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
              const isActive = activeStep === index;
              const isFeatured = step.featured;
              const isStepVisible = visibleSteps.has(index);

              return (
                <div
                  key={index}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`relative transition-all duration-700 ease-out ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div
                    className={`relative bg-white border-2 rounded-2xl p-6 md:p-8 md:ml-20 transition-all duration-500 ${
                      isFeatured
                        ? 'border-[#A2D2FF] shadow-xl'
                        : isActive || isStepVisible
                        ? 'border-[#A2D2FF] shadow-xl'
                        : 'border-[#DDE3EE] shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {/* Number Badge - Desktop with scroll animation */}
                    <div className="hidden md:block absolute -left-20 top-8">
                      <div
                        className={`relative w-16 h-16 rounded-full border-4 border-white flex items-center justify-center font-clash font-bold text-xl transition-all duration-500 ${
                          isFeatured || isActive || isStepVisible
                            ? 'bg-[#1F2A44] text-white shadow-lg scale-110'
                            : 'bg-[#E6EAF0] text-[#1F2A44]'
                        }`}
                      >
                        {step.number}
                        
                        {/* Animated ring on scroll */}
                        {isStepVisible && (
                          <div className="absolute inset-0 rounded-full border-2 border-[#A2D2FF] animate-ping-once" />
                        )}
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E6EAF0] text-[#1F2A44] font-clash font-bold mb-4">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        {/* Tags Row */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span
                            className={`${step.tagColor} text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg font-clash transition-all duration-300 ${
                              isStepVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                            }`}
                            style={{ transitionDelay: '200ms' }}
                          >
                            {step.tag}
                          </span>
                          
                          {isFeatured && (
                            <span 
                              className={`bg-[#A2D2FF] text-[#1F2A44] text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg font-jakarta transition-all duration-300 ${
                                isStepVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                              }`}
                              style={{ transitionDelay: '300ms' }}
                            >
                              Main Build
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className={`text-2xl font-clash font-bold text-[#1F2A44] mb-2 transition-all duration-500 ${
                          isStepVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                        }`}
                        style={{ transitionDelay: '100ms' }}
                        >
                          {step.title}
                        </h3>
                      </div>

                      {/* Duration */}
                      <div className={`flex items-center gap-2 text-[#5a6580] flex-shrink-0 transition-all duration-500 ${
                        isStepVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                      }`}
                      style={{ transitionDelay: '200ms' }}
                      >
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-semibold font-clash">
                          {step.duration}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-[15px] text-[#5a6580] leading-relaxed font-jakarta transition-all duration-500 ${
                      isStepVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    }`}
                    style={{ transitionDelay: '300ms' }}
                    >
                      {step.description}
                    </p>

                    {/* Completion Indicator - for completed/active steps */}
                    {index < 3 && (
                      <div className={`mt-4 flex items-center gap-2 text-[#639922] transition-all duration-500 ${
                        isStepVisible ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
                      }`}
                      style={{ transitionDelay: '400ms' }}
                      >
                        <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                        <span className="text-xs font-semibold font-jakarta">
                          No commitment required
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
'use client';

import { useEffect, useRef, useState } from 'react';
import { Clock, Shield, Eye, Lock, FileText } from 'lucide-react';

const securityFeatures = [
  {
    icon: FileText,
    title: 'Data handling brief on delivery',
    description:
      "At handover you receive a plain-language document: what data the agent touches, where it goes, what logs exist, how long they're retained, and how to revoke access.",
  },
  {
    icon: Shield,
    title: 'Zero training on your data',
    description:
      'We do not use your operational data to train models. All inference calls run against pre-trained APIs under signed data processing agreements.',
  },
  {
    icon: Eye,
    title: 'Audit trail by default',
    description:
      'Every agent decision is logged. You can trace inputs, outputs, and escalation points for compliance or quality review.',
  },
  {
    icon: Lock,
    title: 'Minimum access principles',
    description:
      'The agent only sees the data it needs to complete its function. Nothing more. Permissions are scoped before deployment.',
  },
];

export default function Security() {
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
      id="security"
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
            <Shield className="w-4 h-4 text-[#A2D2FF]" />
            <span className="text-sm font-bold tracking-wider uppercase font-clash">
              How we handle data
            </span>
          </div>

          <h2
            className={`text-4xl lg:text-5xl font-clash font-bold leading-tight mb-6 transition-all duration-1000 ease-out delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Every build ships with a clear data story
          </h2>

          <p
            className={`text-lg text-white/90 leading-relaxed font-jakarta transition-all duration-1000 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Most no-code agent deployments skip this entirely. We treat it as a first-class
            deliverable. Before we write a line of code, we know exactly what data the agent
            touches, where it goes, and who can see it.
          </p>
        </div>

        {/* Security Cards - 2 Column Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 min-h-[240px] flex flex-col">
                  {/* Icon */}
                  <div className="mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/15 transition-all duration-300">
                      <Icon className="w-6 h-6 text-[#A2D2FF]" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-clash font-bold mb-4 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 leading-relaxed flex-1 text-[15px] font-jakarta">
                    {feature.description}
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

        {/* Bottom Note */}
        <div
          className={`mt-12 text-center transition-all duration-1000 ease-out delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-base text-white/80 leading-relaxed max-w-[700px] mx-auto font-clash">
            <span className="font-semibold text-white">Questions about data handling?</span>{' '}
            We address security and compliance requirements during the free feasibility scoping call, before any work begins.
          </p>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import { Zap, Layers, Code2, ChevronDown } from 'lucide-react';

const buildPaths = [
  {
    icon: Zap,
    tag: 'Rapid',
    title: 'Tool + Trigger',
    subtitle: '1-2 weeks',
    description:
      'Suitable for workflows that can be automated with existing tools. We configure, connect, and test. Perfect for straightforward automation needs.',
    features: [
      'No-code/low-code setup',
      'Rapid deployment',
      'Tool integration',
      'Quick turnaround',
    ],
    idealFor: 'Simple, repeatable workflows with clear triggers and actions',
  },
  {
    icon: Layers,
    tag: 'Hybrid',
    title: 'Light Integration',
    subtitle: '2-3 weeks',
    description:
      'Requires some custom logic or data transformation. We bridge your systems with smart middleware. Minimal engineering, maximum leverage.',
    features: [
      'Custom logic layer',
      'API connections',
      'Data transformation',
      'Flexible scaling',
    ],
    idealFor: 'Workflows needing conditional logic or multi-step processes',
  },
  {
    icon: Code2,
    tag: 'Engineered',
    title: 'Full Build',
    subtitle: '3-4 weeks',
    description:
      'Needs custom models, API integrations, or data pipelines. Complete technical stack with enterprise-grade architecture. Built to scale.',
    features: [
      'Custom AI models',
      'Complex integrations',
      'Enterprise security',
      'Full documentation',
    ],
    idealFor: 'Complex systems requiring custom development and infrastructure',
  },
];

export default function BuildPaths() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

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

  const toggleExpanded = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-12 bg-white"
      id="build-paths"
    >
      <div className="container max-w-[1200px] mx-auto px-[5vw]">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#5a6580] mb-4 font-clash transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Build Paths
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-5 leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Three Build Paths
          </h2>
          <p
            className={`text-lg text-[#5a6580] max-w-[650px] mx-auto leading-relaxed font-jakarta transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The path depends on your problem's complexity and current infrastructure. We recommend the right one after your audit.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {buildPaths.map((path, index) => {
            const Icon = path.icon;
            const isExpanded = expandedCards[index];

            return (
              <div
                key={index}
                className={`transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="h-full bg-white border-2 border-[#DDE3EE] rounded-2xl p-8 hover:border-[#A2D2FF] hover:shadow-xl transition-all duration-300">
                  {/* Icon + Tag */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#E6EAF0] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#1F2A44]" strokeWidth={2} />
                    </div>

                    <span className="bg-[#1F2A44] text-white text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg font-clash">
                      {path.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-1">
                      {path.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#5a6580] font-jakarta">
                      {path.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-[15px] text-[#5a6580] leading-relaxed mb-6 font-jakarta">
                    {path.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    {path.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1F2A44] mt-2 flex-shrink-0" />
                        <span className="text-sm text-[#1F2A44] font-medium font-jakarta">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#DDE3EE] mb-4" />

                  {/* Ideal For - Collapsible */}
                  <div>
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="w-full flex items-center justify-between py-3 group"
                    >
                      <span className="text-xs font-bold tracking-wider uppercase text-[#5a6580] font-jakarta">
                        Ideal for
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#5a6580] transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-sm text-[#1F2A44] leading-relaxed pb-3 font-jakarta">
                        {path.idealFor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-base text-[#5a6580] leading-relaxed max-w-[700px] mx-auto font-clash">
            <span className="font-semibold text-[#1F2A44]">Not sure which path?</span>{' '}
            During your free audit, we'll assess your specific needs and recommend the best approach.
          </p>
        </div>
      </div>
    </section>
  );
}
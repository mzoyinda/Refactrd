'use client';

import { useEffect, useRef, useState } from 'react';
import { Gift, TrendingUp, XCircle, DollarSign } from 'lucide-react';

const pricingBlocks = [
  {
    icon: Gift,
    title: 'Free Trial Phase',
    price: '$0',
    subtitle: 'Everything you need to test AI',
    description: 'No payment required. No credit card. No commitment.',
    features: [
      'Operational audit and workflow mapping',
      'Custom AI solution built for your problem',
      'Live deployment in your systems',
      '3 weeks of active monitoring and support',
      'Full handoff documentation',
    ],
    timeline: 'Weeks 1-6',
  },
  {
    icon: TrendingUp,
    title: 'After Trial',
    price: '$100',
    subtitle: 'per month',
    description: 'Subscribe only if the solution delivers measurable results.',
    features: [
      'Solution stays live and maintained',
      'Monthly performance monitoring',
      'Bug fixes and updates included',
      'Direct support when you need it',
      'Option to expand to additional workflows',
    ],
    timeline: 'If it works',
    featured: true,
  },
  {
    icon: XCircle,
    title: 'If It Doesn\'t Work',
    price: '$0',
    subtitle: 'Still free',
    description: 'Walk away with no payment, no contract, no hard feelings.',
    features: [
      'No payment required',
      'No long-term commitment',
      'Keep insights from the mapping call',
      "We'll explain what didn't work and why",
      'No questions asked',
    ],
    timeline: 'Your choice',
  },
];

export default function Pricing() {
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
      id="pricing"
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
            <DollarSign className="w-4 h-4 text-[#A2D2FF]" />
            <span className="text-sm font-bold tracking-wider uppercase font-clash">
              Pricing
            </span>
          </div>

          <h2
            className={`text-4xl lg:text-5xl font-clash font-bold leading-tight mb-6 transition-all duration-1000 ease-out delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Free to start. Subscribe only if it works.
          </h2>

          <p
            className={`text-lg text-white/90 leading-relaxed font-jakarta transition-all duration-1000 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            There's no upfront fee. The build is free as part of the program. You only pay if the solution delivers the results we agreed on during your trial.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 md:items-stretch">
          {pricingBlocks.map((block, index) => {
            const Icon = block.icon;

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-[1.02] h-full ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                <div
                  className={`p-8 bg-white/5 backdrop-blur-sm border transition-all duration-300 flex flex-col h-full ${
                    block.featured
                      ? 'border-[#A2D2FF] shadow-2xl'
                      : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  {/* Badge */}
                  {block.timeline && (
                    <div className="mb-6">
                      <span
                        className={`inline-block text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg font-clash ${
                          block.featured
                            ? 'bg-[#A2D2FF] text-[#1F2A44]'
                            : 'bg-white/10 text-white'
                        }`}
                      >
                        {block.timeline}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/15 transition-all duration-300">
                      <Icon className="w-7 h-7 text-[#A2D2FF]" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-clash font-bold mb-2 transition-colors duration-300">
                    {block.title}
                  </h3>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-4xl font-clash font-bold">
                      {block.price}
                    </span>
                    {block.subtitle && (
                      <span className="text-lg text-white/70 ml-2 font-clash">
                        {block.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/70 mb-6 font-jakarta leading-relaxed">
                    {block.description}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-white/10 mb-6" />

                  {/* Features List */}
                  <div className="space-y-3 flex-1">
                    {block.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-[#A2D2FF]" />
                        </div>
                        <span className="text-sm text-white/80 font-jakarta leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#A2D2FF]/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
                </div>

                {/* Bottom border animation */}
                <div
                  className={`h-1 w-0 group-hover:w-full transition-all duration-500 ${
                    block.featured ? 'bg-[#A2D2FF]' : 'bg-white/30'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
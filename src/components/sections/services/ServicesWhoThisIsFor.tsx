"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Rocket, TrendingUp, Building2, CheckCircle, ArrowRight } from "lucide-react";

const idealClients = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Building scalable operations from day one",
    features: [
      "Design workflows that support growth",
      "Build stronger operational foundations early",
    ],
  },
  {
    icon: TrendingUp,
    title: "Growing Businesses",
    description: "Improving efficiency and execution",
    features: [
      "Reduce operational bottlenecks",
      "Build capability across teams",
    ],
  },
  {
    icon: Building2,
    title: "Enterprises",
    description: "Moving from experimentation to adoption",
    features: [
      "Prioritize high-impact initiatives",
      "Align transformation efforts across departments",
    ],
  },
];

export default function ServicesWhoThisIsFor() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white" id="who-this-is-for">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className={`heading-lg text-secondary mb-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Who This Is For
          </h2>
          <p className={`body-lg text-secondary/80 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Organizations looking to create measurable operational impact through AI adoption.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {idealClients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br from-white to-tertiary/30 rounded-2xl p-8 border-2 border-tertiary card-hover transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#1F2A44]" />
                </div>
                <h3 className="heading-sm text-secondary mb-2">{client.title}</h3>
                <p className="font-clash text-[#0F172A] mb-6 font-semibold">{client.description}</p>
                <div className="space-y-3">
                  {client.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#0F172A] flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-clash text-secondary/70">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bridge Section */}
        <div className={`bg-secondary rounded-2xl p-8 lg:p-12 text-center text-white transition-all duration-700 delay-900 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="max-w-3xl mx-auto">
            <h3 className="heading-md mb-4">Not Sure Where To Start?</h3>
            <div className="font-jakarta text-white/70 text-base sm:text-lg leading-relaxed mb-8 space-y-3">
              <p>We'll help you identify the right service for your goals.</p>
            </div>
            <Link
              href="/get-started"
              className="group font-clash inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
            >
              Talk With Refactrd
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

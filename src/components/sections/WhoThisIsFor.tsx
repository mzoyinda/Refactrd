"use client";

import { useEffect, useRef, useState } from "react";
import { Rocket, TrendingUp, Building2, CheckCircle } from "lucide-react";

const idealClients = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Building scalable operations from the beginning.",
    features: [
      "Design workflows that support growth",
      "Build stronger operational foundations early",
      "Validate high-impact opportunities",
    ],
  },
  {
    icon: TrendingUp,
    title: "Growing Businesses",
    description: "Improving execution, efficiency, and organizational capability.",
    features: [
      "Reduce operational bottlenecks",
      "Improve team performance",
      "Scale adoption across functions",
    ],
  },
  {
    icon: Building2,
    title: "Enterprises",
    description: "Moving from experimentation to coordinated adoption.",
    features: [
      "Prioritize high-impact opportunities",
      "Create alignment and governance",
      "Build long-term capability",
    ],
  },
];

export default function WhoThisIsFor() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white"
      id="who-this-is-for"
    >
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2
            className={`heading-lg text-secondary mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Who This Is For
          </h2>
          <p
            className={`body-lg text-secondary/80 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Organizations looking to move from AI experimentation to operational impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {idealClients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br from-white to-tertiary/30 rounded-2xl p-8 border-2 border-tertiary card-hover transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#1F2A44]" />
                </div>
                <h3 className="heading-sm text-secondary mb-2">{client.title}</h3>
                <p className="font-clash text-[#0F172A] mb-6 font-semibold">
                  {client.description}
                </p>
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
      </div>
    </section>
  );
}
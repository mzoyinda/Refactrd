"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Rocket, TrendingUp, Building2, CheckCircle } from "lucide-react";

const idealClients = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Building or extending core products",
    features: [
      "Need software delivered without managing an internal engineering team",
      "Want to focus on product-market fit while we handle technical execution",
    ],
  },
  {
    icon: TrendingUp,
    title: "SMEs",
    description: "Improving and scaling existing systems",
    features: [
      "Have existing systems that require improvement, extension, or documentation",
      "Ready to scale operations with reliable technical infrastructure",
    ],
  },
  {
    icon: Building2,
    title: "Enterprises",
    description: "Outsourcing specific software initiatives",
    features: [
      "Want a reliable partner to own execution end-to-end",
      "Value quality, clarity, and long-term maintainability",
    ],
  },
];

export default function WhoThisIsFor() {
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
      className="section-padding bg-white"
      id="who-this-is-for"
    >
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            className={`heading-lg text-secondary mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Who This Is For
          </h2>
          <p
            className={`body-lg text-secondary/80 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Refactrd is a good fit for organizations that value quality and want
            reliable software delivery.
          </p>
        </div>

        {/* Client types */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {idealClients.map((client, index) => {
            const Icon = client.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br from-white to-tertiary/30 rounded-2xl p-8 border-2 border-tertiary card-hover transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 150}ms` }}
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#1F2A44]" />
                </div>
                <h3 className="heading-sm text-secondary mb-2">
                  {client.title}
                </h3>
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

        {/* CTA Card */}
        <div
          className={`bg-secondary rounded-2xl p-8 lg:p-12 text-center text-white transition-all duration-700 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="heading-md mb-6">
              Does this sound like your organization?
            </h3>
            <p className="body-lg text-white/80 mb-8">
              Let's have a conversation about your needs and explore how we can
              help you achieve your goals.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-secondary px-8 py-4 rounded-lg font-jakarta font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Book a call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
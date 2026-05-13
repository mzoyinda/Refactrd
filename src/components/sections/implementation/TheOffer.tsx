"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Gift, ArrowRight } from "lucide-react";

const offerItems = [
  {
    title: "Free AI audit and workforce plan",
    description:
      "We map your operations at the task level: what work exists, how often, how complex, and what data it touches. You walk away with a clear view of what should be handled by AI versus your team, and which role to deploy first.",
    tag: "Free",
    tagColor: "bg-[#639922] text-white",
  },
  {
    title: "Free feasibility and security scoping",
    description:
      "Before we commit to building anything, we validate that your problem is the right fit for a 2-week deployment and establish the data handling requirements upfront. You get a clear green light or an honest explanation of what needs to be true first.",
    tag: "Free",
    tagColor: "bg-[#639922] text-white",
  },
  {
    title: "One deployed AI role",
    description:
      "Not a chatbot. Not a demo. An AI role with defined ownership, decision boundaries, and continuous output. Built on enterprise-grade LLM APIs with a proper service layer, not consumer interfaces.",
    tag: "Paid",
    tagColor: "bg-[#1F2A44] text-white",
  },
  {
    title: "Delivery in 14 days",
    description:
      "From audit kickoff to deployed role. Engineered builds for regulated or data-sensitive environments may extend to 3 weeks depending on complexity. We scope to what can ship well and hold to it.",
    tag: "Paid",
    tagColor: "bg-[#1F2A44] text-white",
  },
  {
    title: "Full handover package",
    description:
      "Working system, technical documentation, a data handling brief that tells you exactly what the agent touches and where it goes, defined escalation paths, and a performance review. You own everything we build.",
    tag: "Included",
    tagColor: "bg-[#A2D2FF] text-[#1F2A44]",
  },
];

export default function TheOffer() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
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
      id="offer"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#daeeff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-[1200px] mx-auto px-[5vw] relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Gift className="w-4 h-4 text-[#A2D2FF]" />
            <span className="font-clash text-sm font-bold tracking-wider uppercase">
              The offer
            </span>
          </div>

          <h2
            className={`text-4xl lg:text-5xl font-clash font-extrabold leading-tight mb-6 transition-all duration-1000 ease-out delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Give Your Team Back the Hours that Matter
          </h2>

          <p
            className={`font-jakarta text-lg text-white/90 leading-relaxed transition-all duration-1000 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            The work worth hiring great people for is not data entry, inbox
            triage, or weekly report assembly. We identify what's eating your
            team's time and deploy an AI role to own it, so your people can
            focus on the work only they can do.
          </p>
        </div>

        {/* Offer Cards - 2 Column Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {offerItems.map((item, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-[1.02] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${index === 4 ? 'md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto' : ''}`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 min-h-[280px] flex flex-col">
                {/* Tag */}
                <div className="mb-4">
                  <span
                    className={`font-clash inline-block text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-clash font-bold mb-4 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-jakarta text-white/80 leading-relaxed flex-1 text-[15px]">
                  {item.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#A2D2FF]/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
              </div>

              {/* Bottom border animation */}
              <div className="h-1 bg-gradient-to-r from-[#A2D2FF] to-[#daeeff] w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* No Commitment CTA Block */}
        <div
          className={`relative overflow-hidden rounded-2xl transition-all duration-1000 ease-out delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="p-8 lg:p-10 bg-white backdrop-blur-sm border-2 border-white/10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Left: Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2
                    className="w-8 h-8 text-black"
                    strokeWidth={2.5}
                  />
                  <h3 className="text-2xl lg:text-3xl font-clash font-bold text-black">
                    No commitment required
                  </h3>
                </div>
                <p className="font-jakarta text-black leading-relaxed text-base">
                  This is a one-time build. No ongoing contracts, no monthly
                  fees. You get the AI role, we move on. The system is yours to
                  keep, modify, and scale as you see fit.
                </p>
              </div>

              {/* Right: CTA Button */}
              <div className="flex-shrink-0">
                <a
                  href="https://refactrd.substack.com/subscribe?params=%5Bobject%20Object%5D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-[#E6EAF0] rounded-full font-clash font-bold hover:bg-[#E6EAF0] transition-all duration-300 hover:scale-105 group whitespace-nowrap"
                >
                  Join the Waitlist
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

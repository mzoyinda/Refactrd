"use client";

import { useEffect, useRef, useState } from "react";
import { Code, Zap, Users, TrendingUp, Globe, Heart } from "lucide-react";

const benefits = [
  {
    icon: Code,
    title: "Work on Real Projects",
    description:
      "Contribute to meaningful software projects that solve real business problems for clients across different industries.",
  },
  {
    icon: Zap,
    title: "Learn and Grow",
    description:
      "Work alongside senior engineers, gain hands-on experience, and develop skills that accelerate your career.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Join a team that values clarity, quality, and ownership. We support each other and celebrate wins together.",
  },
  {
    icon: TrendingUp,
    title: "Career Development",
    description:
      "Clear growth paths, mentorship opportunities, and the chance to take on increasing responsibility as you grow.",
  },
  {
    icon: Globe,
    title: "Remote-First",
    description:
      "Work from anywhere with flexible hours. We focus on outcomes, not where or when you work.",
  },
  {
    icon: Heart,
    title: "Meaningful Impact",
    description:
      "Your work matters. You'll see the direct impact of your contributions on client success and product quality.",
  },
];

export default function WhyWorkHere() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const relativeScroll = window.scrollY - sectionTop;
      setScrollY(relativeScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden text-white"
      id="why-work-here"
    >
      {/* Parallax Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <img
          src="/images/about-refactrd.webp"
          alt="Team collaboration"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-[#5B6CFF]/20 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2
            className={`text-4xl lg:text-5xl font-clash font-bold mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Why Work at Refactrd?
          </h2>
          <p
            className={`text-lg font-clash text-white/70 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            We're building a team of talented individuals who are passionate
            about creating high-quality software and delivering exceptional
            value to our clients.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              //   <div
              //     key={index}
              //     className={`bg-gradient-to-br from-white to-[#E6EAF0]/30 rounded-2xl p-8 border-2 border-[#CBD5E1] hover:border-[#A2D2FF] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
              //       isVisible
              //         ? "opacity-100 translate-y-0"
              //         : "opacity-0 translate-y-8"
              //     }`}
              //     style={{ transitionDelay: `${300 + index * 100}ms` }}
              //   >
              //     <div className="w-14 h-14 bg-[#5B6CFF]/10 rounded-xl flex items-center justify-center mb-6">
              //       <Icon className="w-7 h-7 text-[#5B6CFF]" />
              //     </div>
              //     <h3 className="text-xl font-clash font-semibold text-[#1F2A44] mb-3">
              //       {benefit.title}
              //     </h3>
              //     <p className="text-[#64748B] leading-relaxed">
              //       {benefit.description}
              //     </p>
              //   </div>
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-[1.02] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="p-6 lg:p-8 bg-gradient-to-br from-secondary to-secondary-light text-white relative min-h-[320px] flex flex-col">
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />

                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="w-14 h-14 bg-[#5B6CFF]/10 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-clash font-semibold mb-3">
                      {benefit.title}
                    </h3>
                    <p className="leading-relaxed font-clash">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
                </div>

                {/* Bottom border animation */}
                <div className="h-1 bg-primary w-0 group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

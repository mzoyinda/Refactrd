"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

export default function ServicesCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-white overflow-hidden" id="services">
      <div className="container-custom">
        {/* Header */}
        <div
          className={`max-w-3xl mb-12 lg:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-clash font-bold text-[#1F2A44] leading-tight mb-5 sm:mb-6">
            Where We Create Operational Impact
          </h2>
          <div className="space-y-4 font-jakarta text-[#5a6580] text-[15px] sm:text-base lg:text-lg leading-relaxed">
            <p>Every organization is different. Our services focus on the areas where AI delivers the greatest operational value.</p>
          </div>
        </div>

        {/* Service blocks */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-28">
          {services.map((service, index) => {
            const reverse = index % 2 === 1;
            return (
              <div
                key={service.slug}
                className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${150 + index * 120}ms` }}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 flex-shrink-0">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/60 via-transparent to-transparent" />
                    <span className="absolute top-5 left-5 font-clash font-bold text-[10px] tracking-[0.2em] uppercase text-white/80 px-2.5 py-1 rounded-full bg-black/20 backdrop-blur-sm">
                      {service.level}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <span className="text-xs font-clash font-bold tracking-[0.2em] uppercase text-[#5a6580]">
                    {service.level} &mdash; {service.title}
                  </span>
                  <h3 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight">
                    {service.headline}
                  </h3>

                  <div className="mt-5 space-y-4">
                    {service.body.map((paragraph, i) => (
                      <p key={i} className="font-jakarta text-[#5a6580] text-[15px] sm:text-base leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-clash font-bold uppercase tracking-[0.18em] text-[#1F2A44] mb-3">
                      What We Help With
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                      {service.helpWith.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#A2D2FF] flex-shrink-0" />
                          <span className="font-jakarta text-sm text-[#5a6580]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 rounded-xl bg-[#F9FAFC] border border-[#DDE3EE] p-4 sm:p-5">
                    <p className="text-[10px] font-clash font-bold uppercase tracking-[0.18em] text-[#5a6580] mb-1.5">
                      The Outcome
                    </p>
                    <p className="font-clash font-semibold text-[15px] sm:text-base text-[#1F2A44] leading-snug">
                      {service.outcome}
                    </p>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="group mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1F2A44] font-clash font-bold text-sm text-[#1F2A44] hover:bg-[#1F2A44] hover:text-white transition-all duration-300"
                  >
                    Explore {service.title}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

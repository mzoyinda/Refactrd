"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ProblemSection() {
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
      className="section-padding bg-gradient-to-br from-tertiary/40 via-white to-tertiary/20"
      id="problem"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-between">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="aspect-[4/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                <Image
                  src="/images/team.png"
                  alt="Team collaborating on software development"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 rounded-2xl -z-10 blur-2xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10 blur-2xl" />
          </div>

          {/* Right: Content */}
          <div
            className={`flex flex-col justify-center transition-all duration-1000 ease-out delay-200  ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <h2 className="heading-lg text-[47px] md:leading-20 text-secondary mb-3">
              Most Organizations Don&apos;t Have An AI Problem.
            </h2>
            <p className="font-clash font-semibold text-xl text-secondary/60 mb-2">
              They Have An Operational Adoption Problem.
            </p>

            <div className="w-[200px] h-1 bg-[#1F2A44] mb-10 rounded-full" />

            <div className="space-y-8">
              <div>
                <p className="font-clash font-bold text-[#1F2A44] text-lg mb-1">AI is becoming part of everyday work.</p>
                <p className="font-jakarta tracking-[-0.02em] text-secondary/70">Operational impact is still difficult to find.</p>
              </div>

              <p className="font-jakarta tracking-[-0.02em] text-secondary/75 leading-relaxed pb-4">
                Many organizations are investing in AI without seeing meaningful improvements in execution, decision-making, or business performance.
              </p>

              <div className="border-l-4 border-[#A2D2FF] pl-5 space-y-3 ">
                <p className="font-clash font-semibold text-[#1F2A44]">The challenge isn&apos;t whether AI can help.</p>
                <p className="font-clash font-bold text-[#1F2A44]">
                  It&apos;s knowing where it can create{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">Meaningful Operational Impact </span>
                    <span className="absolute hidden md:block bottom-0.5 left-0 w-full h-2 bg-[#A2D2FF]/50 -z-0 rounded-sm" />
                  </span>
                   &nbsp; and implementing it successfully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

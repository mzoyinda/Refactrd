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
      className="section-padding bg-gradient-to-br from-tertiary/40 via-white to-tertiary/20"
      id="problem"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                <Image
                  src="/images/solving-problems.webp"
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
            className={`transition-all duration-1000 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <h2 className="heading-lg text-secondary mb-6">
              The Problem We Solve
            </h2>

            <div className="w-[200px] h-1 bg-[#1F2A44] mb-8 rounded-full" />

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center group-hover:bg-accent transition-colors duration-300 group-hover:scale-110 transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="heading-sm text-secondary mb-2 group-hover:text-accent transition-colors duration-300">
                    We Handle the Complexity
                  </h3>
                  <p className="font-montserrat text-secondary/70">
                    Most teams know what they want to build but not the operational burden that comes with it. We remove the need to hire, manage, and coordinate across engineering, infrastructure, and documentation.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center group-hover:bg-accent transition-colors duration-300 group-hover:scale-110 transform">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="heading-sm text-secondary mb-2 group-hover:text-accent transition-colors duration-300">
                    Built Once. Built Right.
                  </h3>
                  <p className="font-montserrat text-secondary/70">
                    From architecture to delivery, we take full ownership so the software you ship is stable, documented, and designed to grow with your business.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
           
          </div>
        </div>
      </div>
    </section>
  );
}
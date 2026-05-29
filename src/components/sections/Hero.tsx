"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-tertiary-light via-white to-primary/10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="heading-xl text-secondary mb-6 animate-fade-up">
            Still doing things manually?{" "}
            <span className="relative inline-block">
              <span className="relative z-10">We fix that with AI.</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-primary -z-0 transform -rotate-1" />
            </span>
          </h1>

          {/* Subheading */}

          {/* Supporting text */}
          <p className="font-jakarta text-lg  leading-relaxed text-secondary max-w-3xl mx-auto animate-fade-up delay-300 tracking-[-0.03em]">
         Refactrd is an AI Engineering Studio. We work with founders, growing businesses, and enterprises to introduce AI into their operations in a structured, secure, and measurable way. Whether you are exploring where to start or ready to build, there is a clear path forward.
          </p>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-500 mt-[30px]">
            <Link
              href="/get-started"
              className="font-clash inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
            >
              Find Your Starting Point
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/case-studies"
              target="_blank"
              rel="noopener noreferrer"
              className="font-clash border border-[#1F2A44] px-8 py-4 rounded-full "
            >
              See Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

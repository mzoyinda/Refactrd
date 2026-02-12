"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-padding bg-gradient-to-br from-secondary via-secondary-dark to-secondary overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}

          {/* Heading */}
          <h2 className="heading-xl text-white mb-6 animate-fade-up">
            Outsource your software with{" "}
            <span className="relative inline-block">
              <span className="relative z-10">confidence</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-accent/40 -z-0 transform rotate-1" />
            </span>
          </h2>

          {/* Subheading */}
          <p className="body-lg text-white/80 mb-12 max-w-2xl mx-auto animate-fade-up delay-200">
            Let's discuss what you need built and how Refactrd can deliver it.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-up delay-300">
            <Link
              href="https://cal.com/refactrd/technical-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
            >
              Book a call
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Supporting text */}
          <p className="mt-8 text-white/60 font-montserrat text-sm animate-fade-up delay-500">
            No commitment required • Free consultation • Quick response
          </p>
        </div>
      </div>

      {/* Bottom border decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
}

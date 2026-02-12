"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesCTA() {
  return (
    <section className="section-padding bg-secondary text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg mb-6">Ready to Build Something Great?</h2>
          <p className="body-lg text-white/80 mb-12 max-w-2xl mx-auto">
            Let's discuss your project and explore how Refactrd can help you
            deliver reliable, scalable software.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://cal.com/refactrd/technical-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-clash font-bold hover:bg-accent-light transition-all duration-300 hover:scale-105 group"
            >
              Book a Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border-2 border-white/20 text-white rounded-full font-clash font-semibold hover:bg-white hover:text-secondary transition-all duration-300 hover:scale-105"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

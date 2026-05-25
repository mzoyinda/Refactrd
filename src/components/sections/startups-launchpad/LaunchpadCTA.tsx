"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function LaunchpadCTA() {
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
      className="py-20 md:py-32 bg-gradient-to-br from-[#1F2A44] via-[#2a3a5c] to-[#1F2A44] text-white relative overflow-hidden"
      id="apply"
    >
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#daeeff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-[900px] mx-auto px-[5vw] relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-clash font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Ready to automate your biggest bottleneck?
          </h2>

          <p
            className={`text-lg md:text-xl text-white/90 leading-relaxed max-w-[650px] mx-auto font-jakarta transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Join Cohort 1 of the AI Startups Launchpad. Limited spots available for startups ready to test AI in their operations.
          </p>
        </div>

        {/* Application Card */}
        <div
          className={`bg-white rounded-3xl p-8 md:p-12 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* What happens next */}
          <div className="mb-10">
            <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-6">
              What happens after you apply
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#639922]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2
                    className="w-4 h-4 text-[#639922]"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <p className="text-[#1F2A44] font-semibold font-clash mb-1">
                    We review your application
                  </p>
                  <p className="text-sm text-[#5a6580] font-jakarta">
                    Within 3-5 business days, we'll let you know if your problem is a good fit for the Launchpad or if we recommend our full audit instead.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#639922]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2
                    className="w-4 h-4 text-[#639922]"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <p className="text-[#1F2A44] font-semibold font-clash mb-1">
                    Mapping call (free, no commitment)
                  </p>
                  <p className="text-sm text-[#5a6580] font-jakarta">
                    45 minutes to walk through your workflow in detail and agree on what success looks like. You'll know exactly what we're building before work starts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#639922]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2
                    className="w-4 h-4 text-[#639922]"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <p className="text-[#1F2A44] font-semibold font-clash mb-1">
                    Build starts (1-2 weeks)
                  </p>
                  <p className="text-sm text-[#5a6580] font-jakarta">
                    We build your AI solution and deploy it live in your operations. Then you test it free for 3 weeks and decide whether to subscribe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#DDE3EE] mb-10" />

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-xl font-clash font-bold text-[#1F2A44] mb-4">
              Ready to get started?
            </h3>
            <p className="text-[#5a6580] mb-8 font-jakarta">
              Apply now to reserve your spot in Cohort 1 (launching June 2026).
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.gle/sE5AhgZQrUN3mbC2A"
                target="_blank"
                rel="noopener noreferrer"
                className="font-clash inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
              >
                Apply Here
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#5a6580] font-clash">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#639922]" />
                <span>No commitment required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#639922]" />
                <span>Free trial included</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#639922]" />
                <span>3-5 day response time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
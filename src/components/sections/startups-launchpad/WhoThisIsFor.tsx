"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Pause, ArrowRight } from "lucide-react";

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
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goodFitPoints = [
    "You have a specific, repetitive workflow slowing your team down",
    "Someone on your team will actually use the solution daily",
    'You can describe the problem in concrete terms (not "we need to be more efficient")',
    "You're ready to test AI in live operations, not just explore",
    "You have 5-20 people on your team",
  ];

  const notYetPoints = [
    "You're looking for a full operational transformation across departments",
    "You're not sure what your biggest bottleneck is yet",
    "You need theoretical consulting more than a working solution",
    "Your team can't commit to testing something new for 3 weeks",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
      id="who-this-is-for"
    >
      <div className="container max-w-[1200px] mx-auto px-[5vw] relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#5a6580] mb-4 font-clash transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Is this right for you?
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-5 leading-tight transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Built for growing startups with a specific problem
          </h2>
          <p
            className={`text-lg text-[#5a6580] max-w-[700px] mx-auto leading-relaxed font-jakarta transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            The Launchpad works best when you have one clear operational
            bottleneck eating your team's time. If you're not sure where to
            start with AI or you need a complete operational overhaul, our full
            audit is a better fit.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Good Fit Column */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-to-br from-[#F9FAFC] to-white border-2 border-[#639922]/20 rounded-2xl p-8 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#639922]/10 flex items-center justify-center">
                  <CheckCircle2
                    className="w-6 h-6 text-[#639922]"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-2xl font-clash font-bold text-[#1F2A44]">
                  You're a Good Fit If:
                </h3>
              </div>

              {/* List */}
              <div className="space-y-4">
                {goodFitPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#639922]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2
                        className="w-3.5 h-3.5 text-[#639922]"
                        strokeWidth={3}
                      />
                    </div>
                    <p className="text-[15px] text-[#1F2A44] leading-relaxed font-jakarta">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Not Yet Column */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-gradient-to-br from-[#F9FAFC] to-white border-2 border-[#DDE3EE] rounded-2xl p-8 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#5a6580]/10 flex items-center justify-center">
                  <Pause className="w-6 h-6 text-[#5a6580]" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-clash font-bold text-[#1F2A44]">
                  Not the Right Time If:
                </h3>
              </div>

              {/* List */}
              <div className="space-y-4">
                {notYetPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#5a6580]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Pause
                        className="w-3.5 h-3.5 text-[#5a6580]"
                        strokeWidth={3}
                      />
                    </div>
                    <p className="text-[15px] text-[#5a6580] leading-relaxed font-jakarta">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

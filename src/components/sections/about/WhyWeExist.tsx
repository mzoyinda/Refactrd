"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Users, Handshake, Sparkles } from "lucide-react";

type Tab = "gap" | "founder" | "work";

export default function WhyWeExist() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("gap");

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

  const tabs = [
    { id: "gap" as Tab, label: "The Gap" },
    { id: "founder" as Tab, label: "Our Founder" },
    { id: "work" as Tab, label: "How We Work" },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Decorative corner frames */}
      <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-[#A2D2FF]/30" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-[#A2D2FF]/30" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Dynamic Visual Element */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative lg:sticky lg:top-24">
              {/* Large visual element - changes per tab */}
              <div className="aspect-square bg-gradient-to-br from-[#A2D2FF]/20 via-[#A2D2FF]/10 to-transparent rounded-3xl flex items-center justify-center relative overflow-hidden">
                {/* 3D-style text background */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-[200px] font-clash font-bold text-[#1F2A44] leading-none select-none">
                    {activeTab === "gap" ? "?" : activeTab === "founder" ? "R" : "→"}
                  </span>
                </div>

                {/* Tab 1: The Gap Visual */}
                <div
                  className={`absolute inset-0 flex items-center justify-center p-12 transition-all duration-500 ${
                    activeTab === "gap"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-32 h-32 bg-amber-500/20 rounded-full flex items-center justify-center mb-6 shadow-2xl border-4 border-amber-500/30">
                      <AlertCircle className="w-16 h-16 text-amber-600" />
                    </div>
                    <p className="text-sm font-clash font-bold text-[#1F2A44] uppercase tracking-wider">
                      The Problem
                    </p>
                    <p className="text-xs font-clash text-[#64748B] mt-2">
                      Manual work
                      <br />
                      Scattered information
                      <br />
                      Slow decisions
                    </p>
                  </div>
                </div>

                {/* Tab 2: Our Founder Visual */}
                <div
                  className={`absolute inset-0 flex items-center justify-center p-12 transition-all duration-500 ${
                    activeTab === "founder"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-32 h-32 bg-[#A2D2FF] rounded-full flex items-center justify-center mb-6 shadow-2xl">
                      <span className="text-5xl font-clash font-bold text-white">R</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-clash font-bold text-[#1F2A44]">
                        Oyindamola Dawodu
                      </p>
                      <p className="text-xs font-clash font-medium text-[#64748B]">
                        Founder and AI Operations Lead
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tab 3: How We Work Visual */}
                <div
                  className={`absolute inset-0 flex items-center justify-center p-12 transition-all duration-500 ${
                    activeTab === "work"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="text-center space-y-6">
                    <div className="flex justify-center gap-4">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#A2D2FF] rounded-xl flex items-center justify-center mb-2 shadow-lg">
                          <Handshake className="w-10 h-10 text-white" />
                        </div>
                        <p className="text-xs font-clash font-semibold text-[#1F2A44]">
                          Handoff
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[#5B6CFF] rounded-xl flex items-center justify-center mb-2 shadow-lg">
                          <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <p className="text-xs font-clash font-semibold text-[#1F2A44]">
                          Partnership
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-clash font-bold text-[#1F2A44] uppercase tracking-wider">
                      Two Modes
                    </p>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-[#A2D2FF]/30 rounded-full blur-xl" />
                <div className="absolute bottom-12 left-12 w-20 h-20 bg-[#5B6CFF]/20 rounded-full blur-xl" />
              </div>

              {/* Anchor tagline */}
              <div className="mt-8 pl-4 border-l-4 border-[#A2D2FF]">
                <p className="text-lg font-clash font-semibold text-[#1F2A44] uppercase tracking-wide">
                  Build With Refactrd.
                  <br />
                  Build Efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="max-w-2xl">
              {/* Eyebrow label */}
              <div className="mb-6">
                <span className="text-sm font-clash font-semibold text-[#64748B] uppercase tracking-wider">
                  Our Story
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-clash font-bold text-[#1F2A44] mb-8 leading-tight">
                Why Refactrd Exists
              </h2>

              {/* Tab Navigation */}
              <div className="mb-8">
                {/* Desktop Tabs */}
                <div className="hidden md:flex gap-2 border-b-2 border-gray-200">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-3 font-clash font-semibold text-sm transition-all duration-300 ${
                        activeTab === tab.id
                          ? "text-[#1F2A44]"
                          : "text-[#64748B] hover:text-[#1F2A44]"
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A2D2FF]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Mobile Dropdown */}
                <div className="md:hidden">
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value as Tab)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-clash font-semibold text-[#1F2A44] bg-white focus:outline-none focus:border-[#A2D2FF] transition-colors"
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tab Content */}
              <div className="relative min-h-[500px]">
                {/* Tab 1: The Gap */}
                <div
                  className={`transition-all duration-500 ${
                    activeTab === "gap"
                      ? "opacity-100 translate-x-0 relative"
                      : "opacity-0 translate-x-4 absolute inset-0 pointer-events-none"
                  }`}
                >
                  {/* Progress indicator - top right */}
                  <div className="flex justify-end mb-4">
                    <span className="text-xs font-clash font-semibold text-[#64748B] px-3 py-1 bg-gray-100 rounded-full">
                      1 of 3
                    </span>
                  </div>

                  <div className="space-y-6">
                    <p className="font-clash text-lg text-[#0F172A] leading-relaxed">
                      Most growing companies hit a point where manual work stops being
                      manageable. Repetitive processes eat into team capacity. Information
                      lives in the wrong places. Decisions that should take minutes take
                      days.
                    </p>

                    <p className="font-clash text-base text-[#0F172A] leading-relaxed">
                      The problem is not ambition. Everyone knows AI can help.
                    </p>

                    <p className="font-clash text-base text-[#0F172A] leading-relaxed font-semibold">
                      The problem is the gap between knowing that and actually making it
                      happen.
                    </p>

                    <p className="font-clash text-base text-[#64748B] leading-relaxed">
                      Hiring a full AI team in-house is expensive and slow to ramp. Most
                      consulting firms sell strategy decks and leave you to figure out
                      execution. Off-the-shelf tools get you 60% of the way and stop. And
                      building it yourself, without the right technical foundation, means
                      you are gambling with time and money on something that might not
                      survive contact with real operations.
                    </p>

                    <div className="bg-gradient-to-br from-[#E6EAF0] to-[#A2D2FF]/10 rounded-2xl p-6 lg:p-8 mt-8">
                      <p className="font-clash text-lg text-[#1F2A44] leading-relaxed font-bold">
                        That gap is exactly what Refactrd was built to close.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tab 2: Our Founder */}
                <div
                  className={`transition-all duration-500 ${
                    activeTab === "founder"
                      ? "opacity-100 translate-x-0 relative"
                      : "opacity-0 translate-x-4 absolute inset-0 pointer-events-none"
                  }`}
                >
                  {/* Progress indicator - top right */}
                  <div className="flex justify-end mb-4">
                    <span className="text-xs font-clash font-semibold text-[#64748B] px-3 py-1 bg-gray-100 rounded-full">
                      2 of 3
                    </span>
                  </div>

                  <div className="space-y-6">
                    <p className="font-clash text-base text-[#0F172A] leading-relaxed">
                      Refactrd was founded by Oyin Dawodu, a senior software engineer with
                      a background shipping production systems at enterprise scale.
                      Multi-country platforms, complex permission architectures,
                      high-traffic applications built to hold up under real organisational
                      pressure.
                    </p>

                    <p className="font-clash text-base text-[#0F172A] leading-relaxed font-semibold">
                      Not advisory work. Actual engineering.
                    </p>

                    <p className="font-clash text-base text-[#64748B] leading-relaxed">
                      That background, combined with advanced study in AI and Agentic AI
                      Engineering at Johns Hopkins University, shapes how Refactrd
                      approaches every client engagement: with technical precision, clear
                      scoping, and a bias toward things that work in production, not just
                      in demos.
                    </p>

                    <div className="bg-gradient-to-br from-[#E6EAF0] to-[#A2D2FF]/10 rounded-2xl p-6 lg:p-8 mt-8">
                      <p className="font-clash text-base text-[#0F172A] leading-relaxed">
                        Every project at Refactrd is handled by a competent, senior-led
                        engineering team. Not freelancers stitched together. Not a junior
                        team with a senior name on the proposal. A focused team that takes
                        your brief from discovery through to a working, deployed solution,
                        and stays accountable for the outcome.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tab 3: How We Work */}
                <div
                  className={`transition-all duration-500 ${
                    activeTab === "work"
                      ? "opacity-100 translate-x-0 relative"
                      : "opacity-0 translate-x-4 absolute inset-0 pointer-events-none"
                  }`}
                >
                  {/* Progress indicator - top right */}
                  <div className="flex justify-end mb-4">
                    <span className="text-xs font-clash font-semibold text-[#64748B] px-3 py-1 bg-gray-100 rounded-full">
                      3 of 3
                    </span>
                  </div>

                  <div className="space-y-6">
                    <p className="font-clash text-base text-[#0F172A] leading-relaxed">
                      We work in two modes depending on what you need.
                    </p>

                    <div className="space-y-6">
                      <div className="pl-6 border-l-4 border-[#A2D2FF]">
                        <p className="font-clash text-lg text-[#1F2A44] font-bold mb-2">
                          Full handoff.
                        </p>
                        <p className="font-clash text-base text-[#64748B] leading-relaxed">
                          We build the solution end to end, document everything, train your
                          team, and hand it over. You own it completely. No dependency on us
                          to keep it running.
                        </p>
                      </div>

                      <div className="pl-6 border-l-4 border-[#5B6CFF]">
                        <p className="font-clash text-lg text-[#1F2A44] font-bold mb-2">
                          Continuous partnership.
                        </p>
                        <p className="font-clash text-base text-[#64748B] leading-relaxed">
                          We build and stay on. Maintenance, iteration, improvements as your
                          operations evolve and as AI tooling improves. You get a technical
                          partner who already knows your systems and keeps them sharp.
                        </p>
                      </div>
                    </div>

                    <p className="font-clash text-base text-[#0F172A] leading-relaxed">
                      Either way, the engagement ends with something real. Not a report. Not
                      a prototype. A working AI system your team can actually use.
                    </p>

                    <div className="bg-gradient-to-br from-[#E6EAF0] to-[#A2D2FF]/10 rounded-2xl p-6 lg:p-8 mt-8">
                      <p className="font-clash text-lg text-[#0F172A] leading-relaxed font-semibold">
                        We exist to give businesses a reliable path from "we know AI can
                        help" to "it is running, it works, and our team uses it every day."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pull Quote - Always visible at bottom */}
              <div className="pt-8 mt-8 border-t-2 border-[#A2D2FF]/30">
                <blockquote className="font-clash text-xl text-[#1F2A44] leading-relaxed font-bold italic">
                  "Our focus is not speed for its own sake. It is clarity, continuity, and
                  dependable execution."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
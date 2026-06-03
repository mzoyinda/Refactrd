"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Clock, Building2, Zap, Rocket } from "lucide-react";

const situations = [
  { label: "I know exactly what I need built", target: 0 },
  { label: "I'm not sure where AI fits in my business yet", target: 1 },
  { label: "I'm ready to transform my organisation at scale", target: 2 },
  { label: "I'm an early-stage startup looking for structure", target: 3 },
];

const regularPaths = [
  {
    step: "01",
    label: "YOU KNOW WHAT YOU WANT",
    icon: Zap,
    headline: "Ready to Build",
    price: null as string | null,
    priceLabel: "Go straight to build",
    tag: "Skip the consultation",
    body: "You have a specific problem, a clear idea of what you want built, and you are ready to move. Tell us what you need and we will get back to you within 24 hours to scope it together.",
    bestFor: "Teams with a defined task who want to move directly into a build without back and forth.",
    whatYouGet: [
      "Direct response within 24 hours",
      "Scoping call to confirm requirements and timeline",
      "Proposal and engagement start",
    ],
    cta: "Submit Your Brief",
    href: "/start" as string | undefined,
    external: false,
    consultationType: undefined,
    accentColor: "#A2D2FF",
    iconBg: "bg-[#A2D2FF]/20",
    iconColor: "text-[#1F2A44]",
    cardIndex: 0,
  },
  {
    step: "02",
    label: "EXPLORING YOUR OPTIONS",
    icon: Clock,
    headline: "Mini Consultation",
    price: "$99" as string | null,
    priceLabel: "One-time session",
    tag: "Most popular starting point",
    body: "You know AI should be part of your operations but you are not sure where to start or what is realistic. In a focused 60-minute session, we map your workflows, identify your highest-impact opportunity, and hand you a written action plan you own. No pitch. No fluff.",
    bestFor: "Founders and growing business teams at the early stage of their AI thinking.",
    whatYouGet: [
      "60-minute focused session",
      "Written AI opportunity map",
      "Prioritised recommendations with next steps",
      "Honest assessment of what is feasible and what is not",
    ],
    cta: "Book a Mini Consultation",
    href: "/consultation/mini" as string | undefined,
    external: false,
    consultationType: undefined as undefined,
    accentColor: "#A2D2FF",
    iconBg: "bg-[#A2D2FF]/20",
    iconColor: "text-[#1F2A44]",
    cardIndex: 1,
  },
];

export default function GetStartedContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  function handleSituationClick(targetIndex: number) {
    setHighlightedIndex(targetIndex);
    const card = cardRefs.current[targetIndex];
    if (card) {
      const top = card.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative bg-[#1F2A44] overflow-hidden min-h-screen flex items-center">

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Inner layout — capped at a max-width to prevent ultra-wide distortion */}
        <div className="relative z-10 w-full flex items-center" style={{ maxWidth: "1600px", margin: "0 auto" }}>

        {/* Left: text content — mobile full width, desktop half */}
        <div
          className={`flex flex-col justify-center w-full lg:w-1/2 px-8 sm:px-12 pt-32 pb-16 lg:pt-36 lg:pb-28 lg:pr-14 transition-all duration-700 ${heroVisible ? "opacity-100" : "opacity-0"}`}
          style={{ paddingLeft: "max(3rem, calc((100vw - 1600px) / 2 + 3rem))" }}
        >
          {/* Eyebrow */}
          <div className={`mb-6 transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#A2D2FF]/30 text-[#A2D2FF] text-xs font-clash font-semibold uppercase tracking-[0.15em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] animate-pulse" />
              Find Your Starting Point
            </span>
          </div>

          {/* Headline — larger on desktop */}
          <h1 className={`text-4xl sm:text-5xl lg:text-[58px] xl:text-[68px] font-clash font-bold text-white leading-[1.05] tracking-tight mb-4 transition-all duration-700 delay-75 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            The right path
            <br />
            <span className="text-[#A2D2FF]">depends on</span>
            <br />
            where you are.
          </h1>

          <p className={`font-jakarta text-white/55 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-8 transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            Each option is built for a specific stage. You are not overpaying to explore, or underinvesting when you are ready to build.
          </p>

          {/* Situation selector */}
          <div className={`transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="font-clash text-white/35 text-[10px] uppercase tracking-[0.14em] font-semibold mb-3">
              Where are you right now?
            </p>
            <div className="flex flex-col gap-2 max-w-md">
              {situations.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSituationClick(s.target)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-clash font-medium transition-all duration-300 text-left w-full ${
                    highlightedIndex === s.target
                      ? "bg-[#A2D2FF] border-[#A2D2FF] text-[#1F2A44]"
                      : "border-white/15 text-white/60 hover:border-[#A2D2FF]/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={`font-clash font-bold text-[10px] tabular-nums flex-shrink-0 ${highlightedIndex === s.target ? "opacity-50" : "opacity-30"}`}>
                    0{i + 1}
                  </span>
                  <span className="flex-1">{s.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 opacity-30 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: image — hidden on mobile, bleeds to right edge on desktop */}
        <div className={`hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100" : "opacity-0 translate-x-4"}`}>
          <Image
            src="/images/about-refactrd.webp"
            alt="Refactrd team at work"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Blend gradient left edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A44] via-[#1F2A44]/35 to-transparent pointer-events-none" />
          {/* Subtle bottom darkening */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/40 via-transparent to-transparent pointer-events-none" />

          {/* Floating stat */}
          <div className="absolute bottom-10 left-8 bg-white rounded-2xl px-5 py-4 shadow-2xl shadow-black/20">
            <p className="font-clash font-bold text-2xl text-[#1F2A44]">24h</p>
            <p className="font-jakarta text-xs text-[#64748B] mt-0.5">Response guarantee</p>
          </div>

          {/* Top badge — pushed below navbar height */}
          <div className="absolute top-24 right-8 bg-[#1F2A44]/75 backdrop-blur-sm border border-[#A2D2FF]/20 rounded-xl px-4 py-3">
            <p className="font-clash font-bold text-xs text-[#A2D2FF] uppercase tracking-wide">4 Paths</p>
            <p className="font-jakarta text-[10px] text-white/45 mt-0.5">Pick yours below</p>
          </div>
        </div>

        </div>{/* end inner max-width wrapper */}
      </section>

      {/* ── PATHS ─────────────────────────────────────────────────── */}
      <section className="bg-[#F4F6F9] py-12 sm:py-16 lg:py-24">
        <div className="container-custom space-y-4">

          {/* 01 & 02 — standard white cards */}
          {regularPaths.map((path) => {
            const Icon = path.icon;
            const isHighlighted = highlightedIndex === path.cardIndex;
            return (
              <div
                key={path.step}
                ref={(el) => { cardRefs.current[path.cardIndex] = el; }}
                className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ${
                  isHighlighted
                    ? "ring-2 ring-[#1F2A44] shadow-2xl shadow-[#1F2A44]/10"
                    : "border border-[#E2E8F0] hover:border-[#C8D3E0] hover:shadow-lg hover:shadow-[#1F2A44]/5"
                }`}
              >
                {/* Left accent bar — brand navy */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1F2A44] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {isHighlighted && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1F2A44]" />}

                <div className="p-6 sm:p-8 lg:p-10">
                  {/* Mobile: stack everything; Desktop: row layout */}
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">

                    {/* Step + icon — row on mobile */}
                    <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4 lg:w-24 flex-shrink-0">
                      <span className="font-clash font-bold text-4xl leading-none tabular-nums text-[#1F2A44]/15">
                        {path.step}
                      </span>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${path.iconBg}`}>
                        <Icon className={`w-5 h-5 ${path.iconColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Label + tag */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-clash font-bold text-[10px] uppercase tracking-[0.16em] text-[#94A3B8]">{path.label}</span>
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-clash font-bold uppercase tracking-wide bg-[#1F2A44]/8 text-[#1F2A44]">{path.tag}</span>
                      </div>

                      {/* Headline + price */}
                      <div className="flex flex-wrap items-baseline gap-3 mb-3">
                        <h2 className="font-clash font-bold text-xl sm:text-2xl lg:text-3xl text-[#1F2A44]">{path.headline}</h2>
                        {path.price
                          ? <><span className="font-clash font-bold text-xl text-[#1F2A44]">{path.price}</span><span className="font-jakarta text-sm text-[#94A3B8]">{path.priceLabel}</span></>
                          : <span className="font-jakarta text-sm text-[#94A3B8]">{path.priceLabel}</span>
                        }
                      </div>

                      <p className="font-jakarta text-[#64748B] text-sm leading-relaxed mb-3">{path.body}</p>
                      <p className="font-clash text-xs text-[#94A3B8] font-semibold mb-4">
                        <span className="text-[#1F2A44]">Best for:</span> {path.bestFor}
                      </p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6 lg:mb-0">
                        {path.whatYouGet.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#1F2A44]" />
                            <span className="font-jakarta text-sm text-[#475569]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA — full width on mobile, fixed width on desktop */}
                    <div className="lg:w-48 flex-shrink-0 lg:self-center">
                      {(
                        <Link href={path.href!} className="group/btn flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-semibold text-sm transition-all duration-300 hover:bg-[#263352] hover:shadow-lg hover:shadow-[#1F2A44]/20">
                          {path.cta}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 03 — Enterprise: premium dark card */}
          <div
            ref={(el) => { cardRefs.current[2] = el; }}
            className={`relative rounded-2xl overflow-hidden bg-[#1F2A44] transition-all duration-500 ${
              highlightedIndex === 2 ? "ring-2 ring-[#A2D2FF]" : ""
            }`}
          >
            {/* Subtle blue glow top-right */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#A2D2FF]/8 rounded-full blur-3xl pointer-events-none" />
            {/* Brand accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#A2D2FF] via-[#5B6CFF] to-[#A2D2FF]" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">

                {/* Step + icon */}
                <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4 lg:w-24 flex-shrink-0">
                  <span className="font-clash font-bold text-4xl leading-none tabular-nums text-[#A2D2FF]/20">03</span>
                  <div className="w-10 h-10 rounded-xl bg-[#A2D2FF]/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-[#A2D2FF]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-clash font-bold text-[10px] uppercase tracking-[0.16em] text-white/35">TRANSFORMING YOUR ORGANIZATION</span>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-clash font-bold uppercase tracking-wide bg-[#A2D2FF]/15 text-[#A2D2FF]">Our premium offering</span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <h2 className="font-clash font-bold text-xl sm:text-2xl lg:text-3xl text-white">AI Enterprise Consultation</h2>
                    <span className="font-clash font-bold text-xl text-[#A2D2FF]">$499</span>
                    <span className="font-jakarta text-sm text-white/40">Full-day engagement</span>
                  </div>

                  <p className="font-jakarta text-white/60 text-sm leading-relaxed mb-3">
                    Your organization is ready to move beyond experimenting. You want AI embedded into how you operate at a deeper level but you need a clear, structured plan before committing to a build. We spend a full day with your leadership team and deliver a roadmap you can actually use.
                  </p>
                  <p className="font-clash text-xs text-white/35 font-semibold mb-4">
                    <span className="text-white/60">Best for:</span> Companies with existing systems and a serious intent to become AI-powered across departments.
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6 lg:mb-0">
                    {[
                      "Deep-dive workflow and systems audit",
                      "AI integration roadmap across departments",
                      "Risk and security assessment",
                      "Prioritised implementation plan with realistic timelines",
                      "Post-consultation follow-up session",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#A2D2FF]" />
                        <span className="font-jakarta text-sm text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="lg:w-48 flex-shrink-0 lg:self-center">
                  <Link
                    href="/consultation/enterprise"
                    className="group/btn flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-white text-[#1F2A44] rounded-xl font-clash font-bold text-sm transition-all duration-300 hover:bg-[#E6EAF0] hover:shadow-lg"
                  >
                    Book Enterprise
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 04 — Launchpad: brand-aligned, clearly distinct via navy border + blue tint */}
          <div
            ref={(el) => { cardRefs.current[3] = el; }}
            className={`relative rounded-2xl overflow-hidden bg-[#EEF3FA] border-2 transition-all duration-500 ${
              highlightedIndex === 3
                ? "border-[#1F2A44] shadow-xl shadow-[#1F2A44]/10"
                : "border-[#D0DCF0] hover:border-[#1F2A44]/40 hover:shadow-lg hover:shadow-[#1F2A44]/5"
            }`}
          >
            {/* Top brand stripe */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#1F2A44] via-[#A2D2FF] to-[#1F2A44]" />

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">

                {/* Step + icon */}
                <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4 lg:w-24 flex-shrink-0">
                  <span className="font-clash font-bold text-4xl leading-none tabular-nums text-[#1F2A44]/15">04</span>
                  <div className="w-10 h-10 rounded-xl bg-[#1F2A44]/10 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-5 h-5 text-[#1F2A44]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-clash font-bold text-[10px] uppercase tracking-[0.16em] text-[#94A3B8]">EARLY-STAGE STARTUP</span>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-clash font-bold uppercase tracking-wide bg-[#1F2A44]/8 text-[#1F2A44]">Limited cohort spots</span>
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-clash font-bold uppercase tracking-wide border border-[#1F2A44]/20 text-[#1F2A44]/60">A program, not a service</span>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <h2 className="font-clash font-bold text-xl sm:text-2xl lg:text-3xl text-[#1F2A44]">AI Startups Launchpad</h2>
                    <span className="font-jakarta text-sm text-[#64748B]">Cohort-based program</span>
                  </div>

                  <p className="font-jakarta text-[#64748B] text-sm leading-relaxed mb-3">
                    A selective cohort program for early-stage startups that want to get AI working in their operations without the full cost of a build engagement. We take a small number of qualifying startups through a structured process: audit, build, deploy.
                  </p>
                  <p className="font-clash text-xs text-[#94A3B8] font-semibold mb-4">
                    <span className="text-[#1F2A44]">Best for:</span> Startups with 5 to 20 people who have a clear operational bottleneck and are ready to test AI in live operations.
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6 lg:mb-0">
                    {[
                      "Structured cohort program: audit, build, deploy",
                      "Hands-on build and deploy support",
                      "Peer cohort of similar-stage startups",
                      "Periodic cohort opens — apply to be notified",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#1F2A44]" />
                        <span className="font-jakarta text-sm text-[#475569]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="lg:w-48 flex-shrink-0 lg:self-center">
                  <Link
                    href="/ai-startups-launchpad"
                    className="group/btn flex items-center justify-center gap-2 w-full px-5 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-semibold text-sm transition-all duration-300 hover:bg-[#263352] hover:shadow-lg hover:shadow-[#1F2A44]/20"
                  >
                    Join the Waitlist
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM NUDGE ──────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E2E8F0] pt-8 mt-4">
            <div>
              <p className="font-clash font-bold text-[#1F2A44] text-base sm:text-lg mb-1">Still not sure where to start?</p>
              <p className="font-jakarta text-[#64748B] text-sm">The Mini Consultation is the right first step for most people.</p>
            </div>
            <Link
              href="/consultation/mini"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-semibold text-sm transition-all duration-300 hover:bg-[#263352] hover:shadow-lg hover:shadow-[#1F2A44]/20 group/btn w-full sm:w-auto"
            >
              Book a Mini Consultation
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

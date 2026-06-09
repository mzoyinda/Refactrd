"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Clock, Building2, Zap, Rocket } from "lucide-react";

/* ─────────────────────────── data ─────────────────────────── */

const situations = [
  { label: "I already know what I want to implement", target: 0 },
  { label: "I'm exploring where AI can create value", target: 1 },
  { label: "I need a roadmap before making larger decisions", target: 2 },
  { label: "I'm building an AI-enabled startup", target: 3 },
];

type Variant = "light" | "dark" | "tinted";

type Path = {
  step: string;
  tag: string;
  icon: typeof Zap;
  title: string;
  subtitle: string;
  price: string | null;
  featured?: boolean;
  body: string;
  bestFor: string;
  checklist: string[];
  cta: string;
  href: string;
  cardIndex: number;
  variant: Variant;
};

const paths: Path[] = [
  {
    step: "01",
    tag: "For Organizations Ready To Implement",
    icon: Zap,
    title: "Build & Implement",
    subtitle: "Move from idea to implementation",
    price: null,
    body: "Already know what you're trying to achieve? Whether you're planning an AI assistant, knowledge system, workflow automation initiative, AI-enabled product feature, or operational improvement project, we'll assess the opportunity, define the scope, and help you move from concept to implementation.",
    bestFor: "Organizations with a defined initiative and a clear understanding of the problem they want to solve.",
    checklist: [
      "Opportunity assessment",
      "Scope and requirements review",
      "Solution design recommendations",
      "Implementation planning",
      "Clear next-step roadmap",
    ],
    cta: "Discuss Your Initiative",
    href: "/start",
    cardIndex: 0,
    variant: "light",
  },
  {
    step: "02",
    tag: "Most Popular Starting Point",
    icon: Clock,
    title: "Transformation Diagnostic",
    subtitle: "Identify where AI creates the most value",
    price: "$99",
    featured: true,
    body: "A focused assessment designed to help you understand where AI can create meaningful operational impact. We'll review workflows, identify opportunities, and recommend practical next steps based on your organization's goals and challenges.",
    bestFor: "Organizations exploring AI adoption and looking for clarity before making larger investments.",
    checklist: [
      "Discovery session",
      "Workflow review",
      "Opportunity mapping",
      "Prioritized recommendations",
      "Written diagnostic brief",
    ],
    cta: "Start Diagnostic",
    href: "/consultation/mini",
    cardIndex: 1,
    variant: "light",
  },
  {
    step: "03",
    tag: "For Organizations Preparing For Transformation",
    icon: Building2,
    title: "Executive Discovery",
    subtitle: "Build a roadmap for adoption",
    price: "$499",
    body: "A structured assessment for leadership teams evaluating broader transformation initiatives. We analyze workflows, readiness, operational challenges, and opportunities to create a practical roadmap for moving forward.",
    bestFor: "Organizations preparing for larger transformation efforts, cross-functional initiatives, or organization-wide adoption.",
    checklist: [
      "Executive interviews",
      "Workflow assessment",
      "Readiness evaluation",
      "Opportunity portfolio",
      "Transformation roadmap",
    ],
    cta: "Start Executive Discovery",
    href: "/consultation/enterprise",
    cardIndex: 2,
    variant: "dark",
  },
  {
    step: "04",
    tag: "Selective Cohort Program",
    icon: Rocket,
    title: "AI Startups Launchpad",
    subtitle: "Turn one operational challenge into one measurable outcome",
    price: null,
    body: "A structured transformation program for founders ready to improve how work gets done. Identify a high-impact operational challenge, implement a practical AI-enabled solution, and validate its impact inside real operations.",
    bestFor: "Early-stage startups looking to implement and validate a meaningful AI initiative before scaling further.",
    checklist: [
      "Opportunity assessment",
      "Workflow design",
      "Solution implementation",
      "Adoption support",
      "Impact measurement",
    ],
    cta: "Apply To The Launchpad",
    href: "/ai-startups-launchpad",
    cardIndex: 3,
    variant: "tinted",
  },
];

/* ──────────────────── style maps per variant ────────────────── */

const styles = {
  light: {
    card: "bg-white border border-[#E2E8F0] hover:border-[#C8D3E0] hover:shadow-xl hover:shadow-[#1F2A44]/5",
    cardHighlighted: "ring-2 ring-[#1F2A44] shadow-2xl shadow-[#1F2A44]/8 border-transparent",
    tag: "text-[#94A3B8]",
    iconWrap: "bg-[#A2D2FF]/20",
    icon: "text-[#1F2A44]",
    step: "text-[#1F2A44]/10",
    title: "text-[#1F2A44]",
    price: "bg-[#1F2A44] text-white",
    subtitle: "text-[#5a6580]",
    body: "text-[#475569]",
    bestForWrap: "bg-[#F8FAFC] border border-[#E2E8F0]",
    bestForLabel: "text-[#1F2A44]",
    bestForText: "text-[#64748B]",
    checkIcon: "text-[#1F2A44]",
    checkText: "text-[#475569]",
    divider: "bg-[#F1F5F9]",
    footer: "border-t border-[#E8ECF2] bg-[#FAFBFC]",
    ctaBtn: "bg-[#1F2A44] text-white hover:bg-[#263352] hover:shadow-lg hover:shadow-[#1F2A44]/20",
    accentBar: "bg-[#1F2A44]",
  },
  dark: {
    card: "bg-[#1F2A44]",
    cardHighlighted: "ring-2 ring-[#A2D2FF]",
    tag: "text-white/40",
    iconWrap: "bg-[#A2D2FF]/10",
    icon: "text-[#A2D2FF]",
    step: "text-[#A2D2FF]/15",
    title: "text-white",
    price: "bg-[#A2D2FF]/20 text-[#A2D2FF]",
    subtitle: "text-[#A2D2FF]/60",
    body: "text-white/60",
    bestForWrap: "bg-white/5 border border-white/10",
    bestForLabel: "text-white/70",
    bestForText: "text-white/50",
    checkIcon: "text-[#A2D2FF]",
    checkText: "text-white/60",
    divider: "bg-white/10",
    footer: "border-t border-white/10 bg-white/5",
    ctaBtn: "bg-white text-[#1F2A44] hover:bg-[#E6EAF0] hover:shadow-lg",
    accentBar: "from-[#A2D2FF] via-[#5B6CFF] to-[#A2D2FF]",
  },
  tinted: {
    card: "bg-[#EEF3FA] border-2 border-[#D0DCF0] hover:border-[#1F2A44]/30 hover:shadow-xl hover:shadow-[#1F2A44]/5",
    cardHighlighted: "ring-2 ring-[#1F2A44] border-[#1F2A44] shadow-2xl shadow-[#1F2A44]/8",
    tag: "text-[#7A8FA6]",
    iconWrap: "bg-[#1F2A44]/10",
    icon: "text-[#1F2A44]",
    step: "text-[#1F2A44]/10",
    title: "text-[#1F2A44]",
    price: "bg-[#1F2A44] text-white",
    subtitle: "text-[#5a6580]",
    body: "text-[#475569]",
    bestForWrap: "bg-white/60 border border-[#D0DCF0]",
    bestForLabel: "text-[#1F2A44]",
    bestForText: "text-[#64748B]",
    checkIcon: "text-[#1F2A44]",
    checkText: "text-[#475569]",
    divider: "bg-[#D0DCF0]",
    footer: "border-t border-[#C8D8EE] bg-[#E6EFF8]",
    ctaBtn: "bg-[#1F2A44] text-white hover:bg-[#263352] hover:shadow-lg hover:shadow-[#1F2A44]/20",
    accentBar: "from-[#1F2A44] via-[#A2D2FF] to-[#1F2A44]",
  },
} as const;

/* ─────────────────────────── component ─────────────────────── */

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
      const top = card.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#1F2A44] overflow-hidden min-h-screen flex items-center">

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ghost "4" — decorative, mobile only */}
        <span className="lg:hidden absolute right-4 bottom-16 font-clash font-bold text-[160px] leading-none text-[#A2D2FF]/5 select-none pointer-events-none">
          4
        </span>

        <div className="relative z-10 w-full">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-stretch lg:min-h-screen">

            {/* ── Text column ── */}
            <div
              className={`w-full lg:w-1/2 px-5 sm:px-8 pt-28 pb-12 lg:pl-16 xl:pl-24 lg:pr-10 lg:pt-36 lg:pb-28 lg:flex lg:flex-col lg:justify-center transition-all duration-700 ${
                heroVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Badge */}
              <div className={`mb-5 transition-all duration-500 delay-[0ms] ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#A2D2FF]/30 text-[#A2D2FF] text-[11px] font-clash font-semibold uppercase tracking-[0.14em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] animate-pulse flex-shrink-0" />
                  Find Your Starting Point
                </span>
              </div>

              {/* Headline */}
              <h1
                className={`font-clash font-bold text-white leading-[1.06] tracking-tight mb-5 transition-all duration-700 delay-75
                  text-[36px] sm:text-5xl lg:text-[48px] xl:text-[58px] 2xl:text-[64px]
                  ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                Choose The Right
                <br />
                <span className="text-[#A2D2FF]">Starting Point</span>
                <br />
                For Your Situation
              </h1>

              {/* Body */}
              <p
                className={`font-jakarta text-white/55 leading-relaxed mb-8 max-w-lg transition-all duration-700 delay-150
                  text-[15px] sm:text-base lg:text-[17px]
                  ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                Every organization is at a different stage. Some are exploring where AI can create value. Others need a roadmap before making larger investments. Some are ready to move forward with a defined initiative.
                <span className="block mt-3">Choose the path that best reflects where you are today.</span>
              </p>

              {/* Situation selector */}
              <div className={`transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <p className="font-clash text-white/30 text-[10px] uppercase tracking-[0.16em] font-semibold mb-3">
                  Where are you right now?
                </p>
                <div className="flex flex-col gap-2 max-w-lg">
                  {situations.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSituationClick(s.target)}
                      className={`group flex items-center gap-3 px-4 py-4 rounded-xl border text-left w-full transition-all duration-300
                        text-[13px] sm:text-sm lg:text-[15px] font-clash font-medium
                        ${highlightedIndex === s.target
                          ? "bg-[#A2D2FF] border-[#A2D2FF] text-[#1F2A44]"
                          : "border-white/12 text-white/55 hover:border-[#A2D2FF]/40 hover:text-white hover:bg-white/[0.04]"
                        }`}
                    >
                      <span className={`font-clash font-bold text-[10px] tabular-nums flex-shrink-0 w-5 ${highlightedIndex === s.target ? "opacity-40" : "opacity-25"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{s.label}</span>
                      <ArrowRight className={`w-3.5 h-3.5 flex-shrink-0 transition-all duration-200 ${highlightedIndex === s.target ? "opacity-50" : "opacity-20 group-hover:opacity-40 group-hover:translate-x-0.5"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Image column (desktop only) ── */}
            <div
              className={`hidden lg:block relative lg:w-1/2 self-stretch transition-all duration-1000 delay-300 ${
                heroVisible ? "opacity-100" : "opacity-0 translate-x-6"
              }`}
            >
              <Image
                src="/images/about-refactrd.webp"
                alt="Refactrd team at work"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A44] via-[#1F2A44]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/50 via-transparent to-transparent" />

              {/* Corner badge */}
              <div className="absolute top-28 right-8 bg-[#1F2A44]/80 backdrop-blur-sm border border-[#A2D2FF]/20 rounded-2xl px-5 py-4">
                <p className="font-clash font-bold text-sm text-[#A2D2FF] tracking-wide">4 Engagement Paths</p>
                <p className="font-jakarta text-[11px] text-white/40 mt-0.5">Choose Your Starting Point</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INTRO
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-10 md:py-14 lg:py-16 border-b border-[#E8ECF2]">
        <div className="container-custom text-center">
          <div className="max-w-[780px] mx-auto">
          <h2 className="font-clash font-bold text-[#1F2A44] leading-tight mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Every Transformation Starts Somewhere
          </h2>
          <p className="font-jakarta text-[#64748B] leading-relaxed text-[15px] sm:text-base md:text-lg">
            Whether you&apos;re exploring opportunities, planning a broader transformation, or preparing to implement an AI initiative, we&apos;ll help determine the most practical path forward.
          </p>
          <p className="font-jakarta text-[#64748B] leading-relaxed text-[15px] sm:text-base md:text-lg mt-3">
            Choose the engagement that best matches your goals, challenges, and stage of adoption.
          </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PATHS
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#F4F6F9] py-8 md:py-12 lg:py-20">
        <div className="container-custom space-y-4 md:space-y-5">

          {paths.map((path) => {
            const s = styles[path.variant];
            const Icon = path.icon;
            const isHighlighted = highlightedIndex === path.cardIndex;
            const isDark = path.variant === "dark";
            const hasFancyBar = path.variant !== "light";

            return (
              <div
                key={path.step}
                ref={(el) => { cardRefs.current[path.cardIndex] = el; }}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 group
                  ${s.card}
                  ${isHighlighted ? s.cardHighlighted : ""}
                  ${path.featured && !isHighlighted ? "border-[#1F2A44]/20 shadow-md" : ""}
                `}
              >
                {/* Top accent bar */}
                {hasFancyBar && (
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.accentBar}`} />
                )}
                {/* Left accent bar — light cards on hover / highlighted */}
                {!isDark && (
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full transition-opacity duration-500 ${s.accentBar}
                    ${isHighlighted ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                    style={{ background: "#1F2A44" }}
                  />
                )}

                {/* Ghost background glow (dark card) */}
                {isDark && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#A2D2FF]/5 rounded-full blur-3xl pointer-events-none" />
                )}

                <div className="relative z-10 p-5 sm:p-7 lg:p-9">

                  {/* ── MOBILE LAYOUT (stacked) ── */}
                  <div className="lg:hidden">

                    {/* Row 1: tag + step */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-clash font-bold text-[10px] uppercase tracking-[0.14em] ${s.tag}`}>
                          {path.tag}
                        </span>
                        {path.featured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-clash font-bold uppercase tracking-wide bg-[#1F2A44] text-white">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <span className={`font-clash font-extrabold text-3xl leading-none tabular-nums flex-shrink-0 ${s.step}`}>
                        {path.step}
                      </span>
                    </div>

                    {/* Row 2: icon + title + price */}
                    <div className="flex items-start gap-3 mb-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${s.iconWrap}`}>
                        <Icon className={`w-5 h-5 ${s.icon}`} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className={`font-clash font-bold text-xl leading-tight ${s.title}`}>{path.title}</h2>
                          {path.price && (
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-clash font-bold flex-shrink-0 ${s.price}`}>
                              {path.price}
                            </span>
                          )}
                        </div>
                        <p className={`font-jakarta text-[13px] mt-0.5 ${s.subtitle}`}>{path.subtitle}</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className={`h-px my-4 ${s.divider}`} />

                    {/* Body */}
                    <p className={`font-jakarta text-[14px] leading-relaxed mb-4 ${s.body}`}>{path.body}</p>

                    {/* Best For */}
                    <div className={`rounded-xl px-4 py-3 mb-4 ${s.bestForWrap}`}>
                      <p className={`font-clash font-bold text-[11px] uppercase tracking-wide mb-0.5 ${s.bestForLabel}`}>Best For</p>
                      <p className={`font-jakarta text-[13px] leading-relaxed ${s.bestForText}`}>{path.bestFor}</p>
                    </div>

                    {/* Checklist — single column on mobile */}
                    <ul className="space-y-2.5 mb-5">
                      {path.checklist.map((item, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 ${s.checkIcon}`} strokeWidth={2} />
                          <span className={`font-jakarta text-[13px] ${s.checkText}`}>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA — full width */}
                    <Link
                      href={path.href}
                      className={`group/btn flex items-center justify-center gap-2 w-full px-5 py-4 rounded-xl font-clash font-bold text-sm transition-all duration-300 ${s.ctaBtn}`}
                    >
                      {path.cta}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>

                  {/* ── DESKTOP LAYOUT (two columns + footer CTA) ── */}
                  <div className="hidden lg:block">
                    <div className="grid grid-cols-[80px_1fr] gap-8 xl:gap-10">

                      {/* Col 1: step + icon */}
                      <div className="flex flex-col items-start gap-3 pt-1">
                        <span className={`font-clash font-extrabold text-6xl leading-none tabular-nums ${s.step}`}>
                          {path.step}
                        </span>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.iconWrap}`}>
                          <Icon className={`w-6 h-6 ${s.icon}`} strokeWidth={1.8} />
                        </div>
                      </div>

                      {/* Col 2: all content */}
                      <div className="min-w-0">
                        {/* Tag row */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className={`font-clash font-bold text-[11px] uppercase tracking-[0.16em] ${s.tag}`}>
                            {path.tag}
                          </span>
                          {path.featured && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-clash font-bold uppercase tracking-wide bg-[#1F2A44] text-white">
                              Most Popular
                            </span>
                          )}
                        </div>

                        {/* Title + price */}
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h2 className={`font-clash font-bold text-2xl xl:text-[28px] leading-tight ${s.title}`}>{path.title}</h2>
                          {path.price && (
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-clash font-bold ${s.price}`}>
                              {path.price}
                            </span>
                          )}
                        </div>
                        <p className={`font-jakarta text-[15px] mb-5 ${s.subtitle}`}>{path.subtitle}</p>

                        {/* Body + Best For + Checklist in a two-column sub-grid */}
                        <div className="grid grid-cols-[1fr_1fr] gap-x-10 gap-y-5">
                          <div className="space-y-4">
                            <p className={`font-jakarta text-[15px] leading-relaxed ${s.body}`}>{path.body}</p>
                            <div className={`rounded-xl px-4 py-3 ${s.bestForWrap}`}>
                              <p className={`font-clash font-bold text-[10px] uppercase tracking-wide mb-0.5 ${s.bestForLabel}`}>Best For</p>
                              <p className={`font-jakarta text-[13px] leading-relaxed ${s.bestForText}`}>{path.bestFor}</p>
                            </div>
                          </div>
                          <ul className="space-y-2.5 pt-0.5">
                            {path.checklist.map((item, i) => (
                              <li key={i} className="flex items-center gap-2.5">
                                <CheckCircle className={`w-4 h-4 flex-shrink-0 ${s.checkIcon}`} strokeWidth={2} />
                                <span className={`font-jakarta text-[14px] ${s.checkText}`}>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Footer CTA — full width, below all content */}
                    <div className={`mt-6 -mx-7 lg:-mx-9 xl:-mx-10 px-7 lg:px-9 xl:px-10 py-4 flex items-center justify-between gap-6 ${s.footer}`}>
                      <p className={`font-jakarta text-[13px] leading-snug opacity-60 ${s.title}`}>
                        Option {path.step} · {path.subtitle}
                      </p>
                      <Link
                        href={path.href}
                        className={`group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl font-clash font-bold text-sm transition-all duration-300 flex-shrink-0 ${s.ctaBtn}`}
                      >
                        {path.cta}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

          {/* ══════════════════════════════════════════════════════
              BOTTOM NUDGE
          ══════════════════════════════════════════════════════ */}
          <div className="mt-2 rounded-2xl bg-[#1F2A44] p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
              <div className="flex-1">
                <p className="font-clash font-bold text-white text-xl sm:text-2xl lg:text-3xl mb-3">
                  Still Unsure Where To Start?
                </p>
                <p className="font-jakarta text-white/60 text-[14px] sm:text-base lg:text-[17px] leading-relaxed max-w-2xl">
                  Most organizations begin with the Transformation Diagnostic. It&apos;s the fastest way to understand where AI can create value, identify priorities, and determine the most appropriate next step.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/consultation/mini"
                  className="group/btn inline-flex items-center justify-center gap-2 w-full lg:w-auto px-7 py-4 bg-[#A2D2FF] text-[#1F2A44] rounded-xl font-clash font-bold text-sm lg:text-[15px] transition-all duration-300 hover:bg-white hover:shadow-xl"
                >
                  <span className="lg:hidden">Start A Transformation Diagnostic</span>
                  <span className="hidden lg:inline">Start With A Transformation Diagnostic</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

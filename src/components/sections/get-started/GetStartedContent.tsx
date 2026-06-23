"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const paths = [
  {
    step: "01",
    tag: "BUILD & IMPLEMENT",
    title: "We Already Know What We Want To Build",
    rightTitle: "Turn A Defined Initiative Into A Working Solution",
    subtitle: "You already understand the challenge. Now it's time to define the scope, design the right approach, and move from concept to implementation.",
    bestFor: "Organizations with a clearly defined initiative and a desired outcome.",
    cta: "Discuss Your Initiative",
    href: "/start",
    image: "/images/ai-workflow.jpg",
  },
  {
    step: "02",
    tag: "OPPORTUNITY ASSESSMENT",
    title: "We Know AI Can Help But Aren't Sure Where To Focus",
    rightTitle: "Identify Where The Greatest Opportunities Exist",
    subtitle: "Before investing in solutions, gain clarity on which opportunities are most likely to improve how work gets done.",
    bestFor: "Organizations looking for direction before making larger investments.",
    cta: "Explore The Opportunity Assessment",
    href: "/consultation/mini",
    image: "/images/ai-analytics.jpg",
  },
  {
    step: "03",
    tag: "EXECUTIVE DISCOVERY",
    title: "We Need A Roadmap Before Making Larger Decisions",
    rightTitle: "Build Clarity, Alignment, And A Practical Path Forward",
    subtitle: "Evaluate AI opportunities, assess readiness, and create a roadmap for moving from AI experimentation to coordinated AI adoption.",
    bestFor: "Leadership teams preparing for broader transformation initiatives.",
    cta: "Start Executive Discovery",
    href: "/consultation/enterprise",
    image: "/images/ai-dashboard.jpg",
  },
  {
    step: "04",
    tag: "AI STARTUPS LAUNCHPAD",
    title: "We Want To Validate An AI Opportunity",
    rightTitle: "Test One Opportunity Before Making A Larger Commitment",
    subtitle: "Implement a practical solution, validate impact inside real operations, and determine whether the opportunity is worth scaling.",
    bestFor: "Founders looking to validate an opportunity before investing further.",
    cta: "Apply To The Launchpad",
    href: "/ai-startups-launchpad",
    image: "/images/solving-problems.webp",
  },
];

const tableRows = [
  { situation: "We already know what we want to build", path: "Build & Implement", index: 0 },
  { situation: "We know AI can help but aren't sure where to focus", path: "Opportunity Assessment", index: 1 },
  { situation: "We need an organization-wide roadmap", path: "Executive Discovery", index: 2 },
  { situation: "We want to validate an opportunity before committing further", path: "AI Startups Launchpad", index: 3 },
];

export default function GetStartedContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0);
  const heroSituationIndex = useRef<number | null>(null);

  const tableSectionRef = useRef<HTMLElement>(null);
  const [tableVisible, setTableVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!tableSectionRef.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTableVisible(true); }, { threshold: 0.05 });
    o.observe(tableSectionRef.current);
    return () => o.disconnect();
  }, []);

  const pathsSectionRef = useRef<HTMLElement>(null);

  function scrollToPath(index: number) {
    setActiveIndex(index);
    setExpandedMobile(index);
    heroSituationIndex.current = index;
    if (pathsSectionRef.current) {
      const top = pathsSectionRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  const active = paths[activeIndex];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#1F2A44] overflow-hidden min-h-screen flex items-center">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162,210,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 w-full">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-stretch lg:min-h-screen">

            {/* Text column */}
            <div
              className={`w-full lg:w-1/2 px-5 sm:px-8 pt-28 pb-12 lg:pl-16 xl:pl-24 lg:pr-10 lg:pt-36 lg:pb-28 lg:flex lg:flex-col lg:justify-center transition-all duration-700 ${
                heroVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className={`mb-6 transition-all duration-500 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#A2D2FF]/30 text-[#A2D2FF] text-[11px] font-clash font-semibold uppercase tracking-[0.14em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] animate-pulse flex-shrink-0" />
                  Find Your Starting Point
                </span>
              </div>

              <h1
                className={`font-clash font-bold text-white leading-[1.06] tracking-tight mb-6 transition-all duration-700 delay-75
                  text-[38px] sm:text-5xl lg:text-[52px] xl:text-[62px]
                  ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                Not Sure Where
                <br />
                <span className="text-[#A2D2FF]">To Start?</span>
              </h1>

              <div className={`space-y-2 mb-10 transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <p className="font-jakarta text-white/70 text-[15px] sm:text-base lg:text-[17px] leading-relaxed">Every organization is at a different stage.</p>
                <p className="font-jakarta text-white/45 text-[15px] sm:text-base lg:text-[17px] leading-relaxed">Some are exploring where AI can create value.</p>
                <p className="font-jakarta text-white/45 text-[15px] sm:text-base lg:text-[17px] leading-relaxed">Some need a roadmap before making larger decisions.</p>
                <p className="font-jakarta text-white/45 text-[15px] sm:text-base lg:text-[17px] leading-relaxed">Others are ready to move forward with a specific initiative.</p>
                <p className="font-jakarta text-white/70 text-[15px] sm:text-base lg:text-[17px] leading-relaxed pt-2">Choose the path that best reflects your current situation.</p>
              </div>

              <div className={`transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <p className="font-clash text-[#A2D2FF]/50 text-[10px] uppercase tracking-[0.2em] font-bold mb-3">Where Are You Today?</p>
                <div className="flex flex-col gap-2 max-w-lg">
                  {paths.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToPath(i)}
                      className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left w-full transition-all duration-300 text-[13px] sm:text-sm font-clash font-medium
                        ${activeIndex === i && heroSituationIndex.current !== null
                          ? "bg-[#A2D2FF] border-[#A2D2FF] text-[#1F2A44]"
                          : "border-white/10 text-white/50 hover:border-[#A2D2FF]/40 hover:text-white hover:bg-white/[0.04]"
                        }`}
                    >
                      <span className="font-clash font-bold text-[10px] tabular-nums flex-shrink-0 w-5 opacity-25">{p.step}</span>
                      <span className="flex-1">{p.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 opacity-20 group-hover:opacity-40 group-hover:translate-x-0.5 transition-all duration-200" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Image column */}
            <div className={`hidden lg:block relative lg:w-1/2 self-stretch transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100" : "opacity-0 translate-x-6"}`}>
              <Image src="/images/about-refactrd.webp" alt="Refactrd team at work" fill className="object-cover object-center" priority />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1F2A44] via-[#1F2A44]/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/60 via-transparent to-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* ── PATH SELECTOR ── */}
      <section ref={pathsSectionRef} className="bg-[#F4F6F9] py-16 md:py-20 lg:py-24">
        <div className="container-custom">

          {/* ── DESKTOP: Large nav titles + detail panel ── */}
          <div className="hidden lg:grid lg:grid-cols-[2fr_3fr] min-h-[660px] xl:min-h-[720px] rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm">

            {/* Left: large typographic path navigation */}
            <div className="flex flex-col divide-y divide-[#E8ECF2] bg-white">
              {paths.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex-1 group w-full text-left px-8 xl:px-10 py-7 flex flex-col justify-center gap-2.5 transition-all duration-300 border-l-[3px] ${
                    activeIndex === i
                      ? "bg-[#1F2A44] border-l-[#A2D2FF]"
                      : "bg-white border-l-transparent hover:bg-[#F4F6F9] hover:border-l-[#1F2A44]/25"
                  }`}
                >
                  <span className={`font-clash font-bold text-[9px] uppercase tracking-[0.22em] ${activeIndex === i ? "text-[#A2D2FF]" : "text-[#94A3B8]"}`}>
                    {p.step} — {p.tag}
                  </span>
                  <span className={`font-clash font-semibold text-[20px] xl:text-[20px] leading-snug ${activeIndex === i ? "text-white" : "text-[#1F2A44] group-hover:text-[#1F2A44]"}`}>
                    {p.title}
                  </span>
                  {activeIndex === i && (
                    <span className="font-jakarta text-white/55 text-[13px] leading-relaxed mt-0.5">{p.subtitle}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Right: image recedes, CTA leads */}
            <div className="relative flex flex-col bg-[#1F2A44]">
              {/* Heavily darkened background image — texture only, not focal point */}
              <div className="absolute inset-0">
                <Image
                  key={activeIndex}
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover object-center opacity-20"
                />
                <div className="absolute inset-0 bg-[#1F2A44]/60" />
              </div>

              {/* Dot texture overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(162,210,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

              {/* Content — centred, CTA is the hero */}
              <div className="relative z-10 flex flex-col justify-center h-full px-10 xl:px-14 py-12">
                <p className="font-clash font-bold text-[9px] uppercase tracking-[0.22em] text-[#A2D2FF] mb-4">{active.step} — {active.tag}</p>

                <h3 className="font-clash font-bold text-white text-3xl xl:text-4xl leading-snug mb-3">
                  {active.rightTitle}
                </h3>
                <p className="font-jakarta text-white/55 text-base leading-relaxed mb-10">
                  {active.subtitle}
                </p>

                {/* Best For */}
                <div className="border-l-2 border-[#A2D2FF]/40 pl-4 mb-10">
                  <p className="font-clash font-bold text-[9px] uppercase tracking-[0.18em] text-[#A2D2FF]/70 mb-1.5">Best For</p>
                  <p className="font-jakarta text-white/60 text-sm leading-relaxed">{active.bestFor}</p>
                </div>

                {/* CTA — the main character */}
                <div>
                  <Link
                    href={active.href}
                    className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-base transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {active.cta}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── MOBILE: Accordion ── */}
          <div className="flex flex-col gap-3 lg:hidden">
            {paths.map((p, i) => {
              const isOpen = expandedMobile === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    isOpen ? "border-[#1F2A44] shadow-md" : "border-[#E2E8F0] bg-white"
                  }`}
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => setExpandedMobile(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 ${
                      isOpen ? "bg-[#1F2A44]" : "bg-white hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div>
                      <span className={`font-clash font-bold text-[9px] uppercase tracking-[0.2em] block mb-1 ${isOpen ? "text-[#A2D2FF]" : "text-[#94A3B8]"}`}>
                        {p.step} — {p.tag}
                      </span>
                      <span className={`font-clash font-bold text-[15px] leading-snug ${isOpen ? "text-white" : "text-[#1F2A44]"}`}>
                        {p.title}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-white/50" : "text-[#94A3B8]"}`} />
                  </button>

                  {/* Accordion body */}
                  {isOpen && (
                    <div className="bg-white">
                      <div className="p-5">
                        <p className="font-clash font-bold text-[#1F2A44] text-[17px] leading-snug mb-2">{p.rightTitle}</p>
                        <p className="font-jakarta text-[#64748B] text-sm mb-5">{p.subtitle}</p>

                        <div className="rounded-xl bg-[#F8FAFC] border border-[#E8ECF2] px-4 py-3.5 mb-5">
                          <p className="font-clash font-bold text-[9px] uppercase tracking-[0.14em] text-[#94A3B8] mb-1">Best For</p>
                          <p className="font-jakarta text-[#475569] text-sm leading-relaxed">{p.bestFor}</p>
                        </div>

                        <Link
                          href={p.href}
                          className="group/btn inline-flex items-center gap-2 px-6 py-3.5 bg-[#1F2A44] text-white rounded-full font-clash font-bold text-sm transition-all duration-300 hover:bg-[#263352] w-full justify-center"
                        >
                          {p.cta}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section ref={tableSectionRef} className="bg-white py-16 md:py-20 lg:py-24 border-t border-[#E8ECF2]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">

            <div className={`mb-12 transition-all duration-700 ${tableVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="font-clash font-bold text-[10px] uppercase tracking-[0.2em] text-[#94A3B8] mb-4 block">WHICH PATH IS RIGHT FOR YOU?</span>
              <h2 className="font-clash font-bold text-[#1F2A44] text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Match your situation<br className="hidden sm:block" />{" "}to the right path.
              </h2>
            </div>

            {/* Mobile: stacked cards */}
            <div className={`flex flex-col gap-3 sm:hidden transition-all duration-700 delay-200 ${tableVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {tableRows.map((row, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIndex(row.index); setExpandedMobile(row.index); window.scrollTo({ top: (pathsSectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 80, behavior: "smooth" }); }}
                  className="w-full text-left rounded-2xl border border-[#E2E8F0] bg-white p-5 hover:border-[#1F2A44] hover:shadow-md transition-all duration-200 group"
                >
                  <p className="font-jakarta text-[#475569] text-sm leading-snug mb-3">{row.situation}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-clash font-bold text-[#1F2A44] text-sm">{row.path}</span>
                    <ArrowRight className="w-4 h-4 text-[#94A3B8] group-hover:translate-x-1 group-hover:text-[#1F2A44] transition-all duration-200" />
                  </div>
                </button>
              ))}
            </div>

            {/* Desktop: table */}
            <div className={`hidden sm:block rounded-2xl overflow-hidden border border-[#E2E8F0] transition-all duration-700 delay-200 ${tableVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="grid grid-cols-[1fr_220px] bg-[#1F2A44]">
                <div className="px-6 py-4"><span className="font-clash font-bold text-[10px] uppercase tracking-[0.16em] text-white/40">Your Situation</span></div>
                <div className="px-6 py-4 border-l border-white/10"><span className="font-clash font-bold text-[10px] uppercase tracking-[0.16em] text-white/40">Recommended Path</span></div>
              </div>
              {tableRows.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_220px] border-t border-[#E8ECF2] cursor-pointer hover:bg-[#F8FAFC] transition-colors duration-200 group ${i % 2 === 0 ? "bg-white" : "bg-[#FAFBFD]"}`}
                  onClick={() => { setActiveIndex(row.index); window.scrollTo({ top: (pathsSectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - 80, behavior: "smooth" }); }}
                >
                  <div className="px-6 py-5"><p className="font-jakarta text-[#1F2A44] text-sm md:text-base leading-snug">{row.situation}</p></div>
                  <div className="px-6 py-5 border-l border-[#E8ECF2] flex items-center justify-between gap-3">
                    <span className="font-clash font-bold text-[#1F2A44] text-sm">{row.path}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:translate-x-1 group-hover:text-[#1F2A44] transition-all duration-200 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#1F2A44] py-16 md:py-20 lg:py-24">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-clash font-bold text-[10px] uppercase tracking-[0.2em] text-[#A2D2FF]/50 mb-5 block">STILL NOT SURE WHERE TO START?</span>
            <h2 className="font-clash font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Most organizations begin with the Opportunity Assessment.
            </h2>
            <p className="font-jakarta text-white/55 text-base sm:text-lg leading-relaxed mb-10">
              It&apos;s the fastest way to identify opportunities, understand priorities, and determine the most practical next step.
            </p>
            <Link
              href="/consultation/mini"
              className="group/btn inline-flex items-center gap-2 px-8 py-4 bg-[#A2D2FF] text-[#1F2A44] rounded-full font-clash font-bold text-sm sm:text-base transition-all duration-300 hover:bg-white hover:shadow-2xl hover:scale-105"
            >
              Explore The Opportunity Assessment
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

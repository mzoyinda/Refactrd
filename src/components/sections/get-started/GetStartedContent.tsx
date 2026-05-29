// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { ArrowRight, CheckCircle, Clock, Building2, Zap, Rocket } from "lucide-react";

// const paths = [
//   {
//     label: "EXPLORING YOUR OPTIONS",
//     icon: Clock,
//     headline: "Mini Consultation",
//     price: "$99",
//     priceNote: "One-time session",
//     body: "You know AI should be part of your operations but you are not sure where to start or what is realistic. In a focused 60-minute session, we map your workflows, identify your highest-impact opportunity, and hand you a written action plan you own. No pitch. No fluff. Just a clear answer to where do we begin.",
//     bestFor:
//       "Founders and growing business teams at the early stage of their AI thinking.",
//     whatYouGet: [
//       "60-minute focused session",
//       "Written AI opportunity map",
//       "Prioritised recommendations with next steps",
//       "Honest assessment of what is feasible and what is not",
//     ],
//     cta: "Book a Mini Consultation",
//     href: "https://cal.com/refactrd/mini-consultation",
//     external: true,
//     theme: "light" as const,
//   },
//   {
//     label: "TRANSFORMING YOUR ORGANIZATION",
//     icon: Building2,
//     headline: "AI Enterprise Consultation",
//     price: "$499",
//     priceNote: "Full-day engagement",
//     body: "Your organization is ready to move beyond experimenting. You want AI embedded into how you operate at a deeper level but you need a clear, structured plan before committing to a build. We spend dedicated time with your leadership team to audit your existing systems, map your workflows, identify high-value integration points, and deliver a structured implementation roadmap you can actually use.",
//     bestFor:
//       "Companies with existing systems and a serious intent to become AI-powered across departments.",
//     whatYouGet: [
//       "Deep-dive workflow and systems audit",
//       "AI integration roadmap across departments",
//       "Risk and security assessment",
//       "Prioritised implementation plan with realistic timelines",
//       "Post-consultation follow-up session",
//     ],
//     cta: "Book an Enterprise Consultation",
//     href: "https://cal.com/refactrd/enterprise-consultation",
//     external: true,
//     theme: "dark" as const,
//   },
//   {
//     label: "YOU KNOW WHAT YOU WANT",
//     icon: Zap,
//     headline: "Ready to Get Started",
//     price: "No consultation needed",
//     priceNote: "Go straight to build",
//     body: "You have a specific problem, a clear idea of what you want built, and you are ready to move. Tell us what you need and we will get back to you within 24 hours to scope it together.",
//     bestFor:
//       "Teams with a defined task who want to move directly into a build without back and forth.",
//     whatYouGet: [
//       "Direct response within 24 hours",
//       "Scoping call to confirm requirements and timeline",
//       "Proposal and engagement start",
//     ],
//     cta: "Submit Your Brief",
//     href: "/start",
//     external: false,
//     theme: "light" as const,
//   },
//   {
//     label: "EARLY-STAGE STARTUP",
//     icon: Rocket,
//     headline: "AI Startups Launchpad",
//     price: "Cohort-based program",
//     priceNote: "Limited spots per cohort",
//     body: "A selective cohort program for early-stage startups that want to get AI working in their operations without the full cost of a build engagement. We take a small number of qualifying startups through a structured process: audit, build, deploy. Cohorts are limited and open periodically.",
//     bestFor:
//       "Startups with 5 to 20 people who have a clear operational bottleneck and are ready to test AI in live operations.",
//     whatYouGet: [],
//     cta: "Join the Waitlist",
//     href: "/ai-startups-launchpad",
//     external: false,
//     theme: "light" as const,
//   },
// ];

// export default function GetStartedContent() {
//   const heroRef = useRef<HTMLElement>(null);
//   const cardsRef = useRef<HTMLDivElement>(null);
//   const [heroVisible, setHeroVisible] = useState(false);
//   const [cardsVisible, setCardsVisible] = useState(false);

//   useEffect(() => {
//     const heroObserver = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
//       { threshold: 0.1 }
//     );
//     const cardsObserver = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setCardsVisible(true); },
//       { threshold: 0.05 }
//     );

//     if (heroRef.current) heroObserver.observe(heroRef.current);
//     if (cardsRef.current) cardsObserver.observe(cardsRef.current);

//     return () => {
//       heroObserver.disconnect();
//       cardsObserver.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       {/* ── HERO ─────────────────────────────────────────────── */}
//       <section
//         ref={heroRef}
//         className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-32 pb-20"
//       >
//         <div className="container-custom w-full relative z-10">
//           <div className="max-w-5xl mx-auto text-center">
//             {/* Label */}
//             <div
//               className={`mb-6 transition-all duration-700 ${
//                 heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//               }`}
//             >
//               <span className="inline-block px-4 py-2 bg-[#A2D2FF]/20 text-[#1F2A44] rounded-full text-sm font-clash font-semibold uppercase tracking-wider">
//                 ✱ Where Do You Want To Start
//               </span>
//             </div>

//             {/* Headline */}
//             <h1
//               className={`text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${
//                 heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//               }`}
//             >
//               Choose the path that{" "}
//               <span className="relative inline-block">
//                 matches where
//                 <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#A2D2FF]" />
//               </span>{" "}
//               you are right now.
//             </h1>

//             {/* Subtext */}
//             <p
//               className={`font-clash text-lg lg:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${
//                 heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//               }`}
//             >
//               Each option is designed for a specific stage. You are not overpaying to explore or underinvesting when you are ready to build. Pick what fits and we will take it from there.
//             </p>
//           </div>
//         </div>

//         {/* Background decoration */}
//         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />
//       </section>

//       {/* ── CARDS ────────────────────────────────────────────── */}
//       <section className="bg-[#F4F6F9] py-20">
//         <div className="container-custom">
//           <div
//             ref={cardsRef}
//             className="grid md:grid-cols-2 gap-6"
//           >
//             {paths.map((path, index) => {
//               const Icon = path.icon;
//               const isDark = path.theme === "dark";

//               return (
//                 <div
//                   key={index}
//                   className={`group relative rounded-3xl flex flex-col overflow-hidden transition-all duration-700 ${
//                     isDark
//                       ? "bg-[#1F2A44] text-white"
//                       : "bg-white border-2 border-[#DDE3EE] hover:border-[#1F2A44]"
//                   } ${
//                     cardsVisible
//                       ? "opacity-100 translate-y-0"
//                       : "opacity-0 translate-y-10"
//                   }`}
//                   style={{ transitionDelay: `${index * 120}ms` }}
//                 >
//                   {/* Top accent bar */}
//                   <div
//                     className={`h-1 w-full ${
//                       isDark
//                         ? "bg-gradient-to-r from-[#A2D2FF] to-[#5B6CFF]"
//                         : "bg-gradient-to-r from-[#DDE3EE] to-[#DDE3EE] group-hover:from-[#A2D2FF] group-hover:to-[#5B6CFF] transition-all duration-500"
//                     }`}
//                   />

//                   <div className="p-8 lg:p-10 flex flex-col h-full">
//                     {/* Label + Icon row */}
//                     <div className="flex items-start justify-between mb-6">
//                       <span
//                         className={`font-clash font-bold text-[10px] uppercase tracking-[0.15em] ${
//                           isDark ? "text-[#A2D2FF]" : "text-[#0e5d7d]"
//                         }`}
//                       >
//                         {path.label}
//                       </span>
//                       <div
//                         className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
//                           isDark ? "bg-[#A2D2FF]/10" : "bg-[#E6EAF0]"
//                         }`}
//                       >
//                         <Icon
//                           className={`w-5 h-5 ${
//                             isDark ? "text-[#A2D2FF]" : "text-[#1F2A44]"
//                           }`}
//                         />
//                       </div>
//                     </div>

//                     {/* Headline */}
//                     <h2
//                       className={`font-clash font-bold text-2xl lg:text-3xl mb-1 ${
//                         isDark ? "text-white" : "text-[#1F2A44]"
//                       }`}
//                     >
//                       {path.headline}
//                     </h2>

//                     {/* Price row */}
//                    <div className="flex items-baseline gap-3 mb-5">
//                       <span
//                         className={`font-clash font-bold ${
//                           path.price.startsWith('$') ? 'text-4xl' : 'text-xl'
//                         } ${isDark ? "text-[#A2D2FF]" : "text-[#0e5d7d]"}`}
//                       >
//                         {path.price}
//                       </span>
//                       <span
//                         className={`font-jakarta text-sm ${
//                           isDark ? "text-white/40" : "text-[#94A3B8]"
//                         }`}
//                       >
//                         {path.priceNote}
//                       </span>
//                     </div>

//                     {/* Divider */}
//                     <div
//                       className={`h-px w-full mb-5 ${
//                         isDark ? "bg-white/10" : "bg-[#E8ECF0]"
//                       }`}
//                     />

//                     {/* Body */}
//                     <p
//                       className={`font-jakarta text-sm leading-relaxed mb-5 ${
//                         isDark ? "text-white/70" : "text-[#64748B]"
//                       }`}
//                     >
//                       {path.body}
//                     </p>

//                     {/* Best for */}
//                     <p
//                       className={`font-clash font-semibold text-xs mb-5 ${
//                         isDark ? "text-white/40" : "text-[#94A3B8]"
//                       }`}
//                     >
//                       Best for: {path.bestFor}
//                     </p>

//                     {/* What you get */}
//                     {path.whatYouGet.length > 0 && (
//                       <ul className="space-y-2.5 mb-8 flex-1">
//                         {path.whatYouGet.map((item, i) => (
//                           <li key={i} className="flex items-start gap-2.5">
//                             <CheckCircle
//                               className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
//                                 isDark ? "text-[#A2D2FF]" : "text-[#0e5d7d]"
//                               }`}
//                             />
//                             <span
//                               className={`font-jakarta text-sm ${
//                                 isDark ? "text-white/70" : "text-[#64748B]"
//                               }`}
//                             >
//                               {item}
//                             </span>
//                           </li>
//                         ))}
//                       </ul>
//                     )}

//                     {path.whatYouGet.length === 0 && (
//                       <div className="flex-1" />
//                     )}

//                     {/* CTA */}
//                     <div className="mt-auto pt-6">
//                       {path.external ? (
//                         <a
//                           href={path.href}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full font-clash font-semibold text-sm transition-all duration-300 hover:scale-[1.02] group/btn ${
//                             isDark
//                               ? "bg-white text-[#1F2A44]"
//                               : "bg-[#1F2A44] text-white"
//                           }`}
//                         >
//                           {path.cta}
//                           <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
//                         </a>
//                       ) : (
//                         <Link
//                           href={path.href}
//                           className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full font-clash font-semibold text-sm transition-all duration-300 hover:scale-[1.02] group/btn ${
//                             isDark
//                               ? "bg-white text-[#1F2A44] "
//                               : "bg-[#1F2A44] text-white"
//                           }`}
//                         >
//                           {path.cta}
//                           <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* ── FALLBACK LINE ─────────────────────────────────── */}
         
//         </div>
//       </section>
//     </>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Building2, Zap, Rocket } from "lucide-react";
import ConsultationModal from "@/components/ui/ConsultationModal";

type ConsultationType = "mini" | "enterprise";

const paths = [
  {
    label: "EXPLORING YOUR OPTIONS",
    icon: Clock,
    headline: "Mini Consultation",
    price: "$99",
    priceNote: "One-time session",
    body: "You know AI should be part of your operations but you are not sure where to start or what is realistic. In a focused 60-minute session, we map your workflows, identify your highest-impact opportunity, and hand you a written action plan you own. No pitch. No fluff. Just a clear answer to where do we begin.",
    bestFor:
      "Founders and growing business teams at the early stage of their AI thinking.",
    whatYouGet: [
      "60-minute focused session",
      "Written AI opportunity map",
      "Prioritised recommendations with next steps",
      "Honest assessment of what is feasible and what is not",
    ],
    cta: "Book a Mini Consultation",
    href: "https://cal.com/refactrd/mini-consultation",
    external: true,
    theme: "light" as const,
  },
  {
    label: "TRANSFORMING YOUR ORGANIZATION",
    icon: Building2,
    headline: "AI Enterprise Consultation",
    price: "$499",
    priceNote: "Full-day engagement",
    body: "Your organization is ready to move beyond experimenting. You want AI embedded into how you operate at a deeper level but you need a clear, structured plan before committing to a build. We spend dedicated time with your leadership team to audit your existing systems, map your workflows, identify high-value integration points, and deliver a structured implementation roadmap you can actually use.",
    bestFor:
      "Companies with existing systems and a serious intent to become AI-powered across departments.",
    whatYouGet: [
      "Deep-dive workflow and systems audit",
      "AI integration roadmap across departments",
      "Risk and security assessment",
      "Prioritised implementation plan with realistic timelines",
      "Post-consultation follow-up session",
    ],
    cta: "Book an Enterprise Consultation",
    href: "https://cal.com/refactrd/enterprise-consultation",
    external: true,
    theme: "dark" as const,
  },
  {
    label: "YOU KNOW WHAT YOU WANT",
    icon: Zap,
    headline: "Ready to Get Started",
    price: "No consultation needed",
    priceNote: "Go straight to build",
    body: "You have a specific problem, a clear idea of what you want built, and you are ready to move. Tell us what you need and we will get back to you within 24 hours to scope it together.",
    bestFor:
      "Teams with a defined task who want to move directly into a build without back and forth.",
    whatYouGet: [
      "Direct response within 24 hours",
      "Scoping call to confirm requirements and timeline",
      "Proposal and engagement start",
    ],
    cta: "Submit Your Brief",
    href: "/start",
    external: false,
    theme: "light" as const,
  },
  {
    label: "EARLY-STAGE STARTUP",
    icon: Rocket,
    headline: "AI Startups Launchpad",
    price: "Cohort-based program",
    priceNote: "Limited spots per cohort",
    body: "A selective cohort program for early-stage startups that want to get AI working in their operations without the full cost of a build engagement. We take a small number of qualifying startups through a structured process: audit, build, deploy. Cohorts are limited and open periodically.",
    bestFor:
      "Startups with 5 to 20 people who have a clear operational bottleneck and are ready to test AI in live operations.",
    whatYouGet: [],
    cta: "Join the Waitlist",
    href: "/ai-startups-launchpad",
    external: false,
    theme: "light" as const,
  },
];

export default function GetStartedContent() {
  const heroRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [activeModal, setActiveModal] = useState<ConsultationType | null>(null);

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.1 }
    );
    const cardsObserver = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCardsVisible(true); },
      { threshold: 0.05 }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);
    if (cardsRef.current) cardsObserver.observe(cardsRef.current);

    return () => {
      heroObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-32 pb-20"
      >
        <div className="container-custom w-full relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Label */}
            <div
              className={`mb-6 transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-block px-4 py-2 bg-[#A2D2FF]/20 text-[#1F2A44] rounded-full text-sm font-clash font-semibold uppercase tracking-wider">
                ✱ Where Do You Want To Start
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Choose the path that{" "}
              <span className="relative inline-block">
                matches where
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#A2D2FF]" />
              </span>{" "}
              you are right now.
            </h1>

            {/* Subtext */}
            <p
              className={`font-clash text-lg lg:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Each option is designed for a specific stage. You are not overpaying to explore or underinvesting when you are ready to build. Pick what fits and we will take it from there.
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ── CARDS ────────────────────────────────────────────── */}
      <section className="bg-[#F4F6F9] py-20">
        <div className="container-custom">
          <div
            ref={cardsRef}
            className="grid md:grid-cols-2 gap-6"
          >
            {paths.map((path, index) => {
              const Icon = path.icon;
              const isDark = path.theme === "dark";

              return (
                <div
                  key={index}
                  className={`group relative rounded-3xl flex flex-col overflow-hidden transition-all duration-700 ${
                    isDark
                      ? "bg-[#1F2A44] text-white"
                      : "bg-white border-2 border-[#DDE3EE] hover:border-[#1F2A44]"
                  } ${
                    cardsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {/* Top accent bar */}
                  <div
                    className={`h-1 w-full ${
                      isDark
                        ? "bg-gradient-to-r from-[#A2D2FF] to-[#5B6CFF]"
                        : "bg-gradient-to-r from-[#DDE3EE] to-[#DDE3EE] group-hover:from-[#A2D2FF] group-hover:to-[#5B6CFF] transition-all duration-500"
                    }`}
                  />

                  <div className="p-8 lg:p-10 flex flex-col h-full">
                    {/* Label + Icon row */}
                    <div className="flex items-start justify-between mb-6">
                      <span
                        className={`font-clash font-bold text-[10px] uppercase tracking-[0.15em] ${
                          isDark ? "text-[#A2D2FF]" : "text-[#0e5d7d]"
                        }`}
                      >
                        {path.label}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isDark ? "bg-[#A2D2FF]/10" : "bg-[#E6EAF0]"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isDark ? "text-[#A2D2FF]" : "text-[#1F2A44]"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Headline */}
                    <h2
                      className={`font-clash font-bold text-2xl lg:text-3xl mb-1 ${
                        isDark ? "text-white" : "text-[#1F2A44]"
                      }`}
                    >
                      {path.headline}
                    </h2>

                    {/* Price row */}
                    <div className="flex items-baseline gap-3 mb-5">
                      <span
                        className={`font-clash font-bold ${
                          path.price.startsWith('$') ? 'text-4xl' : 'text-base'
                        } ${isDark ? "text-[#A2D2FF]" : "text-[#0e5d7d]"}`}
                      >
                        {path.price}
                      </span>
                      <span
                        className={`font-jakarta text-sm ${
                          isDark ? "text-white/40" : "text-[#94A3B8]"
                        }`}
                      >
                        {path.priceNote}
                      </span>
                    </div>

                    {/* Divider */}
                    <div
                      className={`h-px w-full mb-5 ${
                        isDark ? "bg-white/10" : "bg-[#E8ECF0]"
                      }`}
                    />

                    {/* Body */}
                    <p
                      className={`font-jakarta text-sm leading-relaxed mb-5 ${
                        isDark ? "text-white/70" : "text-[#64748B]"
                      }`}
                    >
                      {path.body}
                    </p>

                    {/* Best for */}
                    <p
                      className={`font-clash font-semibold text-xs mb-5 ${
                        isDark ? "text-white/40" : "text-[#94A3B8]"
                      }`}
                    >
                      Best for: {path.bestFor}
                    </p>

                    {/* What you get */}
                    {path.whatYouGet.length > 0 && (
                      <ul className="space-y-2.5 mb-8 flex-1">
                        {path.whatYouGet.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                isDark ? "text-[#A2D2FF]" : "text-[#0e5d7d]"
                              }`}
                            />
                            <span
                              className={`font-jakarta text-sm ${
                                isDark ? "text-white/70" : "text-[#64748B]"
                              }`}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {path.whatYouGet.length === 0 && (
                      <div className="flex-1" />
                    )}

                    {/* CTA */}
                    <div className="mt-auto pt-6">
                      {path.external ? (
                        <button
                          onClick={() => setActiveModal(
                            path.headline === "Mini Consultation" ? "mini" : "enterprise"
                          )}
                          className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full font-clash font-semibold text-sm transition-all duration-300 hover:scale-[1.02] group/btn ${
                            isDark
                              ? "bg-white text-[#1F2A44] hover:bg-[#E6EAF0]"
                              : "bg-[#1F2A44] text-white"
                          }`}
                        >
                          {path.cta}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      ) : (
                        <Link
                          href={path.href}
                          className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full font-clash font-semibold text-sm transition-all duration-300 hover:scale-[1.02] group/btn ${
                            isDark
                              ? "bg-white text-[#1F2A44] hover:bg-[#E6EAF0]"
                              : "bg-[#1F2A44] text-white"
                          }`}
                        >
                          {path.cta}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── FALLBACK LINE ─────────────────────────────────── */}
          <div
            className={`mt-14 text-center transition-all duration-700 ${
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="inline-block border-2 border-[#DDE3EE] rounded-2xl px-8 py-6 max-w-xl">
              <p className="font-clash text-[#64748B] text-sm mb-4 leading-relaxed">
                Not sure which one fits? The Mini Consultation is the right starting point for most people. It gives you a clear answer without a large commitment.
              </p>
              <button
                onClick={() => setActiveModal("mini")}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-semibold text-sm transition-all duration-300 hover:scale-105"
              >
                Book a Mini Consultation (₦149,000)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <ConsultationModal
          type={activeModal}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
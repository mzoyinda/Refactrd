import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Workflow,
  Gauge,
  Share2,
  GitBranch,
  Sparkles,
  Zap,
  Clock,
  Eye,
  Users,
  Cpu,
  TrendingUp,
  Database,
  Bot,
  Search,
  Network,
  Brain,
  BookOpen,
  Activity,
  Lightbulb,
  RefreshCw,
  Target,
  Smile,
  Wrench,
  FlaskConical,
  Rocket,
  LucideIcon,
} from "lucide-react";
import { ServiceDefinition, services } from "@/data/services";
import ServiceFAQAccordion from "@/components/sections/services/ServiceFAQAccordion";
import ServiceFrameworkDiagram from "@/components/sections/services/ServiceFrameworkDiagram";

const transformIcons: Record<string, LucideIcon> = {
  "Workflow Design": Workflow,
  "Operational Efficiency": Gauge,
  "Information Flow": Share2,
  "Decision-Making": GitBranch,
  "AI Readiness": Sparkles,
  "Enterprise Knowledge Systems": Database,
  "AI Assistants": Bot,
  "Enterprise Search": Search,
  "Knowledge Architecture": Network,
  "Operational Intelligence": Activity,
  "Decision Support": Lightbulb,
  "AI-Enabled Workflows": Cpu,
  "Operational Monitoring": Eye,
  "Continuous Improvement": RefreshCw,
  "AI Product Strategy": Target,
  "AI-Powered Features": Sparkles,
  "Customer Experiences": Smile,
  "Internal Product Tools": Wrench,
  "Product Validation": FlaskConical,
};

const outcomeIcons: Record<string, LucideIcon> = {
  "Faster Execution": Zap,
  "Reduced Manual Effort": Clock,
  "Better Visibility": Eye,
  "Better Collaboration": Users,
  "AI Readiness": Cpu,
  "Greater Agility": TrendingUp,
  "Faster Information Access": Zap,
  "Better Decisions": Brain,
  "Faster Onboarding": Users,
  "Stronger Knowledge Retention": BookOpen,
  "Better AI Responses": Bot,
  "Greater Productivity": TrendingUp,
  "Faster Decisions": Zap,
  "Greater Visibility": Eye,
  "Smarter Execution": Cpu,
  "Better Performance": Activity,
  "Continuous Improvement": RefreshCw,
  "More Scalable Operations": Gauge,
  "Better Customer Experiences": Smile,
  "Faster Product Innovation": Rocket,
  "Practical AI Features": Sparkles,
  "New Growth Opportunities": TrendingUp,
  "Stronger Internal Tools": Wrench,
  "Better Product Decisions": Lightbulb,
};

const challengeNodes: { x: number; y: number; friction: boolean }[] = [
  { x: 20, y: 100, friction: false },
  { x: 120, y: 60, friction: false },
  { x: 220, y: 120, friction: true },
  { x: 320, y: 50, friction: false },
  { x: 420, y: 110, friction: true },
  { x: 520, y: 70, friction: false },
];

export default function ServiceRichDetail({ service }: { service: ServiceDefinition }) {
  const relatedServices = (service.relatedServiceSlugs ?? [])
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is ServiceDefinition => !!s);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16">
        <div className="container-custom relative z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-clash font-semibold text-[#5a6580] hover:text-[#1F2A44] transition-colors duration-200 mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
                {service.level} &mdash; {service.title}
              </span>
              <h1 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] leading-tight">
                {service.headline}
              </h1>

              {service.subheadline && (
                <p className="mt-4 font-clash font-semibold text-lg sm:text-xl text-[#1F2A44]/80 leading-snug">
                  {service.subheadline}
                </p>
              )}

              <div className="mt-5 space-y-4">
                {service.body.map((paragraph, i) => (
                  <p key={i} className="font-jakarta text-[#5a6580] text-[15px] sm:text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {service.outcomeBadges && service.outcomeBadges.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mt-6">
                  {service.outcomeBadges.map((badge, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#A2D2FF]/15 border border-[#A2D2FF]/30 font-clash font-semibold text-[12px] text-[#1F2A44]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0e5d7d] flex-shrink-0" />
                      {badge}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link
                  href="/get-started"
                  className="group inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-white font-clash font-bold px-7 py-4 rounded-full hover:bg-[#2d3e62] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Talk With Refactrd
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/approach"
                  className="inline-flex items-center justify-center font-clash font-semibold border border-[#1F2A44]/25 text-[#1F2A44] rounded-full transition-all duration-300 hover:bg-[#1F2A44] hover:text-white hover:border-[#1F2A44] px-7 py-4"
                >
                  Explore Our Approach
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/60 via-[#1F2A44]/10 to-transparent" />

              {/* blueprint / workflow overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 400 500" preserveAspectRatio="none" fill="none">
                <path
                  d="M40 430 L150 390 L250 440 L340 370"
                  stroke="#A2D2FF"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  fill="none"
                />
                {[[40, 430], [150, 390], [250, 440], [340, 370]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="4.5" fill="#A2D2FF" />
                ))}
              </svg>

              {service.heroCaption && (
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md sm:max-w-[220px]">
                  <p className="font-clash font-bold text-[11px] uppercase tracking-wider text-[#1F2A44]">
                    {service.heroCaption.title}
                  </p>
                  <p className="font-jakarta text-[11px] text-[#5a6580] mt-0.5">
                    {service.heroCaption.subtitle}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* THE CHALLENGE */}
      {service.challenge && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="min-w-0">
                <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
                  The Challenge
                </span>
                <h2 className="mt-2 mb-5 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight">
                  {service.challenge.heading}
                </h2>

                {/* Process diagram */}
                {service.challenge.diagram?.type === "funnel" ? (
                  <div className="rounded-2xl border border-[#DDE3EE] bg-[#F9FAFC] p-5 sm:p-6 mb-6">
                    <div className="flex flex-col items-center gap-2">
                      {(service.challenge.diagram.sources ?? []).map((source, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <span className="px-4 py-2 rounded-full bg-white border border-[#DDE3EE] font-clash font-semibold text-xs sm:text-sm text-[#5a6580]">
                            {source}
                          </span>
                          <ArrowDown className="w-3.5 h-3.5 text-[#CBD5E1]" />
                        </div>
                      ))}
                      <span className="px-5 py-2.5 rounded-full bg-[#1F2A44] font-clash font-bold text-xs sm:text-sm text-white shadow-sm">
                        {service.challenge.diagram.destination}
                      </span>
                    </div>
                    {service.challenge.diagram.caption && (
                      <p className="mt-4 font-jakarta text-xs text-[#94A3B8] text-center">
                        {service.challenge.diagram.caption}
                      </p>
                    )}
                  </div>
                ) : service.challenge.diagram?.type === "sequence" ? (
                  <div className="rounded-2xl border border-[#DDE3EE] bg-[#F9FAFC] p-5 sm:p-6 mb-6">
                    <div className="flex flex-col items-center gap-2">
                      {(service.challenge.diagram.stages ?? []).map((stage, i, arr) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          <span className="px-4 py-2 rounded-full bg-white border border-[#DDE3EE] font-clash font-semibold text-xs sm:text-sm text-[#5a6580]">
                            {stage}
                          </span>
                          {i < arr.length - 1 && <ArrowDown className="w-3.5 h-3.5 text-[#CBD5E1]" />}
                        </div>
                      ))}
                    </div>
                    {(service.challenge.diagram.beforeLabel || service.challenge.diagram.afterLabel) && (
                      <div className="mt-4 pt-4 border-t border-[#DDE3EE] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-center">
                        <p className="font-jakarta text-xs text-[#94A3B8]">
                          Before: <span className="text-[#5a6580] font-semibold">{service.challenge.diagram.beforeLabel}</span>
                        </p>
                        <span className="hidden sm:inline text-[#CBD5E1]">&rarr;</span>
                        <p className="font-jakarta text-xs text-[#0e5d7d]">
                          After: <span className="font-semibold">{service.challenge.diagram.afterLabel}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-[#DDE3EE] bg-[#F9FAFC] p-5 sm:p-6 mb-6 overflow-x-auto">
                    <svg viewBox="0 0 560 150" className="w-full min-w-[420px] h-auto" fill="none">
                      <path
                        d={`M${challengeNodes.map((n) => `${n.x} ${n.y}`).join(" L")}`}
                        stroke="#CBD5E1"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        fill="none"
                      />
                      {challengeNodes.map((n, i) => (
                        <circle key={i} cx={n.x} cy={n.y} r="7" fill={n.friction ? "#F59E0B" : "#1F2A44"} />
                      ))}
                      <text x="220" y="145" textAnchor="middle" fontSize="11" fill="#B45309" fontFamily="var(--font-jakarta), sans-serif">
                        Handoff delay
                      </text>
                      <text x="420" y="135" textAnchor="middle" fontSize="11" fill="#B45309" fontFamily="var(--font-jakarta), sans-serif">
                        Approval bottleneck
                      </text>
                    </svg>
                    <p className="mt-2 font-jakarta text-xs text-[#94A3B8] text-center">
                      A typical workflow before transformation
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  {service.challenge.body.map((paragraph, i) => (
                    <p key={i} className="font-jakarta text-[#5a6580] text-[15px] sm:text-base leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#1F2A44] p-6 sm:p-8">
                <p className="text-xs font-clash font-bold uppercase tracking-[0.18em] text-[#A2D2FF] mb-2">
                  Common Signs
                </p>
                <ul className="divide-y divide-white/10">
                  {service.challenge.signs.map((sign, i) => (
                    <li key={i} className="flex items-start gap-3.5 py-3.5 first:pt-3 last:pb-0">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#A2D2FF]" strokeWidth={2} />
                      </span>
                      <span className="font-jakarta text-[15px] text-white/80 leading-snug">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHAT WE HELP YOU TRANSFORM — capability index */}
      {service.transformItems && (
        <section className="section-padding bg-[#F9FAFC]">
          <div className="container-custom">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight mb-10 sm:mb-14 max-w-2xl">
              What We Deliver
            </h2>

            <div className="border-t border-[#DDE3EE]">
              {service.transformItems.map((item, i) => {
                const Icon = transformIcons[item.title] ?? Workflow;
                return (
                  <div
                    key={i}
                    className="group flex flex-col sm:grid sm:grid-cols-[104px_1fr_1fr] lg:grid-cols-[120px_1fr_1fr] sm:items-center gap-4 sm:gap-8 py-8 sm:py-10 border-b border-[#DDE3EE]"
                  >
                    {/* Number + icon */}
                    <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-4">
                      <span className="font-clash font-extrabold text-3xl sm:text-4xl text-[#1F2A44]/10 leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white border border-[#DDE3EE] flex items-center justify-center flex-shrink-0 group-hover:border-[#A2D2FF] group-hover:bg-[#A2D2FF]/10 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[#1F2A44]" strokeWidth={1.75} />
                      </div>
                    </div>

                    {/* Title + tagline */}
                    <div>
                      <h3 className="font-clash font-bold text-[#1F2A44] text-xl sm:text-2xl leading-snug mb-1.5">
                        {item.title}
                      </h3>
                      <p className="font-clash font-semibold text-[#0e5d7d] text-sm sm:text-base">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <p className="font-jakarta text-[#5a6580] text-[15px] sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* OUTCOMES */}
      {service.outcomes && (
        <section className="section-padding bg-[#1F2A44] text-white">
          <div className="container-custom">
            <div className="max-w-3xl mb-10 sm:mb-14">
              <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#A2D2FF]">
                Outcomes
              </span>
              <h2 className="mt-2 mb-4 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold leading-tight">
                {service.outcomes.heading}
              </h2>
              <p className="font-jakarta text-white/70 text-[15px] sm:text-base leading-relaxed">
                {service.outcomes.intro}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {service.outcomes.items.map((item, i) => {
                const Icon = outcomeIcons[item.title] ?? Zap;
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/5 border border-white/10 p-7 sm:p-8 hover:bg-white/[0.08] transition-colors duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#A2D2FF]/15 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-[#A2D2FF]" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-clash font-bold text-white text-lg mb-2">{item.title}</h3>
                    <p className="font-jakarta text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* THE REFACTRD FRAMEWORK */}
      {service.fit && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
              <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
                The Bigger Picture
              </span>
              <h2 className="mt-2 mb-4 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight">
                {service.fit.heading}
              </h2>
              <div className="space-y-2">
                {service.fit.body.map((paragraph, i) => (
                  <p key={i} className="font-jakarta text-[#5a6580] text-[15px] sm:text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <ServiceFrameworkDiagram activeSlug={service.slug} />
            </div>
          </div>
        </section>
      )}

      {/* RELATED SERVICES — horizontal strips */}
      {relatedServices.length > 0 && (
        <section className="section-padding bg-[#F9FAFC]">
          <div className="container-custom max-w-4xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight mb-2">
              Continue Exploring
            </h2>
            <p className="font-jakarta text-[#5a6580] text-[15px] sm:text-base mb-8 sm:mb-10">
              {service.relatedServicesIntro ?? "Workflow transformation often leads to other AI initiatives."}
            </p>
            <div className="border-t border-[#DDE3EE]">
              {relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="group flex items-center justify-between gap-5 sm:gap-6 py-6 sm:py-7 border-b border-[#DDE3EE]"
                >
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={related.image} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-clash font-bold text-[#1F2A44] text-base sm:text-lg mb-1 truncate">
                        {related.title}
                      </h3>
                      <p className="font-jakarta text-[#5a6580] text-sm sm:text-[15px] leading-snug">
                        {related.headline}
                      </p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center gap-1.5 font-clash font-semibold text-sm text-[#1F2A44] group-hover:gap-2.5 transition-all duration-300">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CASE STUDIES */}
      {service.relatedCaseStudies && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight mb-3">
              Case Studies
            </h2>
            <p className="font-jakarta text-[#5a6580] text-[15px] sm:text-base mb-8 sm:mb-10 max-w-2xl">
              {service.caseStudiesIntro ?? "See how organizations have improved execution through workflow transformation."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {service.relatedCaseStudies.map((cs) => (
                <Link
                  key={cs.name}
                  href={cs.href}
                  className="group rounded-2xl overflow-hidden border-2 border-[#CBD5E1] hover:border-[#0e5d7d] transition-all duration-300 flex flex-col"
                >
                  <div
                    className="relative h-48"
                    style={{ background: "linear-gradient(135deg, #1F2A44 0%, #0e3a5c 50%, #0e5d7d 100%)" }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                        opacity: 0.12,
                      }}
                    />
                    <span
                      className="absolute font-clash font-bold text-white select-none pointer-events-none leading-none"
                      style={{ fontSize: "6.5rem", opacity: 0.08, bottom: "-1rem", right: "-0.25rem" }}
                    >
                      {cs.name.charAt(0)}
                    </span>
                    <span className="absolute top-4 left-4 px-2.5 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-clash font-bold rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-clash font-bold text-[#1F2A44] text-lg mb-2">{cs.name}</h3>
                    <p className="font-jakarta text-[#5a6580] text-sm leading-relaxed mb-4 flex-1">{cs.summary}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-clash font-semibold text-[#0e5d7d] group-hover:gap-2.5 transition-all duration-300">
                      View Case Study
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}

              {Array.from({
                length: Math.max(0, 3 - service.relatedCaseStudies.length),
              }).map((_, i) => {
                const placeholders = [
                  {
                    title: "More Transformation Stories",
                    body: "Additional case studies will be published here as we complete new engagements.",
                  },
                  {
                    title: "New Case Study Coming Soon",
                    body: "We're working on more transformation stories.",
                  },
                  {
                    title: "Your Success Story Could Be Next",
                    body: "Every engagement starts with a conversation about your goals.",
                  },
                ];
                const placeholder = placeholders[i] ?? placeholders[placeholders.length - 1];
                return (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border-2 border-dashed border-[#DDE3EE] flex flex-col"
                  >
                    <div className="relative h-40 bg-[#F9FAFC] flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-[#CBD5E1]" strokeWidth={1.5} />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-clash font-bold text-[#94A3B8] text-lg mb-2">{placeholder.title}</h3>
                      <p className="font-jakarta text-[#94A3B8] text-sm leading-relaxed">{placeholder.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="section-padding bg-[#F9FAFC]">
          <div className="container-custom max-w-3xl">
            <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">FAQ</span>
            <h2 className="mt-2 mb-8 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight">
              Frequently Asked Questions
            </h2>
            <ServiceFAQAccordion faqs={service.faqs} />
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      {service.finalCta && (
        <section className="relative bg-[#1F2A44] overflow-hidden py-14 sm:py-16 lg:py-20">
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" preserveAspectRatio="none">
            <defs>
              <pattern id="cta-blueprint-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#A2D2FF" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-blueprint-grid)" />
          </svg>
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <path
              d="M0 300 L200 250 L400 320 L600 200 L800 280 L1000 180 L1200 240"
              stroke="#A2D2FF"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              fill="none"
            />
            {[[200, 250], [400, 320], [600, 200], [800, 280], [1000, 180]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="#A2D2FF" />
            ))}
          </svg>

          <div className="container-custom relative z-10 text-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-clash font-bold text-white leading-tight mb-5 max-w-3xl mx-auto">
              {service.finalCta.heading}
            </h2>
            <p className="font-jakarta text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
              {service.finalCta.body}
            </p>
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-2 bg-[#E6EAF0] text-[#1F2A44] font-clash font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300"
            >
              Talk With Refactrd
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

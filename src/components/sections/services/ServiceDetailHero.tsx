import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceDefinition } from "@/data/services";

export default function ServiceDetailHero({ service }: { service: ServiceDefinition }) {
  return (
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
            <h1 className="mt-2 text-3xl sm:text-5xl lg:text-[3.3rem] font-clash font-bold text-[#1F2A44] leading-tight">
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
                href="/contact"
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
  );
}

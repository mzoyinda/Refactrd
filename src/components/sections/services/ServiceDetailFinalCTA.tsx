import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceDefinition } from "@/data/services";

export default function ServiceDetailFinalCTA({ service }: { service: ServiceDefinition }) {
  const finalCta = service.finalCta;
  if (!finalCta) return null;

  return (
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
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-clash font-bold text-white leading-tight mb-5 max-w-4xl mx-auto">
          {finalCta.heading}
        </h2>
        <p className="font-jakarta text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
          {finalCta.body}
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
  );
}

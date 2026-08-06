import Link from "next/link";
import { services } from "@/data/services";

const shortLabel: Record<string, string> = {
  "Knowledge Systems & AI Assistants": "Knowledge Systems",
};

function FrameworkConnector() {
  return <div className="w-px h-7 sm:h-9 bg-gradient-to-b from-[#A2D2FF] to-[#DDE3EE]" />;
}

/**
 * Reusable, minimal vertical framework diagram showing how workflow
 * transformation leads into the other Refactrd service areas — bookended
 * by the operational starting point and the eventual adoption outcome.
 * Pass `activeSlug` to highlight the current page's step.
 */
export default function ServiceFrameworkDiagram({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5 sm:gap-3">
      <span className="font-clash font-bold text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#94A3B8]">
        Current Operations
      </span>
      <FrameworkConnector />

      {services.map((service, i) => {
        const isActive = service.slug === activeSlug;
        return (
          <div key={service.slug} className="flex flex-col items-center gap-2.5 sm:gap-3">
            <Link
              href={`/services/${service.slug}`}
              className={`px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border font-clash font-bold text-[12px] sm:text-sm tracking-[0.08em] uppercase transition-all duration-300 ${
                isActive
                  ? "bg-[#1F2A44] border-[#1F2A44] text-white shadow-md"
                  : "bg-white border-[#DDE3EE] text-[#1F2A44] hover:border-[#1F2A44]/40 hover:shadow-sm"
              }`}
            >
              {shortLabel[service.title] ?? service.title}
            </Link>
            <FrameworkConnector />
          </div>
        );
      })}

      <span className="font-clash font-bold text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#94A3B8]">
        Operational Adoption
      </span>
    </div>
  );
}

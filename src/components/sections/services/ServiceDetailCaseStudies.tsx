import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ServiceDefinition } from "@/data/services";

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

export default function ServiceDetailCaseStudies({ service }: { service: ServiceDefinition }) {
  const relatedCaseStudies = service.relatedCaseStudies;
  if (!relatedCaseStudies) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight mb-3">
          Case Studies
        </h2>
        <p className="font-jakarta text-[#5a6580] text-[15px] sm:text-base mb-8 sm:mb-10 max-w-2xl">
          {service.caseStudiesIntro ?? "See how organizations have improved execution through workflow transformation."}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedCaseStudies.map((cs) => (
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
            length: Math.max(0, 3 - relatedCaseStudies.length),
          }).map((_, i) => {
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
  );
}

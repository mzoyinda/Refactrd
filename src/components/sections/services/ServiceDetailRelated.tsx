import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ServiceDefinition, services } from "@/data/services";

export default function ServiceDetailRelated({ service }: { service: ServiceDefinition }) {
  const relatedServices = (service.relatedServiceSlugs ?? [])
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is ServiceDefinition => !!s);

  if (relatedServices.length === 0) return null;

  return (
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
  );
}

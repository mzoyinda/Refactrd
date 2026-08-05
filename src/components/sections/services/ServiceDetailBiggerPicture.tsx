import { ServiceDefinition } from "@/data/services";
import ServiceFrameworkDiagram from "@/components/sections/services/ServiceFrameworkDiagram";

export default function ServiceDetailBiggerPicture({ service }: { service: ServiceDefinition }) {
  const fit = service.fit;
  if (!fit) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
            The Bigger Picture
          </span>
          <h2 className="mt-2 mb-4 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight">
            {fit.heading}
          </h2>
          <div className="space-y-2">
            {fit.body.map((paragraph, i) => (
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
  );
}

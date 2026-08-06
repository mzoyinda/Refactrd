import { ServiceDefinition } from "@/data/services";
import ServiceFAQAccordion from "@/components/sections/services/ServiceFAQAccordion";

export default function ServiceDetailFAQ({ service }: { service: ServiceDefinition }) {
  const faqs = service.faqs;
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="section-padding bg-[#F9FAFC]">
      <div className="container-custom max-w-3xl">
        <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">FAQ</span>
        <h2 className="mt-2 mb-8 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight">
          Frequently Asked Questions
        </h2>
        <ServiceFAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}

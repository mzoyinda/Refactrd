import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServiceDetailHero from "@/components/sections/services/ServiceDetailHero";
import ServiceDetailChallenge from "@/components/sections/services/ServiceDetailChallenge";
import ServiceDetailCapabilities from "@/components/sections/services/ServiceDetailCapabilities";
import ServiceDetailOutcomes from "@/components/sections/services/ServiceDetailOutcomes";
import ServiceDetailBiggerPicture from "@/components/sections/services/ServiceDetailBiggerPicture";
import ServiceDetailRelated from "@/components/sections/services/ServiceDetailRelated";
import ServiceDetailCaseStudies from "@/components/sections/services/ServiceDetailCaseStudies";
import ServiceDetailFAQ from "@/components/sections/services/ServiceDetailFAQ";
import ServiceDetailFinalCTA from "@/components/sections/services/ServiceDetailFinalCTA";
import { getServiceBySlug } from "@/data/services";

const service = getServiceBySlug("ai-enabled-products")!;

export const metadata: Metadata = {
  title: `${service.title} | Refactrd`,
  description: service.outcome,
};

export default function AiEnabledProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServiceDetailHero service={service} />
      <ServiceDetailChallenge service={service} />
      <ServiceDetailCapabilities service={service} />
      <ServiceDetailOutcomes service={service} />
      <ServiceDetailBiggerPicture service={service} />
      <ServiceDetailRelated service={service} />
      <ServiceDetailCaseStudies service={service} />
      <ServiceDetailFAQ service={service} />
      <ServiceDetailFinalCTA service={service} />
      <Footer />
    </main>
  );
}

import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import FAQ from "@/components/sections/FAQ";

// Lazy load sections for performance
const ServicesHero = dynamic(() => import("@/components/sections/services/ServicesHero"), {
  loading: () => <div className="section-padding bg-secondary" />,
});

const WhoThisIsFor = dynamic(() => import("@/components/sections/WhoThisIsFor"), {
  loading: () => <div className="section-padding bg-white" />,
});

const HowToGetStarted = dynamic(() => import("@/components/sections/HowToGetStarted"), {
  loading: () => <div className="section-padding bg-tertiary/30" />,
});

export const metadata = {
  title: "Our Services | Refactrd - AI Engineering",
  description:
    "Refactrd delivers AI systems across four levels of engagement — from workflow automation to full AI architecture. Every engagement starts small and grows through results.",
  keywords: [
    "workflow automation",
    "AI assistants",
    "AI internal copilots",
    "AI features for products",
    "agentic workflow solutions",
    "AI operations",
  ],
  openGraph: {
    title: "Our Services | Refactrd",
    description:
      "End-to-end AI engineering services. We support teams across the full AI Engineering lifecycle.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServicesHero />
      <WhatWeDoSection />
      {/* <ServicesList /> */}
       <WhoThisIsFor />
       <HowToGetStarted />
      <FAQ/>
      <Footer />
    </main>
  );
}
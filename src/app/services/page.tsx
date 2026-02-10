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
  title: "Our Services | Refactrd - Software Development & Engineering",
  description:
    "End-to-end software development services including web applications, AI automation, DevOps, technical documentation, and delivery support. We take full ownership of your project.",
  keywords: [
    "software development services",
    "web application development",
    "AI automation",
    "DevOps services",
    "technical documentation",
    "software engineering",
  ],
  openGraph: {
    title: "Our Services | Refactrd",
    description:
      "End-to-end software development services. We support teams across the full engineering lifecycle.",
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
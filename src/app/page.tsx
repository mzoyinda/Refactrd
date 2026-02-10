import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
// import { HowItWorks } from "@/components/sections/HowItWorks";
import ProblemSection from "@/components/sections/ProblemSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import dynamic from "next/dynamic";

// Lazy load remaining sections
const ProofOfWork = dynamic(() => import("@/components/sections/ProofOfWork"), {
  loading: () => <div className="section-padding bg-tertiary/30" />,
});

const WhoThisIsFor = dynamic(() => import("@/components/sections/WhoThisIsFor"), {
  loading: () => <div className="section-padding bg-white" />,
});

const HowToGetStarted = dynamic(() => import("@/components/sections/HowToGetStarted"), {
  loading: () => <div className="section-padding bg-tertiary/30" />,
});

const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"), {
  loading: () => <div className="section-padding bg-secondary" />,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSection />
      <WhatWeDoSection />
      <ProofOfWork />
      <WhyChooseUs />
      <WhoThisIsFor />
      <HowToGetStarted />
      <FinalCTA />
      <Footer />
    </main>
  );
}
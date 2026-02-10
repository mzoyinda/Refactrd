import dynamic from "next/dynamic";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutHero from "@/components/sections/about/AboutHero";
import WhyWeExist from "@/components/sections/about/WhyWeExist";
import FAQ from "@/components/sections/FAQ";

const HowToGetStarted = dynamic(
  () => import("@/components/sections/HowToGetStarted"),
  {
    loading: () => <div className="section-padding bg-tertiary/30" />,
  },
);

export const metadata = {
  title: "About Us | Refactrd - Software Delivery Built on Trust",
  description:
    "Refactrd is a software delivery company built around one principle: software should be easy to trust, easy to understand, and built to last. Learn our story.",
  keywords: [
    "about Refactrd",
    "software delivery company",
    "engineering team",
    "software development partner",
  ],
  openGraph: {
    title: "About Refactrd | Our Story",
    description:
      "Built around one principle: software should be easy to trust, easy to understand, and built to last.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <WhyWeExist />
      <HowToGetStarted />
      <FAQ />
      <Footer />
    </main>
  );
}

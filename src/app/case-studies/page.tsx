import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CaseStudiesContent from "@/components/sections/CaseStudiesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Refactrd",
  description:
    "Real AI systems built for real operational problems. Read how Refactrd has helped startups, SMEs, and enterprises introduce AI that actually works.",
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CaseStudiesContent />
      <Footer />
    </main>
  );
}
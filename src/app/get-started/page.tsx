import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import GetStartedContent from "@/components/sections/get-started/GetStartedContent";

export const metadata: Metadata = {
  title: "Get Started | Refactrd",
  description:
    "Choose the path that matches where you are. Mini Consultation, Enterprise Consultation, ready to build, or the AI Startups Launchpad.",
};

export default function GetStartedPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <GetStartedContent />
      <Footer />
    </main>
  );
}
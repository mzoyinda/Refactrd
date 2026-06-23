import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import GetStartedContent from "@/components/sections/get-started/GetStartedContent";

export const metadata: Metadata = {
  title: "Find Your Starting Point | Refactrd",
  description:
    "Choose the engagement path that best matches your goals, challenges, and stage of AI adoption — Build & Implement, Opportunity Assessment, Executive Discovery, or the AI Startups Launchpad.",
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
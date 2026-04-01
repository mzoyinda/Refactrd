import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectsHero from "@/components/sections/projects/ProjectsHero";
import dynamic from "next/dynamic";
import FAQ from "@/components/sections/FAQ";

const HowToGetStarted = dynamic(() => import("@/components/sections/HowToGetStarted"), {
  loading: () => <div className="section-padding bg-tertiary/30" />,
});

const ProofOfWork = dynamic(() => import("@/components/sections/ProofOfWork"), {
  loading: () => <div className="section-padding bg-tertiary/30" />,
});

export const metadata = {
  title: "Our Projects | Refactrd — AI Engineering Studio",
  description:
    "Explore our portfolio of AI projects including intelligent systems, automation workflows, and technical solutions built with clarity and precision.",
  keywords: [
    "ai projects",
    "AI features for productss",
    "automation systems",
    "case studies",
    "portfolio",
  ],
  openGraph: {
    title: "Our Projects | Refactrd — AI Engineering Studio",
    description:
      "A selection of AI systems, automation workflows, and intelligent product features delivered by Refactrd. See how we introduce AI in a focused, practical way.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ProjectsHero />
      {/* <ProjectsGrid/> */}
      <ProofOfWork />
      <HowToGetStarted />
      <FAQ/>
      {/* Add ProjectsGrid component here later */}
      <Footer />
    </main>
  );
}
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectsHero from "@/components/sections/projects/ProjectsHero";
import ProjectsGrid from "@/components/sections/projects/ProjectsGrid";
import dynamic from "next/dynamic";
import FAQ from "@/components/sections/FAQ";

const HowToGetStarted = dynamic(() => import("@/components/sections/HowToGetStarted"), {
  loading: () => <div className="section-padding bg-tertiary/30" />,
});

export const metadata = {
  title: "Our Projects | Refactrd - Software Delivery Portfolio",
  description:
    "Explore our portfolio of software projects including web applications, automation systems, and technical solutions built with clarity and precision.",
  keywords: [
    "software projects",
    "web applications",
    "automation systems",
    "case studies",
    "portfolio",
  ],
  openGraph: {
    title: "Our Projects | Refactrd Portfolio",
    description:
      "Building reliable software, systems & automation. Explore our work.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ProjectsHero />
      <ProjectsGrid/>
      <HowToGetStarted />
      <FAQ/>
      {/* Add ProjectsGrid component here later */}
      <Footer />
    </main>
  );
}
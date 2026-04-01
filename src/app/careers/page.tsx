import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CareersHero from "@/components/sections/careers/CareersHero";
import OpenPositions from "@/components/sections/careers/OpenPositions";
import WhyWorkHere from "@/components/sections/careers/WhyWorkHere";


export const metadata = {
  title: "Careers | Join Refactrd - AI Engineering Opportunities",
  description:
    "Join our team of talented AI engineers building reliable AI products and systems. Explore career opportunities at Refactrd including internships and full-time positions.",
  keywords: [
    "careers",
    "jobs",
    "AI engineering careers",
    "sales intern",
    "ai engineering jobs",
    "remote jobs",
    "tech careers",
  ],
  openGraph: {
    title: "Careers at Refactrd",
    description:
      "Build your career with us. Work on meaningful projects, grow your skills, and make an impact.",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <CareersHero />
      <WhyWorkHere />
      <OpenPositions />
      <Footer />
    </main>
  );
}
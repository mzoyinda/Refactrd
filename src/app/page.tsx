import Footer from "@/components/layout/Footer";
import { FAQ } from "@/components/sections/FAQ";
import { FreelanceCTA } from "@/components/sections/FreelanceCTA";
import { GlobalOpportunities } from "@/components/sections/GlobalOpportunites";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TalentShowcase } from "@/components/sections/TalentShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustedCompanies } from "@/components/sections/TrustedCompanies";


export default function LandingPage() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <TrustedCompanies/>
        <TalentShowcase/>
        <GlobalOpportunities/>
        <HowItWorks/>
        <FreelanceCTA/>
        <Testimonials/>
        <FAQ/>
      </main>
      <Footer />
    </>
  );
}
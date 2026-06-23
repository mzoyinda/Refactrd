import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StartupsLaunchpadHero from "@/components/sections/startups-launchpad/StartupsLaunchpadHero";
import WhoThisIsFor from "@/components/sections/startups-launchpad/WhoThisIsFor";
import LaunchpadTimeline from "@/components/sections/startups-launchpad/LaunchpadTimeline";
import Pricing from "@/components/sections/startups-launchpad/Pricing";
import HowApplicationsWork from "@/components/sections/startups-launchpad/HowApplicationsWork";
import LaunchpadFAQ from "@/components/sections/startups-launchpad/LaunchpadFAQ";
import LaunchpadCTA from "@/components/sections/startups-launchpad/LaunchpadCTA";

export default function StartupsLaunchpadPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <StartupsLaunchpadHero />
      <WhoThisIsFor />
      <LaunchpadTimeline />
      <Pricing />
      <HowApplicationsWork />
      <LaunchpadFAQ />
      <LaunchpadCTA />
      <Footer />
    </main>
  );
}

"use client";

import { useEffect } from "react";
import StartupsLaunchpadHero from "@/components/sections/startups-launchpad/StartupsLaunchpadHero";
import HowItWorks from "@/components/sections/startups-launchpad/HowItWorks";
import WhoThisIsFor from "@/components/sections/startups-launchpad/WhoThisIsFor";
import WhatYouGet from "@/components/sections/startups-launchpad/WhatYouGet";
import Pricing from "@/components/sections/startups-launchpad/Pricing";
import LaunchpadFAQ from "@/components/sections/startups-launchpad/LaunchpadFAQ";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function StartupsLaunchpadPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <StartupsLaunchpadHero />
      <WhoThisIsFor />
      <WhatYouGet />
      <HowItWorks />
      <Pricing />
      <LaunchpadFAQ />
      <Footer />

      <style jsx global>{`
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scroll-reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </main>
  );
}

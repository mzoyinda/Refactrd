"use client";

import { useEffect } from "react";
import ImplementationHero from "@/components/sections/implementation/ImplementationHero";
import VideoDemo from "@/components/sections/implementation/VideoDemo";
import TheOffer from "@/components/sections/implementation/TheOffer";
import AIRoles from "@/components/sections/implementation/AIRoles";
import BuildPaths from "@/components/sections/implementation/BuildPaths";
import Security from "@/components/sections/implementation/Security";
import Process from "@/components/sections/implementation/Process";
import POC from "@/components/sections/implementation/POC";
import FAQ from "@/components/sections/implementation/ImplementationFAQ";
import FinalCTA from "@/components/sections/implementation/FinalCTA";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ImplementationProgramPage() {
  // Intersection Observer for scroll animations
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

      {/* All Sections */}
      <ImplementationHero />
      {/* <VideoDemo /> */}
      {/* <TheOffer />
      <AIRoles />
      <BuildPaths />
      <Security />
      <Process />
      <POC />
      <FAQ />
      <FinalCTA /> */}

      <Footer />

      {/* Global Scroll Reveal Styles */}
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { trackCTAClick } from "@/lib/analytics";
import { trackNavigation } from "@/lib/analytics";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Refactrd Home"
              className="relative z-50 flex items-center"
            >
              <Image
                src="/images/refactrd-logo.png"
                alt="Refactrd"
                width={320}
                height={50}
                priority
                className="h-32 md:h-36 lg:h-40 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              <Link
                href="/"
                onClick={() => trackNavigation("home", "/")}
                className="text-secondary font-clash font-semibold text-[16px] transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/approach"
                onClick={() => trackNavigation("approach", "/approach")}
                className="text-secondary font-clash font-semibold text-[16px] transition-colors duration-200 relative group"
              >
                Approach
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/services"
                onClick={() => trackNavigation("services", "/services")}
                className="text-secondary font-clash font-semibold text-[16px] transition-colors duration-200 relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/case-studies"
                onClick={() => trackNavigation("case_studies", "/case-studies")}
                className="text-secondary font-clash font-semibold text-[16px] transition-colors duration-200 relative group"
              >
                Case Studies
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/insights"
                onClick={() => trackNavigation("insights", "/insights")}
                className="text-secondary font-clash font-semibold text-[16px] transition-colors duration-200 relative group"
              >
               Insights
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/careers"
                onClick={() => trackNavigation("careers", "/careers")}
                className="text-secondary font-clash font-semibold text-[16px] transition-colors duration-200 relative group"
              >
                Careers
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/get-started"
                onClick={() => trackCTAClick("header_find_starting_point", "/get-started")}
                className="inline-flex items-center justify-center px-7 py-3 bg-secondary text-white rounded-full font-clash font-semibold text-[15px] hover:bg-[#A2D2FF] hover:text-secondary  transition-all duration-300 hover:scale-105 hover:shadow-lg"
                
              >
                Find Your Starting Point
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-secondary hover:bg-tertiary transition-colors duration-200 relative z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-[70] lg:hidden overflow-y-auto animate-slide-in-right">
            <div className="p-6">
              {/* Close button */}
              <div className="h-20 flex items-center justify-end mb-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-tertiary transition-colors"
                >
                  <X className="w-6 h-6 text-secondary" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("home_mobile", "/");
                    setMobileMenuOpen(false);
                  }}
                >
                  Home
                </Link>

                <Link
                  href="/approach"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("approach_mobile", "/approach");
                    setMobileMenuOpen(false);
                  }}
                >
                  Approach
                </Link>

                <Link
                  href="/services"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("services_mobile", "/services");
                    setMobileMenuOpen(false);
                  }}
                >
                  Services
                </Link>

                <Link
                  href="/case-studies"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("case_studies_mobile", "/case-studies");
                    setMobileMenuOpen(false);
                  }}
                >
                  Case Studies
                </Link>

                <Link
                  href="/insights"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("insights", "/insights");
                    setMobileMenuOpen(false);
                  }}
                >
                 Insights
                </Link>

                <Link
                  href="/careers"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("careers_mobile", "/careers");
                    setMobileMenuOpen(false);
                  }}
                >
                  Careers
                </Link>
              </div>

              {/* CTA Button */}
              <div className="mt-6 pt-6 border-t border-tertiary">
                <Link
                  href="/get-started"
                  className="block w-full text-center px-7 py-4 bg-secondary text-white rounded-full font-clash font-semibold transition-all duration-300"
                  onClick={() => {
                    trackCTAClick("header_find_starting_point_mobile", "/get-started");
                    setMobileMenuOpen(false);
                  }}
                >
                  Find Your Starting Point
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
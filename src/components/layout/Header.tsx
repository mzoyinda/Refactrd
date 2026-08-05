
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { trackCTAClick } from "@/lib/analytics";
import { trackNavigation } from "@/lib/analytics";
import { services } from "@/data/services";

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

              <div className="relative group">
                <Link
                  href="/services"
                  onClick={() => trackNavigation("services", "/services")}
                  className="flex items-center gap-1 text-secondary font-clash font-semibold text-[16px] transition-colors duration-200 relative"
                >
                  Services
                  <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
                </Link>

                {/* Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-[#E2E8F0] py-2 min-w-[260px]">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => trackNavigation(`services_${service.slug}`, `/services/${service.slug}`)}
                        className="block px-4 py-3 hover:bg-tertiary/40 transition-colors duration-150"
                      >
                        <span className="font-clash font-semibold text-sm text-secondary">
                          {service.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

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
                href="/contact"
                onClick={() => trackCTAClick("header_talk_with_refactrd", "/contact")}
                className="inline-flex items-center justify-center px-7 py-3 bg-secondary text-white rounded-full font-clash font-semibold text-[15px] hover:bg-[#A2D2FF] hover:text-secondary  transition-all duration-300 hover:scale-105 hover:shadow-lg"

              >
               Contact
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

                <div className="ml-4 border-l-2 border-tertiary pl-2 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block px-4 py-2.5 text-secondary/70 font-clash font-medium text-[14px] hover:bg-tertiary hover:text-secondary rounded-lg transition-colors duration-200"
                      onClick={() => {
                        trackNavigation(`services_${service.slug}_mobile`, `/services/${service.slug}`);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>

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
                  href="/contact"
                  className="block w-full text-center px-7 py-4 bg-secondary text-white rounded-full font-clash font-semibold transition-all duration-300"
                  onClick={() => {
                    trackCTAClick("header_talk_with_refactrd_mobile", "/contact");
                    setMobileMenuOpen(false);
                  }}
                >
                 Contact
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
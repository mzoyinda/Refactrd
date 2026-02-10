"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const services = [
  { name: "Website Development", href: "/services/website" },
  { name: "Application Development", href: "/services/application" },
  { name: "AI and Automation", href: "/services/ai-automation" },
  { name: "DevOps and Infrastructure", href: "/services/devops" },
  { name: "Technical Documentation", href: "/services/documentation" },
  { name: "Delivery Support", href: "/services/delivery-support" },
];

const company = [
  { name: "About us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
  { name: "Case Studies", href: "/case-studies" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
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
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Refactrd Home"
            className="z-50 flex items-center"
          >
            <Image
              src="/images/refactrd-logo.png"
              alt="Refactrd logo"
              width={320}
              height={70}
              priority
              className=" w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-secondary font-jakarta font-medium hover:text-accent transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="text-secondary font-jakarta font-medium hover:text-accent transition-colors duration-200 flex items-center gap-1 group">
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Services Dropdown Menu */}
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-tertiary overflow-hidden animate-fade-in">
                  <div className="py-2">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        href={service.href}
                        className="block px-6 py-3 text-secondary hover:bg-tertiary hover:text-accent transition-colors duration-200"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button className="text-secondary font-jakarta font-medium hover:text-accent transition-colors duration-200 flex items-center gap-1 group">
                Company
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${companyOpen ? "rotate-180" : ""}`}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Company Dropdown Menu */}
              {companyOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-tertiary overflow-hidden animate-fade-in">
                  <div className="py-2">
                    {company.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-6 py-3 text-secondary hover:bg-tertiary hover:text-accent transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/projects"
              className="text-secondary font-jakarta font-medium hover:text-accent transition-colors duration-200 relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-6 py-3"
            >
              Book a Call
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

        {/* Mobile Navigation - Sidebar from Right */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto animate-slide-in-right">
              <div className="p-6">
                {/* Close button area - spacing */}
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
                    className="block px-4 py-3 text-secondary font-jakarta font-medium hover:bg-tertiary rounded-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>

                  {/* Services Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 text-secondary font-jakarta font-medium hover:bg-tertiary rounded-lg transition-colors duration-200"
                    >
                      Services
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="ml-4 mt-1 space-y-1 animate-fade-in">
                        {services.map((service) => (
                          <Link
                            key={service.name}
                            href={service.href}
                            className="block px-4 py-2 text-sm text-secondary/80 hover:text-accent hover:bg-tertiary/50 rounded-lg transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Company Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 text-secondary font-jakarta font-medium hover:bg-tertiary rounded-lg transition-colors duration-200"
                    >
                      Company
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${mobileCompanyOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileCompanyOpen && (
                      <div className="ml-4 mt-1 space-y-1 animate-fade-in">
                        {company.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-secondary/80 hover:text-accent hover:bg-tertiary/50 rounded-lg transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link
                    href="/projects"
                    className="block px-4 py-3 text-secondary font-jakarta font-medium hover:bg-tertiary rounded-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projects
                  </Link>
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-6 border-t border-tertiary">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book a Call
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

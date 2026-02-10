"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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
              alt="Refactrd"
              width={320}
              height={50}
              priority
              className="h-44 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link
              href="/"
              className="text-secondary font-clash font-semibold text-[16px] hover:text-accent transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/about"
              className="text-secondary font-clash font-semibold text-[16px] hover:text-accent transition-colors duration-200 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/services"
              className="text-secondary font-clash font-semibold text-[16px] hover:text-accent transition-colors duration-200 relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/projects"
              className="text-secondary font-clash font-semibold text-[16px] hover:text-accent transition-colors duration-200 relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3 bg-secondary text-white rounded-full font-clash font-semibold text-[15px] hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
                    className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>

                  <Link
                    href="/about"
                    className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>

                  <Link
                    href="/services"
                    className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </Link>

                  <Link
                    href="/projects"
                    className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Projects
                  </Link>
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-6 border-t border-tertiary">
                  <Link
                    href="/contact"
                    className="block w-full text-center px-7 py-4 bg-secondary text-white rounded-full font-clash font-semibold hover:bg-accent transition-all duration-300"
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
"use client";

import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";

const services = [
  { name: "Workflow Automation", href: "/services" },
  {
    name: "AI Assistants",
    href: "/services",
  },
  { name: "Product AI Features", href: "/services" },
  {
    name: "Agentic Workflows",
    href: "/services",
  },
  {
    name: "AI Operations",
    href: "/services",
  },
];

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/refactrd",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/refactrdhq/",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container-custom py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Navigation Links (2 columns) */}
          <div className="lg:col-span-6 grid md:grid-cols-2 gap-12">
            {/* Column 1: Quick Links */}
            <div>
              <h3 className="font-clash font-bold text-xl mb-6 text-white">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="font-clash text-white/70 hover:text-[#E6EAF0]transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent/0 group-hover:bg-accent rounded-full transition-colors duration-200" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="font-clash text-white/70 hover:text-[#E6EAF0]transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent/0 group-hover:bg-accent rounded-full transition-colors duration-200" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="font-clash text-white/70 hover:text-[#E6EAF0]transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent/0 group-hover:bg-accent rounded-full transition-colors duration-200" />
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" font-clash text-[#E6EAF0]font-semibold hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent/0 group-hover:bg-accent rounded-full transition-colors duration-200" />
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://cal.com/refactrd/technical-discovery-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" font-clash text-[#E6EAF0]font-semibold hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent/0 group-hover:bg-accent rounded-full transition-colors duration-200" />
                    Book a Free AI Mapping Call
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="font-clash font-bold text-xl mb-6 text-white">
                Services
              </h3>
              <ul className="space-y-4">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="font-clash text-white/70 hover:text-accent transition-colors duration-200  inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-accent/0 group-hover:bg-accent rounded-full transition-colors duration-200" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Newsletter + Social */}
          <div className="lg:col-span-6 space-y-8">
            {/* Newsletter Card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-accent/30 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-1">
                  <h3 className="text-3xl font-clash font-bold mb-2">
                    Newsletter
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-jakarta">
                    Let's come together and actively participate in the
                    transformative changes taking place.
                  </p>
                </div>
                <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✱</span>
                </div>
              </div>
              <a
                href="https://refactrd.substack.com/subscribe?params=%5Bobject%20Object%5D"
                target="_blank"
                rel="noopener noreferrer"
                className="font-clash group inline-flex items-center gap-3 w-full px-6 py-4 bg-white text-secondary rounded-xl  font-bold hover:bg-accent hover:text-white transition-all duration-300 hover:scale-[1.02] justify-between shadow-lg hover:shadow-xl"
              >
                <span>Subscribe on Substack</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-clash font-semibold text-sm text-white/60 mb-4 uppercase tracking-wider">
                Connect With Us
              </h4>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-5 py-3 bg-white/5 hover:bg-accent/20 border border-white/10 hover:border-accent/50 rounded-xl transition-all duration-300 hover:scale-105"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-accent transition-colors duration-300" />
                      <span className="font-clash text-sm font-medium text-white/70 group-hover:text-white transition-colors duration-300">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <p className="text-white/60 text-sm font-montserrat">
                © {currentYear} Refactrd. All rights reserved.
              </p>
            </div>

           
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </footer>
  );
}

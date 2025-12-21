// src/components/layout/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaLinkedinIn, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const footerLinks = {
    forClients: [
      { name: "How to Hire", href: "/contact" },
      { name: "Talent Marketplace", href: "/contact" },
    //   { name: "Project Catalog", href: "/contact" },
    //   { name: "Enterprise", href: "/contact" },
    //   { name: "Contract-to-Hire", href: "/contact" },
    ],
    forTalent: [
      { name: "How to Find Work", href: "/contact" },
      { name: "Direct Contracts", href: "/contact" },
    ],
    company: [
    //   { name: "Our Story", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ & Support", href: "/#faq" },
    //   { name: "Blog", href: "/blog" },
    //   { name: "Careers", href: "/careers" },
    ],
  };

  const socialLinks = [
    { name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com" },
    { name: "Twitter", icon: <FaTwitter />, href: "https://twitter.com" },
    { name: "Instagram", icon: <FaInstagram />, href: "https://instagram.com" },
    { name: "GitHub", icon: <FaGithub />, href: "https://github.com" },
  ];

  const legalLinks = [
    { name: "Terms and Conditions", href: "/" },
    { name: "Privacy Policy", href: "/" },
    { name: "Cookie Policy", href: "/" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white lg:mx-20 lg:rounded-lg lg:mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4">{SITE_NAME}</h3>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              The world's work marketplace for freelancers and businesses.
              Connect with top talent or find your next opportunity.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>info@refactrd.com</span>
              </div>
              {/* <div className="flex items-center space-x-3 text-gray-400">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+1 (866) 123-4567</span>
              </div> */}
              {/* <div className="flex items-center space-x-3 text-gray-400">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>San Francisco, CA</span>
              </div> */}
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="font-semibold text-lg mb-4">For Clients</h4>
            <ul className="space-y-3">
              {footerLinks.forClients.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Talent */}
          <div>
            <h4 className="font-semibold text-lg mb-4">For Talent</h4>
            <ul className="space-y-3">
              {footerLinks.forTalent.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="border-t border-gray-700 pt-12 mb-12">
          <div className="max-w-2xl">
            <h4 className="text-2xl font-bold mb-2">Stay in the loop</h4>
            <p className="text-gray-400 mb-6">
              Get updates about new features and opportunities
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center sm:w-14 sm:h-14"
                aria-label="Subscribe to newsletter"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright & Legal Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-400">
              <span>
                © {currentYear} {SITE_NAME}. Copyright and rights reserved
              </span>
              <div className="flex items-center space-x-4">
                {legalLinks.map((link, index) => (
                  <span key={link.name} className="flex items-center">
                    {index > 0 && <span className="mr-4">•</span>}
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight, Mail } from "lucide-react";

/* ─── nav data ─────────────────────────────────────── */

const explore = [
  { name: "Home", href: "/" },
  { name: "Approach", href: "/approach" },
  { name: "Services", href: "/services" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Insights", href: "/insights" },
  { name: "Careers", href: "/careers" },
];

const services = [
  { name: "Workflow Transformation", href: "/services" },
  { name: "Knowledge Systems & AI Assistants", href: "/services" },
  { name: "Intelligent Operations", href: "/services" },
  { name: "AI-Enabled Products", href: "/services" },
];

/* ─── link component ────────────────────────────────── */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group inline-flex items-start gap-2 font-jakarta text-[14px] text-white/55 hover:text-white transition-colors duration-200 leading-snug"
      >
        <span className="mt-[7px] w-1 h-1 rounded-full bg-white/20 group-hover:bg-[#A2D2FF] flex-shrink-0 transition-colors duration-200" />
        {children}
      </Link>
    </li>
  );
}

/* ─── footer ────────────────────────────────────────── */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1F2A44] text-white relative">

      {/* ── Thin gradient top border ── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#A2D2FF]/30 to-transparent" />

      {/* ══════════════════════════════════════
          TOP GRID — brand + 3 nav columns
      ══════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-14 lg:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1.4fr] gap-12 lg:gap-10">

          {/* ── Brand column ── */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-6">
            {/* Wordmark */}
            <Link href="/" className="inline-block">
              <span className="font-clash font-extrabold text-2xl text-white tracking-tight">
                Refactrd
              </span>
            </Link>

            {/* Tagline */}
            <p className="font-jakarta text-[14px] text-white/55 leading-relaxed max-w-[260px]">
              Helping organizations move from AI experimentation to operational adoption.
            </p>

            {/* Email contact */}
            <div>
              <p className="font-clash font-semibold text-[10px] uppercase tracking-[0.14em] text-white/35 mb-2">
                For Enquiries
              </p>
              <a
                href="mailto:info@refactrd.com"
                className="group inline-flex items-center gap-2 font-jakarta text-[14px] text-[#A2D2FF] hover:text-white transition-colors duration-200"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@refactrd.com
              </a>
            </div>
          </div>

          {/* ── Explore ── */}
          <div>
            <h3 className="font-clash font-bold text-[13px] uppercase tracking-[0.14em] text-white/40 mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {explore.map((l) => <NavLink key={l.name} href={l.href}>{l.name}</NavLink>)}
            </ul>
          </div>

          {/* ── Services ── */}
          <div>
            <h3 className="font-clash font-bold text-[13px] uppercase tracking-[0.14em] text-white/40 mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((l) => <NavLink key={l.name} href={l.href}>{l.name}</NavLink>)}
            </ul>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          NEWSLETTER STRIP
      ══════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pb-10">
        <div className="rounded-2xl bg-white/[0.06] border border-white/10 px-7 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
          {/* Text */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#A2D2FF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[#A2D2FF] text-lg leading-none">✱</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-clash font-bold text-[18px] text-white mb-1">Newsletter</h3>
              <p className="font-jakarta text-[13px] text-white/50 leading-relaxed">
                Lessons, frameworks, and observations from helping organizations move from AI experimentation to operational adoption.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://refactrd.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-between gap-3 flex-shrink-0 bg-white text-[#1F2A44] hover:bg-[#A2D2FF] px-6 py-3.5 rounded-xl font-clash font-bold text-sm transition-all duration-300 hover:shadow-xl sm:min-w-[220px]"
          >
            Subscribe on Substack
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM BAR — copyright + social
      ══════════════════════════════════════ */}
      <div className="border-t border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="font-jakarta text-[13px] text-white/35 order-2 sm:order-1">
            © {year} Refactrd. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex items-center gap-3 order-1 sm:order-2">
            <span className="font-clash text-[11px] uppercase tracking-[0.14em] text-white/30 mr-1 hidden sm:inline">
              Connect
            </span>
            {[
              { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/refactrd" },
              { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/refactrdhq/" },
            ].map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-[#A2D2FF]/15 border border-white/10 hover:border-[#A2D2FF]/30 transition-all duration-200"
              >
                <Icon className="w-4 h-4 text-white/45 group-hover:text-[#A2D2FF] transition-colors duration-200" />
                <span className="font-clash text-[13px] text-white/45 group-hover:text-white transition-colors duration-200">
                  {name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

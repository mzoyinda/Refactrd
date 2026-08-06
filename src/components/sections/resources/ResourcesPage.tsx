"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { X, Download, ExternalLink, ArrowRight, BookOpen, FileText, Layers } from "lucide-react";

// ── RESOURCE DATA ─────────────────────────────────────────
// Add your Google Drive direct-download links here.
// For Google Drive: share file → "Anyone with link can view"
// Preview URL: https://drive.google.com/file/d/FILE_ID/preview
// Download URL: https://drive.google.com/uc?export=download&id=FILE_ID

interface Resource {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "Playbook" | "Template" | "Framework" | "Guide";
  pages?: number;
  previewUrl: string;   // Google Drive embed URL
  downloadUrl: string;  // Google Drive download URL
  badge?: string;       // Optional highlight badge e.g. "New" or "Most Downloaded"
}

const RESOURCES: Resource[] = [
  {
    id: "responsible-ai-playbook",
    title: "Responsible AI Playbook for Legal Firms",
    subtitle: "Governance · Risk · Compliance",
    description:
      "A practical playbook for legal firms navigating AI adoption — covering governance frameworks, risk assessment, client communication protocols, and internal compliance structures. Designed for partners and operations leads.",
    category: "Playbook",
    pages: 24,
    previewUrl: "https://drive.google.com/file/d/1eixAa60ogI_e4evHBW5ASp8lxw0NGLJI/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1eixAa60ogI_e4evHBW5ASp8lxw0NGLJI",
    badge: "Featured",
  },
  // {
  //   id: "ai-ops-template",
  //   title: "AI Operations Assessment Template",
  //   subtitle: "Process Audit · Workflow Mapping",
  //   description:
  //     "A structured template for auditing your current operations and identifying where AI can reduce friction, automate repetitive tasks, and create measurable business impact.",
  //   category: "Template",
  //   pages: 12,
  //   previewUrl: "https://drive.google.com/file/d/YOUR_FILE_ID_2/preview",
  //   downloadUrl: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_2",
  // },
  // {
  //   id: "ai-readiness-framework",
  //   title: "AI Readiness Framework",
  //   subtitle: "Org Assessment · Maturity Model",
  //   description:
  //     "Evaluate your organization's readiness to adopt AI across five key dimensions: data infrastructure, team capability, process maturity, leadership alignment, and cultural readiness.",
  //   category: "Framework",
  //   pages: 18,
  //   previewUrl: "https://drive.google.com/file/d/YOUR_FILE_ID_3/preview",
  //   downloadUrl: "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID_3",
  //   badge: "New",
  // },
];

// ── CATEGORY CONFIG ────────────────────────────────────────
const CATEGORY_CONFIG = {
  Playbook: { icon: BookOpen, color: "#A2D2FF", bg: "bg-[#A2D2FF]/15", text: "text-[#1F2A44]" },
  Template: { icon: FileText, color: "#0e5d7d", bg: "bg-[#0e5d7d]/10", text: "text-[#0e5d7d]" },
  Framework: { icon: Layers, color: "#5B6CFF", bg: "bg-[#5B6CFF]/10", text: "text-[#5B6CFF]" },
  Guide: { icon: BookOpen, color: "#64748B", bg: "bg-[#64748B]/10", text: "text-[#64748B]" },
};

// ── MODAL ──────────────────────────────────────────────────
function ResourceModal({
  resource,
  onClose,
}: {
  resource: Resource;
  onClose: () => void;
}) {
  const cfg = CATEGORY_CONFIG[resource.category];
  const Icon = cfg.icon;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end">
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel - slides in from right */}
      <div className="relative z-10 flex flex-col w-full max-w-3xl bg-white shadow-2xl animate-slide-in-right overflow-hidden">

        {/* Panel Header */}
        <div className="flex-shrink-0 bg-[#1F2A44] px-8 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-clash font-bold uppercase tracking-widest mb-3 ${cfg.bg} ${cfg.text}`}>
                <Icon className="w-3 h-3" />
                {resource.category}
              </div>
              <h2 className="font-clash font-bold text-white text-xl lg:text-2xl leading-snug mb-1">
                {resource.title}
              </h2>
              <p className="font-jakarta text-white/50 text-sm">{resource.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="flex-shrink-0 bg-[#0d1e35] border-b border-[#1F2A44]/30">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={resource.previewUrl}
              className="absolute inset-0 w-full h-full"
              allow="autoplay"
              title={resource.title}
            />
          </div>
        </div>

        {/* Description + Actions */}
        <div className="flex-1 overflow-y-auto px-8 py-7">
          <p className="font-jakarta text-[#475569] text-[15px] leading-relaxed mb-8">
            {resource.description}
          </p>

          {resource.pages && (
            <div className="flex items-center gap-2 mb-8">
              <span className="w-6 h-px bg-[#E2E8F0]" />
              <span className="font-clash font-semibold text-[11px] text-[#94A3B8] uppercase tracking-widest">
                {resource.pages} pages
              </span>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="flex-shrink-0 px-8 py-5 border-t border-[#E2E8F0] bg-white">
          <div className="flex items-center gap-3">
            <a
              href={resource.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-sm transition-all duration-300 hover:bg-[#263352] hover:shadow-lg group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
              Download Free
            </a>
            <a
              href={resource.previewUrl.replace("/preview", "/view")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3.5 border-2 border-[#E2E8F0] text-[#64748B] rounded-xl font-clash font-semibold text-sm hover:border-[#1F2A44] hover:text-[#1F2A44] transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </a>
          </div>
          <p className="font-jakarta text-xs text-[#94A3B8] text-center mt-3">
            No sign-up required. Free to download and share.
          </p>
        </div>
      </div>
    </div>
  );
}

// ── RESOURCE CARD ──────────────────────────────────────────
function ResourceCard({
  resource,
  index,
  onPreview,
}: {
  resource: Resource;
  index: number;
  onPreview: (r: Resource) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const cfg = CATEGORY_CONFIG[resource.category];
  const Icon = cfg.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative bg-white rounded-2xl border border-[#E2E8F0] hover:border-[#1F2A44] hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms`, transitionDuration: "600ms" }}
    >
      {/* Category stripe at top */}
      <div
        className="h-1 w-full flex-shrink-0"
        style={{ backgroundColor: cfg.color }}
      />

      {/* Badge */}
      {resource.badge && (
        <div className="absolute top-5 right-5 z-10">
          <span className={`px-2.5 py-1 text-[10px] font-clash font-bold rounded-full uppercase tracking-widest ${
            resource.badge === "New"
              ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/20"
              : "bg-[#A2D2FF]/25 text-[#1F2A44] border border-[#A2D2FF]/40"
          }`}>
            {resource.badge}
          </span>
        </div>
      )}

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-7">
        {/* Category pill */}
        <div className={`inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full text-[10px] font-clash font-bold uppercase tracking-widest mb-5 ${cfg.bg} ${cfg.text}`}>
          <Icon className="w-3 h-3" />
          {resource.category}
        </div>

        {/* Title */}
        <h3 className="font-clash font-bold text-[#1F2A44] text-lg leading-snug mb-2 group-hover:text-[#0e5d7d] transition-colors duration-300">
          {resource.title}
        </h3>

        {/* Subtitle */}
        <p className="font-clash font-semibold text-[11px] text-[#94A3B8] uppercase tracking-widest mb-4">
          {resource.subtitle}
        </p>

        {/* Description */}
        <p className="font-jakarta text-sm text-[#64748B] leading-relaxed flex-1 line-clamp-3">
          {resource.description}
        </p>

        {/* Page count */}
        {resource.pages && (
          <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-[#F4F6F9]">
            <span className="w-4 h-px bg-[#E2E8F0]" />
            <span className="font-clash font-semibold text-[11px] text-[#94A3B8] uppercase tracking-wider">
              {resource.pages} pages
            </span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="flex-shrink-0 px-7 pb-6 flex items-center gap-3">
        <button
          onClick={() => onPreview(resource)}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-sm transition-all duration-300 hover:shadow-md group/btn"
        >
          Preview & Download
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}

// ── PAGE ───────────────────────────────────────────────────
export default function ResourcesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const categories = ["All", ...Array.from(new Set(RESOURCES.map((r) => r.category)))];

  const filtered = activeFilter === "All"
    ? RESOURCES
    : RESOURCES.filter((r) => r.category === activeFilter);

  return (
    <main className="min-h-screen">
      <Header />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative bg-[#1F2A44] overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(162,210,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(162,210,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* Giant watermark word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
          <span
            className="font-clash font-bold text-white leading-none"
            style={{ fontSize: "clamp(8rem, 25vw, 22rem)", opacity: 0.03, letterSpacing: "-0.04em" }}
          >
            RESOURCES
          </span>
        </div>

        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#A2D2FF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5B6CFF]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className={`mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="inline-flex items-center gap-2.5 font-clash font-bold text-[10px] uppercase tracking-[0.22em] text-[#A2D2FF]/60">
                <span className="w-6 h-px bg-[#A2D2FF]/40" />
                Free Resources from Refactrd
              </span>
            </div>

            {/* Headline */}
            <h1 className={`font-clash font-bold text-white leading-[1.05] tracking-tight mb-8 transition-all duration-700 delay-100 text-[40px] sm:text-[52px] lg:text-[64px] ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Tools and frameworks<br />
              <span className="text-[#A2D2FF]">we actually use</span><br />
              in client work.
            </h1>

            {/* Sub */}
            <p className={`font-jakarta text-white/55 text-[15px] lg:text-base leading-relaxed max-w-xl transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              Playbooks, templates, and frameworks distilled from real AI engineering engagements. No forms. No sign-ups. Just download and use.
            </p>

            {/* Count strip */}
            <div className={`flex items-center gap-6 mt-10 pt-8 border-t border-white/10 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
              {[
                { label: "Resources Available", value: RESOURCES.length },
                { label: "Always Free", value: "100%" },
                { label: "No Sign-Up", value: "Ever" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-clash font-bold text-white text-2xl">{stat.value}</span>
                  <span className="font-jakarta text-white/40 text-xs mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-[64px] lg:top-[80px] z-30">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest mr-1">
              Filter
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full font-clash font-semibold text-sm transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-[#1F2A44] text-white"
                    : "bg-[#F4F6F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#1F2A44]"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className={`ml-1.5 text-[10px] ${activeFilter === cat ? "text-white/50" : "text-[#94A3B8]"}`}>
                    {RESOURCES.filter((r) => r.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <section className="bg-[#F4F6F9] py-16 md:py-20">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-[#E2E8F0] rounded-2xl">
              <p className="font-clash font-bold text-[#1F2A44] text-xl mb-2">No resources in this category yet</p>
              <p className="font-jakarta text-[#94A3B8] text-sm">Check back soon.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((resource, index) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  index={index}
                  onPreview={setActiveResource}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="bg-white border-t border-[#E2E8F0] py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest mb-4">
            Need More Than A Framework?
            </p>
            <h2 className="font-clash font-bold text-[#1F2A44] text-2xl lg:text-3xl mb-4 leading-snug">
            We'll help you apply these ideas inside your organization.
            </h2>
            <p className="font-jakarta text-[#64748B] text-sm leading-relaxed mb-8 max-w-lg mx-auto">
              These resources cover the foundations. We go deeper in our consulting engagements - building tailored systems, not just frameworks.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            >
              Talk With Refactrd
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── MODAL ── */}
      {activeResource && (
        <ResourceModal
          resource={activeResource}
          onClose={() => setActiveResource(null)}
        />
      )}
    </main>
  );
}
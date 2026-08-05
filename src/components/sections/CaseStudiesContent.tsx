"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { cmsSupabase } from "@/lib/cms-supabase";
import { ArrowRight, Search, X, ChevronRight, Loader2, ChevronLeft } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  excerpt: string;
  results: string;
  tags: string[];
  featured_image_url: string | null;
  view_count: number;
}

const ITEMS_PER_PAGE = 6;

const FALLBACK_FILTERS = [
  "All",
  "Workflow Automation",
  "AI Assistants",
  "Product AI",
  "Agentic Systems",
  "Fintech",
  "Legal",
  "E-commerce",
  "Sales",
];

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function CaseStudiesContent() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { fetchCaseStudies(); }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await cmsSupabase
        .from("case_studies")
        .select("id, title, slug, client_name, industry, excerpt, results, tags, featured_image_url, view_count")
        .eq("status", "published")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    caseStudies.forEach((cs) => cs.tags?.forEach((tag) => tagSet.add(tag)));
    const dynamicTags = Array.from(tagSet).sort();
    return dynamicTags.length > 0 ? ["All", ...dynamicTags] : FALLBACK_FILTERS;
  }, [caseStudies]);

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return caseStudies.filter((cs) => {
      const matchesFilter =
        activeFilter === "All" ||
        cs.tags?.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase());
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        cs.title.toLowerCase().includes(q) ||
        cs.client_name.toLowerCase().includes(q) ||
        cs.excerpt?.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [caseStudies, activeFilter, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-32 pb-20"
      >
        <div className="container-custom w-full relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className={`mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="inline-block px-4 py-2 bg-[#A2D2FF]/20 text-[#1F2A44] rounded-full text-sm font-clash font-semibold uppercase tracking-wider">
                ✱ Case Studies
              </span>
            </div>
            <h1 className={`text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-[#1F2A44] leading-tight mb-8 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Real problems.{" "}
              <span className="relative inline-block">
                Real systems.
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#A2D2FF]" />
              </span>{" "}
              <br className="hidden lg:block" />Real results.
            </h1>
            <p className={`font-clash text-lg lg:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              These are not concepts or demos. Every case study on this page is a working AI system we built, deployed, and handed over to a team that uses it daily.
            </p>
          </div>
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ── FILTER + SEARCH BAR ───────────────────────────── */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-[64px] lg:top-[80px] z-30">
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 flex-wrap flex-1">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setActiveFilter(tag); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-full font-clash font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
                    activeFilter === tag
                      ? "bg-[#1F2A44] text-white"
                      : "bg-[#F4F6F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#1F2A44]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="relative sm:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search case studies..."
                className="w-full pl-9 pr-8 py-2.5 rounded-full border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-[#F4F6F9]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1F2A44] transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── CARDS GRID ────────────────────────────────────── */}
      <section className="bg-[#F9FAFC] py-16">
        <div className="container-custom">
          {loading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 text-[#1F2A44] animate-spin" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-[#E2E8F0] rounded-2xl bg-white">
              <p className="font-clash font-bold text-[#1F2A44] text-xl mb-3">No case studies found</p>
              <p className="font-jakarta text-[#94A3B8] text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                {searchQuery ? `No results for "${searchQuery}"` : caseStudies.length === 0 ? "Case studies will appear here once published in the CMS" : `No case studies tagged with "${activeFilter}" yet`}
              </p>
              {(activeFilter !== "All" || searchQuery) && (
                <button
                  onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-semibold text-sm hover:bg-[#0e5d7d] transition-all duration-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-10">
                <p className="font-jakarta text-sm text-[#94A3B8]">
                  {filtered.length} {filtered.length === 1 ? "case study" : "case studies"}
                  {activeFilter !== "All" && <span> tagged <span className="font-semibold text-[#1F2A44]">"{activeFilter}"</span></span>}
                  {searchQuery && <span> matching <span className="font-semibold text-[#1F2A44]">"{searchQuery}"</span></span>}
                </p>
                {totalPages > 1 && <p className="font-jakarta text-sm text-[#94A3B8]">Page {currentPage} of {totalPages}</p>}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
                {paginated.map((cs, index) => (
                  <CaseStudyCard key={cs.id} cs={cs} index={index} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-10 border-t border-[#E2E8F0]">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2.5 rounded-lg border-2 border-[#E2E8F0] text-[#64748B] hover:border-[#1F2A44] hover:text-[#1F2A44] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)} className={`w-9 h-9 rounded-lg font-clash font-semibold text-sm transition-all duration-200 ${currentPage === page ? "bg-[#1F2A44] text-white" : "border-2 border-[#E2E8F0] text-[#64748B] hover:border-[#1F2A44] hover:text-[#1F2A44]"}`}>
                      {page}
                    </button>
                  ))}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2.5 rounded-lg border-2 border-[#E2E8F0] text-[#64748B] hover:border-[#1F2A44] hover:text-[#1F2A44] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] mb-5">
            Ready To Solve A Similar Challenge?
            </h2>
            <p className="font-jakarta text-[#64748B] mb-10 leading-relaxed text-lg">
            Let's explore what this could look like for your organization.
            </p>
            <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group">
            Talk With Refactrd
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ── CARD ─────────────────────────────────────────────────
function CaseStudyCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Pick a subtle accent color variation per card based on index
  const accents = [
    { from: '#1F2A44', via: '#0e3a5c', to: '#0e5d7d' },
    { from: '#1a2d4a', via: '#0d3358', to: '#0a4a6e' },
    { from: '#162540', via: '#0b2f52', to: '#0c5068' },
  ];
  const accent = accents[index % accents.length];

  return (
    <div
      ref={cardRef}
      className={`group bg-white rounded-2xl border-2 border-[#E2E8F0] hover:border-[#1F2A44] hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms`, transitionDuration: "500ms" }}
    >
      {/* ── IMAGE OR CREATIVE BANNER ── */}
      {cs.featured_image_url ? (
        <div className="relative w-full h-52 overflow-hidden flex-shrink-0">
          <Image
            src={cs.featured_image_url}
            alt={cs.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {cs.industry && (
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1F2A44] text-xs font-clash font-bold rounded-full">
                {cs.industry}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* Creative title banner — mirrors CaseStudyDetail */
        <div
          className="relative w-full h-52 flex-shrink-0 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.via} 50%, ${accent.to} 100%)` }}
        >
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.12,
            }}
          />

          {/* Top-right corner triangle accent */}
          <div
            className="absolute top-0 right-0 w-24 h-24"
            style={{
              background: 'linear-gradient(225deg, rgba(162,210,255,0.15) 0%, transparent 60%)',
            }}
          />

          {/* Giant faded first letter — anchored bottom-right */}
          <span
            className="absolute font-clash font-bold text-white select-none pointer-events-none leading-none"
            style={{
              fontSize: '9rem',
              opacity: 0.07,
              bottom: '-1.5rem',
              right: '-0.5rem',
            }}
          >
            {cs.title.charAt(0)}
          </span>

          {/* Thin horizontal accent line */}
          <div
            className="absolute left-5 top-5 h-px w-8 rounded-full"
            style={{ background: 'rgba(162,210,255,0.5)' }}
          />
          <div
            className="absolute left-5 top-8 h-px w-4 rounded-full"
            style={{ background: 'rgba(162,210,255,0.3)' }}
          />

          {/* Bottom: industry + client only — no title to avoid duplication */}
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            {/* Top: decorative tag lines */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="h-px rounded-full w-10" style={{ background: 'rgba(162,210,255,0.5)' }} />
              <div className="h-px rounded-full w-6" style={{ background: 'rgba(162,210,255,0.3)' }} />
              <div className="h-px rounded-full w-8" style={{ background: 'rgba(162,210,255,0.2)' }} />
            </div>
            {/* Bottom: badges */}
            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-2">
                {cs.industry && (
                  <span className="inline-block self-start px-2.5 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-clash font-bold rounded-full uppercase tracking-wider">
                    {cs.industry}
                  </span>
                )}
                {cs.client_name && (
                  <span className="inline-block self-start px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 text-[10px] font-jakarta rounded-full">
                    {cs.client_name}
                  </span>
                )}
              </div>
              {/* Mini read indicator */}
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] opacity-80" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] opacity-50" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] opacity-30" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BODY ── */}
      <div className="p-7 flex flex-col flex-1 gap-4">
        <h3 className="text-lg font-clash font-bold text-[#1F2A44] group-hover:text-[#0e5d7d] transition-colors duration-300 line-clamp-2 leading-snug">
          {cs.title}
        </h3>

        <p className="font-jakarta text-sm text-[#64748B] leading-relaxed flex-1 line-clamp-3">
          {cs.excerpt}
        </p>

        {cs.results && (
          <div className="px-4 py-3 bg-[#F0F7FF] rounded-xl border-l-4 border-[#A2D2FF]">
            <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1.5">
              Result
            </p>
            <p className="font-jakarta text-xs text-[#1F2A44] leading-relaxed line-clamp-2">
              {stripHtml(cs.results)}
            </p>
          </div>
        )}

        {cs.tags && cs.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {cs.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2.5 py-1 text-[11px] font-clash font-semibold rounded-full bg-[#F4F6F9] border border-[#E2E8F0] text-[#64748B]">
                {tag}
              </span>
            ))}
            {cs.tags.length > 3 && (
              <span className="px-2.5 py-1 text-[11px] font-clash font-semibold rounded-full bg-[#F4F6F9] border border-[#E2E8F0] text-[#94A3B8]">
                +{cs.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <Link
          href={`/case-studies/${cs.slug}`}
          className="inline-flex items-center gap-2 text-[#1F2A44] font-clash font-bold text-sm group-hover:gap-3 transition-all duration-300 pt-1 border-t border-[#F4F6F9]"
        >
          Read Case Study
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
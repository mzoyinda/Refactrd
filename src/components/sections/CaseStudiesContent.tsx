"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
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

// Fallback filters shown before any data loads
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

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
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

  // Build filter tags dynamically from DB tags, fall back to static list if DB is empty
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    caseStudies.forEach((cs) => {
      cs.tags?.forEach((tag) => tagSet.add(tag));
    });
    const dynamicTags = Array.from(tagSet).sort();
    return dynamicTags.length > 0
      ? ["All", ...dynamicTags]
      : FALLBACK_FILTERS;
  }, [caseStudies]);

  // Filter + search
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

  // Pagination
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
            <div
              className={`mb-6 transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-block px-4 py-2 bg-[#A2D2FF]/20 text-[#1F2A44] rounded-full text-sm font-clash font-semibold uppercase tracking-wider">
                ✱ Case Studies
              </span>
            </div>

            <h1
              className={`text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Real problems.{" "}
              <span className="relative inline-block">
                Real systems.
                <div className="absolute -bottom-2 left-0 w-full h-3 bg-[#A2D2FF]" />
              </span>{" "}
              <br className="hidden lg:block" />Real results.
            </h1>

            <p
              className={`font-clash text-lg lg:text-xl text-[#64748B] leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
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

            {/* Filter pills */}
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

            {/* Search */}
            <div className="relative sm:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-8 py-2.5 rounded-full border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-[#F4F6F9]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1F2A44] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── CARDS GRID ────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="container-custom">

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 text-[#1F2A44] animate-spin" />
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-[#E2E8F0] rounded-2xl">
              <p className="font-clash font-bold text-[#1F2A44] text-xl mb-2">
                No case studies found
              </p>
              <p className="font-jakarta text-[#94A3B8] text-sm mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : caseStudies.length === 0
                  ? "Case studies will appear here once they are published"
                  : `No case studies tagged with "${activeFilter}" yet`}
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

          {/* Results */}
          {!loading && filtered.length > 0 && (
            <>
              {/* Result count */}
              <div className="flex items-center justify-between mb-8">
                <p className="font-jakarta text-sm text-[#94A3B8]">
                  {filtered.length} {filtered.length === 1 ? "case study" : "case studies"}
                  {activeFilter !== "All" && (
                    <span> tagged <span className="font-semibold text-[#1F2A44]">"{activeFilter}"</span></span>
                  )}
                  {searchQuery && (
                    <span> matching <span className="font-semibold text-[#1F2A44]">"{searchQuery}"</span></span>
                  )}
                </p>
                {totalPages > 1 && (
                  <p className="font-jakarta text-sm text-[#94A3B8]">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </div>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginated.map((cs, index) => (
                  <CaseStudyCard key={cs.id} cs={cs} index={index} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8 border-t border-[#E2E8F0]">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-lg border-2 border-[#E2E8F0] text-[#64748B] hover:border-[#1F2A44] hover:text-[#1F2A44] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-lg font-clash font-semibold text-sm transition-all duration-200 ${
                        currentPage === page
                          ? "bg-[#1F2A44] text-white"
                          : "border-2 border-[#E2E8F0] text-[#64748B] hover:border-[#1F2A44] hover:text-[#1F2A44]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-lg border-2 border-[#E2E8F0] text-[#64748B] hover:border-[#1F2A44] hover:text-[#1F2A44] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────── */}
      <section className="bg-[#F4F6F9] py-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] mb-4">
              Seen enough to know we can help?
            </h2>
            <p className="font-jakarta text-[#64748B] mb-8 leading-relaxed">
              Find the starting point that fits where you are right now.
            </p>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group"
            >
              Find Your Starting Point
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ── CARD ────────────────────────────────────────────────
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

  return (
    <div
      ref={cardRef}
      className={`group bg-white rounded-2xl border-2 border-[#E2E8F0] hover:border-[#1F2A44] hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 80}ms`, transitionDuration: "500ms" }}
    >
      {/* Featured image */}
      {cs.featured_image_url ? (
        <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
          <Image
            src={cs.featured_image_url}
            alt={cs.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {cs.industry && (
            <div className="absolute bottom-3 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#1F2A44] text-xs font-clash font-bold rounded-full">
                {cs.industry}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full h-44 bg-gradient-to-br from-[#1F2A44] to-[#0e5d7d] flex items-center justify-center flex-shrink-0">
          <span className="font-clash font-bold text-white/10 text-8xl select-none">
            {cs.title.charAt(0)}
          </span>
          {cs.industry && (
            <div className="absolute bottom-3 left-4">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs font-clash font-bold rounded-full border border-white/20">
                {cs.industry}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-clash font-bold text-[#1F2A44] mb-2 group-hover:text-[#0e5d7d] transition-colors duration-300 line-clamp-2">
          {cs.title}
        </h3>

        <p className="font-jakarta text-sm text-[#64748B] leading-relaxed mb-4 flex-1 line-clamp-3">
          {cs.excerpt}
        </p>

        {cs.results && (
          <div className="mb-4 px-3 py-2.5 bg-[#F0F7FF] rounded-lg border-l-4 border-[#A2D2FF]">
            <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1">
              Result
            </p>
            <p className="font-jakarta text-xs text-[#1F2A44] leading-relaxed line-clamp-2">
              {cs.results}
            </p>
          </div>
        )}

        {cs.tags && cs.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {cs.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[11px] font-clash font-semibold rounded-full bg-[#F4F6F9] border border-[#E2E8F0] text-[#64748B]"
              >
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
          className="inline-flex items-center gap-1.5 text-[#1F2A44] font-clash font-bold text-sm group-hover:gap-2.5 transition-all duration-300 mt-auto"
        >
          Read Case Study
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
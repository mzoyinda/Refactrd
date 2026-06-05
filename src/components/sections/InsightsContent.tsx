"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Search, X, ChevronRight, Loader2, ChevronLeft, BookOpen } from "lucide-react";

interface Insight {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  tags: string[];
  is_featured: boolean;
  published_at: string;
}

const ITEMS_PER_PAGE = 6;

const FALLBACK_FILTERS = [
  "All",
  "Workflow Transformation",
  "Knowledge Systems",
  "AI Operations",
  "AI-Enabled Products",
  "Adoption",
  "Frameworks",
  "Startups",
];

export default function InsightsContent() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
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
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const { data, error } = await supabase
        .from("insights")
        .select("id, title, slug, category, excerpt, tags, is_featured, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      setInsights(data || []);
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setLoading(false);
    }
  };

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    insights.forEach((insight) => {
      insight.tags?.forEach((tag) => tagSet.add(tag));
    });
    const dynamicTags = Array.from(tagSet).sort();
    return dynamicTags.length > 0 ? ["All", ...dynamicTags] : FALLBACK_FILTERS;
  }, [insights]);

  // Pull featured insight out before filtering — it always shows at the top
  // regardless of active filter, unless a search query hides it
  const featuredInsight = useMemo(
    () => insights.find((i) => i.is_featured) ?? null,
    [insights]
  );

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return insights
      .filter((i) => !i.is_featured) // featured slot is rendered separately
      .filter((i) => {
        const matchesFilter =
          activeFilter === "All" ||
          i.tags?.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase()) ||
          i.category?.toLowerCase() === activeFilter.toLowerCase();

        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !q ||
          i.title.toLowerCase().includes(q) ||
          i.category?.toLowerCase().includes(q) ||
          i.excerpt?.toLowerCase().includes(q);

        return matchesFilter && matchesSearch;
      });
  }, [insights, activeFilter, searchQuery]);

  // When a search/filter is active, also check if featured should show
  const showFeatured =
    featuredInsight &&
    (activeFilter === "All" || featuredInsight.tags?.some((t) => t.toLowerCase() === activeFilter.toLowerCase()) || featuredInsight.category?.toLowerCase() === activeFilter.toLowerCase()) &&
    (!searchQuery ||
      featuredInsight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      featuredInsight.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()));

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
                Insights
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Lessons From Transformation
              <br className="hidden lg:block" /> In Practice.
            </h1>

            <p
              className={`font-jakarta text-base lg:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Perspectives, frameworks, and lessons from helping organizations move AI from experimentation to operational adoption.
            </p>
          </div>
        </div>

        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ── FILTER + SEARCH BAR ───────────────────────────── */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-[64px] lg:top-[80px] z-30">
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
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

            <div className="relative w-full sm:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search insights..."
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

      {/* ── CONTENT ───────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="container-custom">

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 text-[#1F2A44] animate-spin" />
            </div>
          )}

          {/* Empty state */}
          {!loading && !showFeatured && filtered.length === 0 && (
            <div className="text-center py-24 border-2 border-dashed border-[#E2E8F0] rounded-2xl px-8">
              <p className="font-clash font-bold text-[#1F2A44] text-2xl mb-3">
                {insights.length === 0 && !searchQuery && activeFilter === "All"
                  ? "New Insights Coming Soon"
                  : "No insights found"}
              </p>
              <p className="font-jakarta text-[#94A3B8] text-sm leading-relaxed max-w-lg mx-auto mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : insights.length === 0 && activeFilter === "All"
                  ? "We're documenting practical lessons from AI implementations, workflow transformations, and operational improvement initiatives. Check back for new insights, frameworks, and field-tested approaches."
                  : `No insights tagged with "${activeFilter}" yet`}
              </p>
              {(activeFilter !== "All" || searchQuery) && (
                <button
                  onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-semibold text-sm hover:bg-[#263352] transition-all duration-200"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Featured insight */}
          {!loading && showFeatured && (
            <div className="mb-12">
              <FeaturedInsightCard insight={featuredInsight!} />
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="font-jakarta text-sm text-[#94A3B8]">
                  {filtered.length} {filtered.length === 1 ? "insight" : "insights"}
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

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginated.map((insight, index) => (
                  <InsightCard key={insight.id} insight={insight} index={index} />
                ))}
              </div>

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
              Ready To Move Beyond Experimentation?
            </h2>
            <p className="font-jakarta text-[#64748B] mb-8 leading-relaxed">
              Explore the engagement path that best fits your goals, challenges, and stage of AI adoption.
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

// ── FEATURED CARD ────────────────────────────────────────
function FeaturedInsightCard({ insight }: { insight: Insight }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
      className={`group relative bg-gradient-to-br from-[#1F2A44] to-[#0e5d7d] rounded-2xl overflow-hidden transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5B6CFF]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#A2D2FF]/20 text-[#A2D2FF] rounded-full text-xs font-clash font-bold uppercase tracking-wider border border-[#A2D2FF]/30">
              <BookOpen className="w-3 h-3" />
              Featured
            </span>
            {insight.category && (
              <span className="px-3 py-1.5 bg-white/10 text-white/70 rounded-full text-xs font-clash font-semibold">
                {insight.category}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-white leading-tight mb-4 group-hover:text-[#A2D2FF] transition-colors duration-300">
            {insight.title}
          </h2>

          <p className="font-jakarta text-white/70 leading-relaxed text-base lg:text-lg max-w-2xl">
            {insight.excerpt}
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href={`/insights/${insight.slug}`}
            className="inline-flex items-center gap-2 px-7 py-4 bg-white text-[#1F2A44] rounded-full font-clash font-bold text-sm hover:bg-[#A2D2FF] transition-all duration-300 group/btn"
          >
            Read Insight
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── INSIGHT CARD ────────────────────────────────────────
function InsightCard({ insight, index }: { insight: Insight; index: number }) {
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
      {/* Top accent bar — color keyed to category */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1F2A44] to-[#0e5d7d] group-hover:from-[#A2D2FF] group-hover:to-[#5B6CFF] transition-all duration-500" />

      <div className="p-6 flex flex-col flex-1">
        {insight.category && (
          <span className="inline-block mb-3 px-3 py-1 bg-[#F0F7FF] text-[#1F2A44] text-[11px] font-clash font-bold rounded-full uppercase tracking-wider self-start border border-[#A2D2FF]/30">
            {insight.category}
          </span>
        )}

        <h3 className="text-lg font-clash font-bold text-[#1F2A44] mb-3 group-hover:text-[#0e5d7d] transition-colors duration-300 leading-snug">
          {insight.title}
        </h3>

        <p className="font-jakarta text-sm text-[#64748B] leading-relaxed flex-1 line-clamp-3">
          {insight.excerpt}
        </p>

        {insight.tags && insight.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
            {insight.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[11px] font-clash font-semibold rounded-full bg-[#F4F6F9] border border-[#E2E8F0] text-[#64748B]"
              >
                {tag}
              </span>
            ))}
            {insight.tags.length > 3 && (
              <span className="px-2.5 py-1 text-[11px] font-clash font-semibold rounded-full bg-[#F4F6F9] border border-[#E2E8F0] text-[#94A3B8]">
                +{insight.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <Link
          href={`/insights/${insight.slug}`}
          className="inline-flex items-center gap-1.5 text-[#1F2A44] font-clash font-bold text-sm group-hover:gap-2.5 transition-all duration-300 mt-auto"
        >
          Read More
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { cmsSupabase } from "@/lib/cms-supabase";
import { ArrowRight, Search, X, ChevronRight, Loader2, ChevronLeft, BookOpen } from "lucide-react";

interface Insight {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  tags: string[];
  featured: boolean;
  featured_image_url: string | null;
  published_at: string;
  created_at: string;
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

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadTime(content: string): string {
  const words = stripHtml(content).split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

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

  useEffect(() => { fetchInsights(); }, []);

  const fetchInsights = async () => {
    try {
      const { data, error } = await cmsSupabase
        .from("blogs")
        .select("id, title, slug, category, excerpt, tags, featured, featured_image_url, published_at, created_at")
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
    insights.forEach((i) => i.tags?.forEach((tag) => tagSet.add(tag)));
    const dynamicTags = Array.from(tagSet).sort();
    return dynamicTags.length > 0 ? ["All", ...dynamicTags] : FALLBACK_FILTERS;
  }, [insights]);

  const featuredInsight = useMemo(
    () => insights.find((i) => i.featured) ?? null,
    [insights]
  );

  const filtered = useMemo(() => {
    setCurrentPage(1);
    return insights
      .filter((i) => !i.featured)
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

  const showFeatured =
    featuredInsight &&
    (activeFilter === "All" ||
      featuredInsight.tags?.some((t) => t.toLowerCase() === activeFilter.toLowerCase()) ||
      featuredInsight.category?.toLowerCase() === activeFilter.toLowerCase()) &&
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

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-32 pb-20"
      >
        <div className="container-custom w-full relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className={`mb-6 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="inline-block px-4 py-2 bg-[#A2D2FF]/20 text-[#1F2A44] rounded-full text-sm font-clash font-semibold uppercase tracking-wider">
                Insights
              </span>
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Lessons From Transformation
              <br className="hidden lg:block" /> In Practice.
            </h1>
            <p className={`font-jakarta text-base lg:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Perspectives, frameworks, and lessons from helping organizations move AI from experimentation to operational adoption.
            </p>
          </div>
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* ── FILTER + SEARCH ── */}
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
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#1F2A44]">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <section className="bg-white py-14">
        <div className="container-custom">

          {loading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-8 h-8 text-[#1F2A44] animate-spin" />
            </div>
          )}

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
                  ? "We are documenting practical lessons from AI implementations and workflow transformations. Check back soon."
                  : `No insights tagged with "${activeFilter}" yet`}
              </p>
              {(activeFilter !== "All" || searchQuery) && (
                <button
                  onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-semibold text-sm"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {/* Featured */}
          {!loading && showFeatured && (
            <div className="mb-12">
              <FeaturedInsightCard insight={featuredInsight!} formatDate={formatDate} />
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="font-jakarta text-sm text-[#94A3B8]">
                  {filtered.length} {filtered.length === 1 ? "insight" : "insights"}
                  {activeFilter !== "All" && <span> tagged <span className="font-semibold text-[#1F2A44]">"{activeFilter}"</span></span>}
                  {searchQuery && <span> matching <span className="font-semibold text-[#1F2A44]">"{searchQuery}"</span></span>}
                </p>
                {totalPages > 1 && <p className="font-jakarta text-sm text-[#94A3B8]">Page {currentPage} of {totalPages}</p>}
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginated.map((insight, index) => (
                  <InsightCard key={insight.id} insight={insight} index={index} formatDate={formatDate} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8 border-t border-[#E2E8F0]">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2.5 rounded-lg border-2 border-[#E2E8F0] text-[#64748B] hover:border-[#1F2A44] hover:text-[#1F2A44] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-lg font-clash font-semibold text-sm transition-all ${currentPage === page ? "bg-[#1F2A44] text-white" : "border-2 border-[#E2E8F0] text-[#64748B] hover:border-[#1F2A44] hover:text-[#1F2A44]"}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2.5 rounded-lg border-2 border-[#E2E8F0] text-[#64748B] hover:border-[#1F2A44] hover:text-[#1F2A44] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#F4F6F9] py-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] mb-4">
              Ready To Move Beyond Experimentation?
            </h2>
            <p className="font-jakarta text-[#64748B] mb-8 leading-relaxed">
              Explore the engagement path that best fits your goals, challenges, and stage of AI adoption.
            </p>
            <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group">
              Find Your Starting Point
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ── FEATURED CARD ──────────────────────────────────────
function FeaturedInsightCard({ insight, formatDate }: { insight: Insight; formatDate: (d: string) => string }) {
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
    <Link href={`/insights/${insight.slug}`}>
      <div
        ref={ref}
        className={`group relative rounded-2xl overflow-hidden transition-all duration-700 hover:shadow-2xl ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {insight.featured_image_url ? (
          <div className="relative w-full h-[420px] lg:h-[500px]">
            <Image
              src={insight.featured_image_url}
              alt={insight.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/90 via-[#1F2A44]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <FeaturedCardContent insight={insight} formatDate={formatDate} />
            </div>
          </div>
        ) : (
          <div className="relative bg-gradient-to-br from-[#1F2A44] to-[#0e5d7d] p-8 lg:p-12">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5B6CFF]/10 rounded-full blur-2xl pointer-events-none" />
            <span className="absolute right-10 top-1/2 -translate-y-1/2 font-clash font-bold text-white select-none pointer-events-none" style={{ fontSize: '18rem', opacity: 0.04, lineHeight: 1 }}>
              {insight.title.charAt(0)}
            </span>
            <div className="relative z-10 max-w-3xl">
              <FeaturedCardContent insight={insight} formatDate={formatDate} />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function FeaturedCardContent({ insight, formatDate }: { insight: Insight; formatDate: (d: string) => string }) {
  return (
    <>
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
        <span className="text-white/50 font-jakarta text-xs">
          {formatDate(insight.published_at || insight.created_at)}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-white leading-tight mb-4 group-hover:text-[#A2D2FF] transition-colors duration-300">
        {insight.title}
      </h2>
      {insight.excerpt && (
        <p className="font-jakarta text-white/70 leading-relaxed text-base max-w-2xl mb-6">
          {insight.excerpt}
        </p>
      )}
      <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1F2A44] rounded-full font-clash font-bold text-sm group-hover:bg-[#A2D2FF] transition-all duration-300">
        Read Insight
        <ChevronRight className="w-4 h-4" />
      </span>
    </>
  );
}

// ── INSIGHT CARD ──────────────────────────────────────
function InsightCard({ insight, index, formatDate }: { insight: Insight; index: number; formatDate: (d: string) => string }) {
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
      className={`group bg-white rounded-2xl border-2 border-[#E2E8F0] hover:border-[#1F2A44] hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms`, transitionDuration: "500ms" }}
    >
      {/* Image or gradient fallback */}
      {insight.featured_image_url ? (
        <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
          <Image
            src={insight.featured_image_url}
            alt={insight.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {insight.category && (
            <div className="absolute bottom-3 left-4">
              <span className="px-3 py-1 bg-white/90 text-[#1F2A44] text-xs font-clash font-bold rounded-full">
                {insight.category}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full h-48 bg-gradient-to-br from-[#1F2A44] via-[#0e3a5c] to-[#0e5d7d] flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.1 }} />
          <span className="absolute font-clash font-bold text-white select-none pointer-events-none leading-none" style={{ fontSize: '8rem', opacity: 0.07, bottom: '-1rem', right: '-0.5rem' }}>
            {insight.title.charAt(0)}
          </span>
          {insight.category && (
            <div className="absolute bottom-3 left-4">
              <span className="px-3 py-1 bg-white/10 border border-white/20 text-white text-xs font-clash font-bold rounded-full">
                {insight.category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-jakarta">
          <span>{formatDate(insight.published_at || insight.created_at)}</span>
        </div>

        <h3 className="text-lg font-clash font-bold text-[#1F2A44] group-hover:text-[#0e5d7d] transition-colors duration-300 leading-snug line-clamp-2">
          {insight.title}
        </h3>

        {insight.excerpt && (
          <p className="font-jakarta text-sm text-[#64748B] leading-relaxed flex-1 line-clamp-3">
            {insight.excerpt}
          </p>
        )}

        {insight.tags && insight.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {insight.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2.5 py-1 text-[11px] font-clash font-semibold rounded-full bg-[#F4F6F9] border border-[#E2E8F0] text-[#64748B]">
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
          className="inline-flex items-center gap-1.5 text-[#1F2A44] font-clash font-bold text-sm group-hover:gap-2.5 transition-all duration-300 pt-2 border-t border-[#F4F6F9]"
        >
          Read More
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
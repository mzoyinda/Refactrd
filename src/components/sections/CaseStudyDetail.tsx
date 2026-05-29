"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Loader2,
  Quote,
  TrendingUp,
} from "lucide-react";

interface Metric {
  label: string;
  value: string;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  excerpt: string;
  problem: string;
  solution: string;
  results: string;
  metrics: Metric[] | null;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  featured_image_url: string | null;
  tags: string[];
  view_count: number;
  created_at: string;
}

interface RelatedStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  excerpt: string;
  featured_image_url: string | null;
  tags: string[];
}

export default function CaseStudyDetail({ slug }: { slug: string }) {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [related, setRelated] = useState<RelatedStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchCaseStudy();
  }, [slug]);

  const fetchCaseStudy = async () => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error || !data) {
        setNotFound(true);
        return;
      }

      setCaseStudy(data);

      // Increment view count
      await supabase
        .from("case_studies")
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq("id", data.id);

      // Fetch related - same tags, exclude current
      if (data.tags?.length > 0) {
        const { data: relatedData } = await supabase
          .from("case_studies")
          .select("id, title, slug, client_name, industry, excerpt, featured_image_url, tags")
          .eq("status", "published")
          .neq("id", data.id)
          .overlaps("tags", data.tags)
          .limit(3);

        setRelated(relatedData || []);
      }
    } catch (error) {
      console.error("Error fetching case study:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1F2A44] animate-spin" />
      </div>
    );
  }

  if (notFound || !caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 pt-32">
        <h1 className="font-clash font-bold text-3xl text-[#1F2A44]">
          Case study not found
        </h1>
        <p className="font-jakarta text-[#64748B]">
          This case study may have been removed or does not exist.
        </p>
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-semibold text-sm hover:bg-[#0e5d7d] transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#E6EAF0] via-white to-white pt-32 pb-0 overflow-hidden">
        <div className="container-custom relative z-10">
          {/* Back link */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-[#64748B] font-clash font-semibold text-sm hover:text-[#1F2A44] transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            All Case Studies
          </Link>

          <div className="max-w-4xl">
            {/* Industry + tags */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {caseStudy.industry && (
                <span className="px-3 py-1.5 bg-[#1F2A44] text-white text-xs font-clash font-bold rounded-full uppercase tracking-wide">
                  {caseStudy.industry}
                </span>
              )}
              {caseStudy.tags?.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-[#A2D2FF]/20 text-[#1F2A44] text-xs font-clash font-semibold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-clash font-bold text-[#1F2A44] leading-tight mb-6">
              {caseStudy.title}
            </h1>

            {/* Excerpt */}
            <p className="font-jakarta text-lg text-[#64748B] leading-relaxed max-w-2xl mb-10">
              {caseStudy.excerpt}
            </p>

            {/* Client + Date meta */}
            <div className="flex flex-wrap items-center gap-6 pb-10 border-b border-[#E2E8F0]">
              <div>
                <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest mb-1">
                  Client
                </p>
                <p className="font-clash font-semibold text-[#1F2A44]">
                  {caseStudy.client_name}
                </p>
              </div>
              <div className="w-px h-8 bg-[#E2E8F0]" />
              <div>
                <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest mb-1">
                  Industry
                </p>
                <p className="font-clash font-semibold text-[#1F2A44]">
                  {caseStudy.industry || "Technology"}
                </p>
              </div>
              <div className="w-px h-8 bg-[#E2E8F0]" />
              <div>
                <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest mb-1">
                  Published
                </p>
                <p className="font-clash font-semibold text-[#1F2A44]">
                  {new Date(caseStudy.created_at).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED IMAGE ────────────────────────────────── */}
      {caseStudy.featured_image_url && (
        <div className="bg-white">
          <div className="container-custom py-10">
            <div className="relative w-full h-[400px] lg:h-[520px] rounded-2xl overflow-hidden">
              <Image
                src={caseStudy.featured_image_url}
                alt={caseStudy.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* ── METRICS ───────────────────────────────────────── */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <div className="bg-[#1F2A44] py-14">
          <div className="container-custom">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-[#A2D2FF]" />
              <p className="font-clash font-bold text-[#A2D2FF] text-sm uppercase tracking-widest">
                Key Results
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudy.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <p className="font-clash font-bold text-3xl lg:text-4xl text-white mb-2">
                    {metric.value}
                  </p>
                  <p className="font-jakarta text-sm text-white/60 leading-relaxed">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-14">

            {/* The Challenge */}
            {caseStudy.problem && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#E6EAF0] flex items-center justify-center flex-shrink-0">
                    <span className="font-clash font-bold text-[#1F2A44] text-xs">01</span>
                  </div>
                  <h2 className="font-clash font-bold text-xl text-[#1F2A44] uppercase tracking-wide">
                    The Challenge
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none font-jakarta text-[#475569] leading-relaxed prose-headings:font-clash prose-headings:text-[#1F2A44] prose-strong:text-[#1F2A44]"
                  dangerouslySetInnerHTML={{ __html: caseStudy.problem }}
                />
              </div>
            )}

            {/* Divider */}
            {caseStudy.problem && caseStudy.solution && (
              <div className="h-px bg-[#E2E8F0]" />
            )}

            {/* The Solution */}
            {caseStudy.solution && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#E6EAF0] flex items-center justify-center flex-shrink-0">
                    <span className="font-clash font-bold text-[#1F2A44] text-xs">02</span>
                  </div>
                  <h2 className="font-clash font-bold text-xl text-[#1F2A44] uppercase tracking-wide">
                    The Solution
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none font-jakarta text-[#475569] leading-relaxed prose-headings:font-clash prose-headings:text-[#1F2A44] prose-strong:text-[#1F2A44]"
                  dangerouslySetInnerHTML={{ __html: caseStudy.solution }}
                />
              </div>
            )}

            {/* Divider */}
            {caseStudy.solution && caseStudy.results && (
              <div className="h-px bg-[#E2E8F0]" />
            )}

            {/* The Results */}
            {caseStudy.results && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#E6EAF0] flex items-center justify-center flex-shrink-0">
                    <span className="font-clash font-bold text-[#1F2A44] text-xs">03</span>
                  </div>
                  <h2 className="font-clash font-bold text-xl text-[#1F2A44] uppercase tracking-wide">
                    The Results
                  </h2>
                </div>
                <div
                  className="prose prose-lg max-w-none font-jakarta text-[#475569] leading-relaxed prose-headings:font-clash prose-headings:text-[#1F2A44] prose-strong:text-[#1F2A44]"
                  dangerouslySetInnerHTML={{ __html: caseStudy.results }}
                />
              </div>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial_quote && (
              <div className="bg-[#F4F6F9] rounded-2xl p-8 border-l-4 border-[#A2D2FF]">
                <Quote className="w-8 h-8 text-[#A2D2FF] mb-4" />
                <p className="font-clash text-xl text-[#1F2A44] leading-relaxed mb-4 font-medium">
                  "{caseStudy.testimonial_quote}"
                </p>
                {caseStudy.testimonial_author && (
                  <p className="font-clash font-bold text-sm text-[#64748B]">
                    {caseStudy.testimonial_author}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-[#1F2A44] py-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-clash font-bold text-[#A2D2FF] text-sm uppercase tracking-widest mb-4">
              Work with us
            </p>
            <h2 className="text-3xl lg:text-4xl font-clash font-bold text-white mb-4">
              Have a similar problem?
            </h2>
            <p className="font-jakarta text-white/60 mb-8 leading-relaxed">
              Tell us what you want to build and we will get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/start"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1F2A44] rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group"
              >
                Submit Your Brief
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/get-started"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white rounded-full font-clash font-semibold transition-all duration-300 hover:border-white/50"
              >
                Explore Options
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED CASE STUDIES ──────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-clash font-bold text-2xl text-[#1F2A44]">
                Related Case Studies
              </h2>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-1 text-sm font-clash font-semibold text-[#0e5d7d] hover:gap-2 transition-all duration-200"
              >
                See all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((cs) => (
                <Link
                  key={cs.id}
                  href={`/case-studies/${cs.slug}`}
                  className="group bg-white rounded-2xl border-2 border-[#E2E8F0] hover:border-[#1F2A44] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  {cs.featured_image_url ? (
                    <div className="relative w-full h-40 overflow-hidden flex-shrink-0">
                      <Image
                        src={cs.featured_image_url}
                        alt={cs.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-[#1F2A44] to-[#0e5d7d] flex items-center justify-center flex-shrink-0">
                      <span className="font-clash font-bold text-white/10 text-7xl select-none">
                        {cs.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    {cs.industry && (
                      <span className="inline-block px-2.5 py-1 bg-[#E6EAF0] text-[#1F2A44] text-xs font-clash font-bold rounded-full mb-3 self-start">
                        {cs.industry}
                      </span>
                    )}
                    <h3 className="font-clash font-bold text-[#1F2A44] mb-2 group-hover:text-[#0e5d7d] transition-colors line-clamp-2">
                      {cs.title}
                    </h3>
                    <p className="font-jakarta text-sm text-[#64748B] line-clamp-2 flex-1">
                      {cs.excerpt}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-[#1F2A44] font-clash font-bold text-sm group-hover:gap-2 transition-all duration-200">
                      Read Case Study
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cmsSupabase } from "@/lib/cms-supabase";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Loader2,
  Quote,
  TrendingUp,
  Link2,
  Check,
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
  author_id: string | null;
  author_name: string | null;
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

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/case-studies/${slug}`
    : `https://refactrd.com/case-studies/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center gap-3">
      <span className="font-clash font-bold text-xs text-[#94A3B8] uppercase tracking-widest">Share</span>
      <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share on WhatsApp" className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-80 transition-opacity">
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share on X" className="w-8 h-8 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity">
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn" className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-80 transition-opacity">
        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <button onClick={handleCopy} title="Copy link" className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${copied ? "bg-emerald-500" : "bg-[#E6EAF0] hover:bg-[#CBD5E1]"}`}>
        {copied ? <Check className="w-4 h-4 text-white" /> : <Link2 className="w-4 h-4 text-[#64748B]" />}
      </button>
    </div>
  );
}

export default function CaseStudyDetail({ slug }: { slug: string }) {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [related, setRelated] = useState<RelatedStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => { fetchCaseStudy(); }, [slug]);

  const fetchCaseStudy = async () => {
    try {
      const { data, error } = await cmsSupabase
        .from("case_studies").select("*").eq("slug", slug).eq("status", "published").single();
      if (error || !data) { setNotFound(true); return; }
      setCaseStudy(data);
      await cmsSupabase.from("case_studies").update({ view_count: (data.view_count || 0) + 1 }).eq("id", data.id);
      if (data.tags?.length > 0) {
        const { data: relatedData } = await cmsSupabase
          .from("case_studies").select("id, title, slug, client_name, industry, excerpt, featured_image_url, tags")
          .eq("status", "published").neq("id", data.id).overlaps("tags", data.tags).limit(3);
        setRelated(relatedData || []);
      }
    } catch (error) {
      console.error("Error:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-[#1F2A44] animate-spin" /></div>;

  if (notFound || !caseStudy) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 pt-32">
      <h1 className="font-clash font-bold text-3xl text-[#1F2A44]">Case study not found</h1>
      <Link href="/case-studies" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-semibold text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Case Studies
      </Link>
    </div>
  );

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#E6EAF0] via-white to-white pt-28 pb-10">
        <div className="container-custom max-w-4xl mx-auto">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-[#64748B] font-clash font-semibold text-sm hover:text-[#1F2A44] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" /> All Case Studies
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {caseStudy.industry && <span className="px-3 py-1.5 bg-[#1F2A44] text-white text-xs font-clash font-bold rounded-full uppercase tracking-wide">{caseStudy.industry}</span>}
            {caseStudy.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-3 py-1.5 bg-[#A2D2FF]/20 text-[#1F2A44] text-xs font-clash font-semibold rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl lg:text-5xl font-clash font-bold text-[#1F2A44] leading-tight mb-6">{caseStudy.title}</h1>
          <p className="font-jakarta text-lg text-[#64748B] leading-relaxed mb-10 max-w-3xl">{caseStudy.excerpt}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 py-6 border-t border-b border-[#E2E8F0]">
            {caseStudy.author_name && (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#1F2A44] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-clash font-bold text-sm">{caseStudy.author_name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest leading-none mb-0.5">Author</p>
                  <p className="font-clash font-semibold text-[#1F2A44] text-sm">{caseStudy.author_name}</p>
                </div>
              </div>
            )}
            {caseStudy.author_name && <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block" />}
            <div>
              <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest mb-0.5">Client</p>
              <p className="font-clash font-semibold text-[#1F2A44] text-sm">{caseStudy.client_name}</p>
            </div>
            <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block" />
            <div>
              <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest mb-0.5">Published</p>
              <p className="font-clash font-semibold text-[#1F2A44] text-sm">{formatDate(caseStudy.created_at)}</p>
            </div>
            <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block" />
            <ShareButtons title={caseStudy.title} slug={caseStudy.slug} />
          </div>
        </div>
      </section>

      {/* ── BANNER / FEATURED IMAGE ── */}
      <div className="bg-white py-10">
        <div className="container-custom max-w-4xl mx-auto">
          {caseStudy.featured_image_url ? (
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image src={caseStudy.featured_image_url} alt={caseStudy.title} fill className="object-cover" priority />
            </div>
          ) : (
            <div className="w-full h-[360px] lg:h-[440px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1F2A44] to-[#0e5d7d] relative flex items-end">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              </div>
              <span className="absolute right-10 top-1/2 -translate-y-1/2 font-clash font-bold text-white select-none pointer-events-none" style={{ fontSize: 'clamp(10rem, 25vw, 20rem)', opacity: 0.05, lineHeight: 1 }}>
                {caseStudy.title.charAt(0)}
              </span>
              <div className="relative z-10 p-10 lg:p-14">
                {caseStudy.industry && <span className="inline-block px-3 py-1.5 border border-white/20 bg-white/10 text-white text-xs font-clash font-bold rounded-full uppercase tracking-wide mb-4">{caseStudy.industry}</span>}
                <h2 className="font-clash font-bold text-white text-2xl lg:text-3xl leading-tight max-w-2xl">{caseStudy.title}</h2>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── METRICS ── */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <div className="bg-[#1F2A44] py-16">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-10">
              <TrendingUp className="w-5 h-5 text-[#A2D2FF]" />
              <p className="font-clash font-bold text-[#A2D2FF] text-sm uppercase tracking-widest">Key Results</p>
            </div>
            <div className={`grid gap-4 ${
              caseStudy.metrics.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' :
              caseStudy.metrics.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
              'grid-cols-2 lg:grid-cols-4'
            }`}>
              {caseStudy.metrics.map((metric, i) => {
                const isShortStat = metric.value.length <= 8;
                return (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
                    {isShortStat ? (
                      <>
                        <p className="font-jakarta font-bold text-4xl lg:text-5xl text-white leading-none">
                          {metric.value}
                        </p>
                        <p className="font-jakarta text-sm text-white/60 leading-relaxed">
                          {metric.label}
                        </p>
                      </>
                    ) : (
                      <>
                        {metric.label && (
                          <span className="inline-block self-start px-2.5 py-1 bg-white/10 border border-white/15 text-[#A2D2FF] text-[10px] font-clash font-bold rounded-full uppercase tracking-wider">
                            {metric.label}
                          </span>
                        )}
                        <p className="font-jakarta font-bold text-[14px] text-white leading-snug">
                          {metric.value}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <section className="bg-white py-20">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="max-w-3xl space-y-10">
            {caseStudy.problem && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-full bg-[#E6EAF0] flex items-center justify-center flex-shrink-0">
                    <span className="font-clash font-bold text-[#1F2A44] text-xs">01</span>
                  </div>
                  <h2 className="font-clash font-bold text-xl text-[#1F2A44] uppercase tracking-wider">The Challenge</h2>
                </div>
                <div className="case-study-content" dangerouslySetInnerHTML={{ __html: caseStudy.problem }} />
              </div>
            )}
            {caseStudy.problem && caseStudy.solution && <div className="h-px bg-[#E2E8F0]" />}
            {caseStudy.solution && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-full bg-[#E6EAF0] flex items-center justify-center flex-shrink-0">
                    <span className="font-clash font-bold text-[#1F2A44] text-xs">02</span>
                  </div>
                  <h2 className="font-clash font-bold text-xl text-[#1F2A44] uppercase tracking-wider">The Solution</h2>
                </div>
                <div className="case-study-content" dangerouslySetInnerHTML={{ __html: caseStudy.solution }} />
              </div>
            )}
            {caseStudy.solution && caseStudy.results && <div className="h-px bg-[#E2E8F0]" />}
            {caseStudy.results && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-full bg-[#E6EAF0] flex items-center justify-center flex-shrink-0">
                    <span className="font-clash font-bold text-[#1F2A44] text-xs">03</span>
                  </div>
                  <h2 className="font-clash font-bold text-xl text-[#1F2A44] uppercase tracking-wider">The Results</h2>
                </div>
                <div className="case-study-content" dangerouslySetInnerHTML={{ __html: caseStudy.results }} />
              </div>
            )}
            {caseStudy.testimonial_quote && (
              <div className="bg-[#F4F6F9] rounded-2xl p-8 lg:p-10 border-l-4 border-[#A2D2FF]">
                <Quote className="w-8 h-8 text-[#A2D2FF] mb-5" />
                <p className="font-clash text-xl lg:text-2xl text-[#1F2A44] leading-relaxed mb-5 font-medium">"{caseStudy.testimonial_quote}"</p>
                {caseStudy.testimonial_author && <p className="font-clash font-bold text-sm text-[#64748B]">— {caseStudy.testimonial_author}</p>}
              </div>
            )}
            <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-center lg:justify-between flex-wrap gap-4">
              <p className="font-clash font-semibold text-sm text-[#64748B]">Found this useful? Share it.</p>
              <ShareButtons title={caseStudy.title} slug={caseStudy.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1F2A44] py-24">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <p className="font-clash font-bold text-[#A2D2FF] text-sm uppercase tracking-widest mb-5">Work with us</p>
          <h2 className="text-3xl lg:text-4xl font-clash font-bold text-white mb-5">Have a similar problem?</h2>
          <p className="font-jakarta text-white/60 mb-10 leading-relaxed max-w-lg mx-auto">Tell us what you want to build and we will get back to you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/start" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1F2A44] rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group">
              Submit Your Brief <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white rounded-full font-clash font-semibold transition-all duration-300 hover:border-white/50">
              Explore Options
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="bg-white py-20">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-clash font-bold text-2xl text-[#1F2A44]">Related Case Studies</h2>
              <Link href="/case-studies" className="inline-flex items-center gap-1 text-sm font-clash font-semibold text-[#0e5d7d] hover:gap-2 transition-all duration-200">
                See all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((cs) => (
                <Link key={cs.id} href={`/case-studies/${cs.slug}`} className="group bg-white rounded-2xl border-2 border-[#E2E8F0] hover:border-[#1F2A44] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                  {cs.featured_image_url ? (
                    <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
                      <Image src={cs.featured_image_url} alt={cs.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  ) : (
                    <div className="w-full h-44 bg-gradient-to-br from-[#1F2A44] to-[#0e5d7d] flex items-center justify-center flex-shrink-0">
                      <span className="font-clash font-bold text-white/10 text-7xl select-none">{cs.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    {cs.industry && <span className="inline-block px-2.5 py-1 bg-[#E6EAF0] text-[#1F2A44] text-xs font-clash font-bold rounded-full mb-4 self-start">{cs.industry}</span>}
                    <h3 className="font-clash font-bold text-[#1F2A44] mb-3 group-hover:text-[#0e5d7d] transition-colors line-clamp-2 leading-snug">{cs.title}</h3>
                    <p className="font-jakarta text-sm text-[#64748B] line-clamp-2 flex-1 leading-relaxed">{cs.excerpt}</p>
                    <div className="flex items-center gap-1 mt-5 text-[#1F2A44] font-clash font-bold text-sm group-hover:gap-2 transition-all duration-200 pt-4 border-t border-[#F4F6F9]">
                      Read Case Study <ChevronRight className="w-4 h-4" />
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
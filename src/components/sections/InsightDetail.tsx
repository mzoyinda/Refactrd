"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cmsSupabase } from "@/lib/cms-supabase";
import {
  ArrowLeft, ArrowRight, ChevronRight,
  Loader2, Link2, Check, Clock, Calendar
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category: string | null;
  tags: string[];
  author_id: string | null;
  featured_image_url: string | null;
  view_count: number;
  published_at: string | null;
  created_at: string;
}

interface Author {
  full_name: string;
  avatar_url: string | null;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

// ── SHARE BUTTONS ────────────────────────────────────────
function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/insights/${slug}`
    : `https://refactrd.com/insights/${slug}`;
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

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadTime(content: string): string {
  const words = stripHtml(content).split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function InsightDetail({ slug }: { slug: string }) {
  const [post, setPost] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => { fetchPost(); }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await cmsSupabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error || !data) { setNotFound(true); return; }
      setPost(data);

      // Fetch author
      if (data.author_id) {
        const { data: authorData } = await cmsSupabase
          .from("users")
          .select("full_name, avatar_url")
          .eq("id", data.author_id)
          .single();
        if (authorData) setAuthor(authorData);
      }

      // Increment view count
      await cmsSupabase
        .from("blogs")
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq("id", data.id);

      // Fetch related by tags or category
      if (data.tags?.length > 0 || data.category) {
        let query = cmsSupabase
          .from("blogs")
          .select("id, title, slug, excerpt, category, featured_image_url, published_at, created_at")
          .eq("status", "published")
          .neq("id", data.id)
          .limit(3);

        if (data.tags?.length > 0) {
          query = query.overlaps("tags", data.tags);
        } else if (data.category) {
          query = query.eq("category", data.category);
        }

        const { data: relatedData } = await query;
        setRelated(relatedData || []);
      }
    } catch (err) {
      console.error("Error fetching post:", err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric",
    });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#1F2A44] animate-spin" />
    </div>
  );

  if (notFound || !post) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 pt-32">
      <h1 className="font-clash font-bold text-3xl text-[#1F2A44]">Insight not found</h1>
      <p className="font-jakarta text-[#64748B]">This post may have been removed or does not exist.</p>
      <Link href="/insights" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F2A44] text-white rounded-full font-clash font-semibold text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Insights
      </Link>
    </div>
  );

  const readTime = estimateReadTime(post.content);
  const publishDate = post.published_at || post.created_at;

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#E6EAF0] via-white to-white pt-28 pb-10">
        <div className="container-custom max-w-3xl mx-auto">
          <Link href="/insights" className="inline-flex items-center gap-2 text-[#64748B] font-clash font-semibold text-sm hover:text-[#1F2A44] transition-colors mb-10 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            All Insights
          </Link>

          {/* Category + tags */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.category && (
              <span className="px-3 py-1.5 bg-[#1F2A44] text-white text-xs font-clash font-bold rounded-full uppercase tracking-wide">
                {post.category}
              </span>
            )}
            {post.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-3 py-1.5 bg-[#A2D2FF]/20 text-[#1F2A44] text-xs font-clash font-semibold rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-5xl font-clash font-bold text-[#1F2A44] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="font-jakarta text-lg text-[#64748B] leading-relaxed mb-8">
              {post.excerpt}
            </p>
          )}

          {/* Meta strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-5 border-t border-b border-[#E2E8F0]">
            {/* Author */}
            {/* {author && (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#1F2A44] flex items-center justify-center overflow-hidden flex-shrink-0">
                  {author.avatar_url ? (
                    <img src={author.avatar_url} alt={author.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-clash font-bold text-sm">{author.full_name?.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <p className="font-clash font-bold text-[10px] text-[#94A3B8] uppercase tracking-widest leading-none mb-0.5">Author</p>
                  <p className="font-clash font-semibold text-[#1F2A44] text-sm">{author.full_name}</p>
                </div>
              </div>
            )}

            {author && <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block" />} */}

            {/* Date */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#94A3B8]" />
              <p className="font-clash font-semibold text-[#1F2A44] text-sm">{formatDate(publishDate)}</p>
            </div>

            <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block" />

            {/* Read time */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
              <p className="font-clash font-semibold text-[#1F2A44] text-sm">{readTime}</p>
            </div>

            <div className="w-px h-8 bg-[#E2E8F0] hidden sm:block" />

            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </section>

      {/* ── FEATURED IMAGE ── */}
      {post.featured_image_url && (
        <div className="bg-white py-8">
          <div className="container-custom max-w-3xl mx-auto">
            <div className="relative w-full h-[360px] lg:h-[460px] rounded-2xl overflow-hidden">
              <Image
                src={post.featured_image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* ── ARTICLE CONTENT ── */}
      <article className="bg-white py-12 pb-20">
        <div className="container-custom max-w-3xl mx-auto">
          <div
            className="case-study-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
              <p className="font-clash font-bold text-xs text-[#94A3B8] uppercase tracking-widest mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs font-clash font-semibold rounded-full bg-[#F4F6F9] border border-[#E2E8F0] text-[#64748B]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom share */}
          <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex items-center justify-between flex-wrap gap-4">
            <p className="font-clash font-semibold text-sm text-[#64748B]">Found this useful? Share it.</p>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </article>

      {/* ── CTA ── */}
      <section className="bg-[#1F2A44] py-20">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <p className="font-clash font-bold text-[#A2D2FF] text-sm uppercase tracking-widest mb-4">Work with us</p>
          <h2 className="text-3xl lg:text-4xl font-clash font-bold text-white mb-4">Ready to apply this to your organization?</h2>
          <p className="font-jakarta text-white/60 mb-8 leading-relaxed max-w-lg mx-auto">
            Tell us what you want to build and we will get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/start" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1F2A44] rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group">
              Submit Your Brief
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white rounded-full font-clash font-semibold transition-all duration-300 hover:border-white/50">
              Explore Options
            </Link>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-custom max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-clash font-bold text-2xl text-[#1F2A44]">Related Insights</h2>
              <Link href="/insights" className="inline-flex items-center gap-1 text-sm font-clash font-semibold text-[#0e5d7d] hover:gap-2 transition-all duration-200">
                See all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} href={`/insights/${r.slug}`} className="group bg-white rounded-2xl border-2 border-[#E2E8F0] hover:border-[#1F2A44] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                  {r.featured_image_url ? (
                    <div className="relative w-full h-40 overflow-hidden flex-shrink-0">
                      <Image src={r.featured_image_url} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-[#1F2A44] to-[#0e5d7d] flex items-center justify-center flex-shrink-0">
                      <span className="font-clash font-bold text-white/10 text-6xl select-none">{r.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {r.category && (
                      <span className="inline-block px-2.5 py-1 bg-[#E6EAF0] text-[#1F2A44] text-xs font-clash font-bold rounded-full mb-3 self-start">
                        {r.category}
                      </span>
                    )}
                    <h3 className="font-clash font-bold text-[#1F2A44] mb-2 group-hover:text-[#0e5d7d] transition-colors line-clamp-2 leading-snug text-sm">
                      {r.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-auto pt-3 border-t border-[#F4F6F9] text-[#1F2A44] font-clash font-bold text-sm group-hover:gap-2 transition-all duration-200">
                      Read More <ChevronRight className="w-4 h-4" />
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
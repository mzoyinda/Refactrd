// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import { ArrowRight, ChevronRight } from "lucide-react";

// const projects = [
//   {
//     id: 1,
//     category: "AI · Compliance & Risk",
//     title: "AI Fraud Detection & AML System",
//     description:
//       "A machine learning system that monitors transactions in real time, flags suspicious activity, and generates explainable outputs for compliance teams.",
//     resultLine: "Reduced manual review time while improving detection accuracy across fragmented compliance workflows.",
//     whatReplaced:
//       "Manual transaction review and fragmented AML compliance workflows across multiple teams.",
//     tags: ["Machine Learning", "Real-Time Detection", "AML Compliance", "Fintech"],
//     slug: "ai-fraud-detection-aml-system",
//   },
//   {
//     id: 2,
//     category: "AI · Sales Intelligence",
//     title: "AI Sales Intelligence Tool",
//     description:
//       "An AI system that scores inbound leads automatically, surfaces deal risks before they go cold, and gives sales teams a live view of pipeline health.",
//     resultLine: "Eliminated hours of manual CRM updates and inconsistent lead qualification across the sales team.",
//     whatReplaced:
//       "Manual lead qualification, inconsistent follow-up, and hours spent updating CRM records that were already out of date.",
//     tags: ["AI Scoring", "Pipeline Intelligence", "Sales Tech", "CRM Automation"],
//     slug: "ai-sales-intelligence-tool",
//   },
//   {
//     id: 3,
//     category: "AI · RAG System",
//     title: "AI Legal Research Assistant",
//     description:
//       "An internal AI assistant built for a law firm, trained on case law, internal precedents, and regulatory documents. Lawyers ask questions in plain language and get sourced answers fast.",
//     resultLine: "Lawyers went from hours of manual research to sourced answers in under five minutes.",
//     whatReplaced:
//       "Hours of manual research across filing systems, databases, and document libraries.",
//     tags: ["RAG System", "Internal Copilot", "Legal Tech", "Knowledge Retrieval"],
//     slug: "ai-legal-research-assistant",
//   },
//   {
//     id: 4,
//     category: "AI · E-commerce · Agentic",
//     title: "AI Shopping Agent",
//     description:
//       "An agentic AI system embedded into an e-commerce platform that handles product discovery, personalised recommendations, and post-purchase follow-up autonomously.",
//     resultLine: "Replaced manual upsell campaigns and freed the support team from repeat order and tracking queries.",
//     whatReplaced:
//       "Generic product listings, manual upsell campaigns, and a support team fielding repeat order and tracking queries every day.",
//     tags: ["Agentic AI", "Product AI", "E-commerce", "Personalisation"],
//     slug: "ai-shopping-agent",
//   },
// ];

// export default function ProofOfWork() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setIsVisible(true);
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section ref={sectionRef} className="section-padding bg-white" id="work">
//       <div className="container-custom max-w-7xl">
//         {/* Header */}
//         <div className="max-w-4xl mb-16">
//           <span
//             className={`font-clash text-secondary font-semibold text-sm uppercase tracking-wider transition-all duration-700 ${
//               isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//             }`}
//           >
//             CASE STUDIES
//           </span>

//           <h2
//             className={`text-4xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-6 leading-tight mt-4 transition-all duration-1000 ease-out delay-100 ${
//               isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//             }`}
//           >
//             Transformation Stories
//           </h2>

//           <p
//             className={`text-lg lg:text-[18px] text-black leading-relaxed font-jakarta tracking-[-0.03em] transition-all duration-1000 ease-out delay-200 ${
//               isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//             }`}
//           >
//             Examples of how organizations have improved execution, reduced operational friction, and created measurable business outcomes through practical AI adoption.
//           </p>
//         </div>

//         {/* Projects Grid */}
//         <div className="grid lg:grid-cols-2 gap-6 mb-12">
//           {projects.map((project, index) => (
//             <div
//               key={project.id}
//               className={`group relative overflow-hidden rounded-2xl border-2 border-[#CBD5E1] hover:border-[#0e5d7d] transition-all duration-500 hover:shadow-xl bg-white ${
//                 isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//               }`}
//               style={{ transitionDelay: `${400 + index * 100}ms` }}
//             >
//               <div className="p-8 flex flex-col h-full">
//                 {/* Category Badge */}
//                 <div className="mb-4">
//                   <div className="inline-flex items-center px-3 py-1.5 bg-[#E6EAF0] text-[#1F2A44] text-xs font-clash font-bold rounded-full">
//                     Operational Challenge
//                   </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-3 transition-colors duration-300">
//                   {project.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-secondary leading-relaxed mb-4 font-jakarta tracking-[-0.03em]">
//                   {project.description}
//                 </p>

//                 {/* Result Line */}
//                 <div className="mb-4 p-3 bg-[#f0f7ff] rounded-lg border-l-4 border-[#A2D2FF]">
//                   <p className="text-sm text-[#1F2A44] font-jakarta tracking-[-0.03em] leading-relaxed">
//                     {project.resultLine}
//                   </p>
//                 </div>

//                 {/* What it Replaced */}
//                 <div className="mb-6 p-4 bg-[#E6EAF0]/30 rounded-lg border-l-4 border-[#0e5d7d]">
//                   <p className="text-xs font-clash font-bold text-secondary mb-2">
//                     What it replaced
//                   </p>
//                   <p className="text-sm text-[#1F2A44] font-jakarta tracking-[-0.03em] leading-relaxed">
//                     {project.whatReplaced}
//                   </p>
//                 </div>

//                 {/* Tags */}
//                 <div className="flex flex-wrap gap-2 mb-6">
//                   {project.tags.map((tag, tagIndex) => (
//                     <span
//                       key={tagIndex}
//                       className="px-3 py-1 text-xs font-clash font-semibold rounded-full bg-white border border-[#CBD5E1] text-[#64748B]"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Read Case Study CTA */}
//                 <div className="mt-auto">
//                   <Link
//                     href={`/case-studies/${project.slug}`}
//                     className="inline-flex items-center gap-2 text-[#0e5d7d] font-clash font-semibold text-sm group-hover:gap-3 transition-all duration-300"
//                   >
//                     Read Case Study
//                     <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <div
//           className={`text-center transition-all duration-1000 ease-out delay-1000 ${
//             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//           }`}
//         >
//           <Link
//             href="/case-studies"
//             className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group"
//           >
//             Explore More Case Studies
//             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cmsSupabase } from "@/lib/cms-supabase";
import { ArrowRight, ChevronRight, Loader2 } from "lucide-react";

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
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default function ProofOfWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await cmsSupabase
        .from("case_studies")
        .select("id, title, slug, client_name, industry, excerpt, results, tags, featured_image_url")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const accents = [
    { from: '#1F2A44', via: '#0e3a5c', to: '#0e5d7d' },
    { from: '#1a2d4a', via: '#0d3358', to: '#0a4a6e' },
    { from: '#162540', via: '#0b2f52', to: '#0c5068' },
    { from: '#1c2840', via: '#0c3555', to: '#0d5470' },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-white" id="work">
      <div className="container-custom max-w-7xl">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <span
            className={`font-clash text-secondary font-semibold text-sm uppercase tracking-wider transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            CASE STUDIES
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-6 leading-tight mt-4 transition-all duration-1000 ease-out delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Transformation Stories
          </h2>
          <p
            className={`text-lg lg:text-[18px] text-black leading-relaxed font-jakarta tracking-[-0.03em] transition-all duration-1000 ease-out delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Examples of how organizations have transformed operations, improved execution, and created measurable business outcomes through practical AI implementation.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#1F2A44] animate-spin" />
          </div>
        )}

        {/* Projects Grid */}
        {!loading && caseStudies.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {caseStudies.map((cs, index) => {
              const accent = accents[index % accents.length];
              return (
                <div
                  key={cs.id}
                  className={`group relative overflow-hidden rounded-2xl border-2 border-[#CBD5E1] hover:border-[#0e5d7d] transition-all duration-500 hover:shadow-xl bg-white flex flex-col ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  {/* Banner */}
                  {cs.featured_image_url ? (
                    <div className="relative w-full h-48 overflow-hidden">
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
                    <div
                      className="relative w-full h-48 overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${accent.from} 0%, ${accent.via} 50%, ${accent.to} 100%)` }}
                    >
                      {/* Dot grid */}
                      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.12 }} />
                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-24 h-24" style={{ background: 'linear-gradient(225deg, rgba(162,210,255,0.15) 0%, transparent 60%)' }} />
                      {/* Faded letter */}
                      <span className="absolute font-clash font-bold text-white select-none pointer-events-none leading-none" style={{ fontSize: '9rem', opacity: 0.07, bottom: '-1.5rem', right: '-0.5rem' }}>
                        {cs.title.charAt(0)}
                      </span>
                      {/* Decorative lines top-left */}
                      <div className="absolute left-5 top-5 flex flex-col gap-1.5">
                        <div className="h-px w-10 rounded-full" style={{ background: 'rgba(162,210,255,0.5)' }} />
                        <div className="h-px w-6 rounded-full" style={{ background: 'rgba(162,210,255,0.3)' }} />
                        <div className="h-px w-8 rounded-full" style={{ background: 'rgba(162,210,255,0.2)' }} />
                      </div>
                      {/* Bottom badges */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                        <div className="flex flex-col gap-1.5">
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
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] opacity-80" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] opacity-50" />
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] opacity-30" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <div className="inline-flex items-center px-3 py-1.5 bg-[#E6EAF0] text-[#1F2A44] text-xs font-clash font-bold rounded-full">
                        {cs.industry || "AI Engineering"}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-3 transition-colors duration-300 group-hover:text-[#0e5d7d]">
                      {cs.title}
                    </h3>

                    {/* Description */}
                    <p className="text-secondary leading-relaxed mb-4 font-jakarta tracking-[-0.03em]">
                      {cs.excerpt}
                    </p>

                    {/* Result */}
                    {cs.results && (
                      <div className="mb-6 p-3 bg-[#f0f7ff] rounded-lg border-l-4 border-[#A2D2FF]">
                        <p className="text-xs font-clash font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Result</p>
                        <p className="text-sm text-[#1F2A44] font-jakarta tracking-[-0.03em] leading-relaxed line-clamp-2">
                          {stripHtml(cs.results)}
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    {cs.tags && cs.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cs.tags.slice(0, 4).map((tag, i) => (
                          <span key={i} className="px-3 py-1 text-xs font-clash font-semibold rounded-full bg-white border border-[#CBD5E1] text-[#64748B]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        href={`/case-studies/${cs.slug}`}
                        className="inline-flex items-center gap-2 text-[#0e5d7d] font-clash font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                      >
                        Read Case Study
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state - fallback if no published case studies yet */}
        {!loading && caseStudies.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed border-[#E2E8F0] rounded-2xl mb-12">
            <p className="font-clash font-bold text-[#94A3B8]">Case studies coming soon</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className={`text-center transition-all duration-1000 ease-out delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-full font-clash font-bold transition-all duration-300 hover:scale-105 group"
          >
            Explore More Case Studies
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  Banknote,
  Briefcase,
  CheckCircle,
  Target,
  TrendingUp,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Job } from "@/data/jobs";

interface JobDescriptionProps {
  job: Job;
}

export default function JobDescription({ job }: JobDescriptionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleApplyClick = () => {
    trackEvent("career_apply_click", {
      position: job.title,
      action: "apply_now",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-32 pb-20 bg-gradient-to-br from-[#E6EAF0] via-white to-white"
    >
      <div className="container-custom max-w-5xl">
        {/* Back Button */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-[#64748B]  transition-colors duration-300 group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-clash font-medium">Back to Careers</span>
          </Link>
        </div>

        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] mb-6">
            {job.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <span className="inline-flex items-center gap-2 text-[#64748B]">
              <Briefcase className="w-5 h-5 text-secondary" />
              <span className="font-clash font-medium">{job.department}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-[#64748B]">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="font-clash font-medium">{job.location}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-[#64748B]">
              <Clock className="w-5 h-5 text-secondary" />
              <span className="font-clash font-medium">{job.type}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-[#64748B]">
              <Banknote className="w-5 h-5 text-secondary" />
              <span className="font-clash font-medium">{job.salary}</span>
            </span>
          </div>

          {/* Apply Button - Top */}
          <Link
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApplyClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-clash font-bold hover:bg-[#1F2A44] transition-all duration-300 hover:scale-105 group"
          >
            Apply Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* About Refactrd */}
          <div
            className={`bg-white rounded-2xl p-8 lg:p-10 border-2 border-[#CBD5E1] transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-clash font-bold text-[#1F2A44] mb-4">
              About Refactrd
            </h2>
            <div className="space-y-4 font-clash text-[#64748B] leading-relaxed">
              {job.aboutCompany.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === job.aboutCompany.length - 1
                      ? "font-semibold text-[#1F2A44]"
                      : ""
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Role Overview */}
          <div
            className={`bg-gradient-to-br from-[#5B6CFF]/5 to-[#A2D2FF]/5 rounded-2xl p-8 lg:p-10 border-2 border-[#A2D2FF]/30 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-clash font-bold text-[#1F2A44] mb-4">
              Role Overview
            </h2>
            <div className="space-y-4 font-clash text-[#64748B] leading-relaxed">
              {job.roleOverview.description.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    paragraph.includes("not just") ? "text-[#1F2A44] font-semibold" : ""
                  }
                >
                  {paragraph}
                </p>
              ))}
              {job.roleOverview.reportingTo && (
                <p className="text-black font-bold">
                  You will report directly to the {job.roleOverview.reportingTo}.
                </p>
              )}
            </div>
          </div>

          {/* Responsibilities */}
          <div
            className={`bg-white rounded-2xl p-8 lg:p-10 border-2 border-[#CBD5E1] transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-clash font-bold text-[#1F2A44] mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-secondary" />
              What You'll Be Responsible For
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {job.responsibilities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-[#E6EAF0]/50 rounded-xl hover:bg-[#A2D2FF]/20 transition-colors duration-300"
                >
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-[#1F2A44] font-clash">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div
            className={`bg-white rounded-2xl p-8 lg:p-10 border-2 border-[#CBD5E1] transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-clash font-bold text-[#1F2A44] mb-6">
              What We're Looking For
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-clash font-semibold text-secondary mb-4">
                  Required
                </h3>
                <div className="space-y-3">
                  {job.requirements.required.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-[#64748B] font-clash">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              {job.requirements.preferred && (
                <div>
                  <h3 className="text-xl font-clash font-semibold text-[#A2D2FF] mb-4">
                    Preferred
                  </h3>
                  <div className="space-y-3">
                    {job.requirements.preferred.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#A2D2FF] flex-shrink-0 mt-0.5" />
                        <span className="text-[#64748B]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Remuneration */}
          <div
            className={`bg-gradient-to-br from-[#A2D2FF]/10 to-[#5B6CFF]/5 rounded-2xl p-8 lg:p-10 border-2 border-[#A2D2FF]/30 transition-all duration-700 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-clash font-bold text-[#1F2A44] mb-6">
              Remuneration
            </h2>
            <div className="space-y-3">
              {job.remuneration.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl"
                >
                  
                  <span className="text-[#1F2A44] font-clash font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Metrics */}
          <div
            className={`bg-white rounded-2xl p-8 lg:p-10 border-2 border-[#CBD5E1] transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-clash font-bold text-[#1F2A44] mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-secondary" />
              How We'll Measure Your Success
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {job.successMetrics.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-[#E6EAF0]/50 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-[#1F2A44] font-clash">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div
            className={`bg-[#1B1B1B] rounded-2xl p-8 lg:p-10 text-white transition-all duration-700 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-clash font-bold mb-6">
              What You'll Gain
            </h2>
            <div className="space-y-3">
              {job.benefits.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 font-clash">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xl font-clash font-semibold text-white">
              {job.closingStatement}
            </p>
          </div>

          {/* Apply CTA - Bottom */}
          <div
            className={`bg-white rounded-2xl p-8 lg:p-10 border-2 border-[#A2D2FF] text-center transition-all duration-700 delay-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-4">
              Ready to Apply?
            </h3>
            <p className="text-[#64748B] font-clash mb-6 max-w-2xl mx-auto">
              Join us in building reliable software solutions and grow your career
              with real responsibility and impact.
            </p>
            <Link
              href={job.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-full font-clash font-bold hover:bg-[#1F2A44] transition-all duration-300 hover:scale-105 group cursor-pointer"
            >
              Apply for this Position
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
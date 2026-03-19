
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { jobs } from "@/data/jobs";

export default function OpenPositions() {
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

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-white to-[#E6EAF0]/30"
      id="open-positions"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2
            className={`text-4xl lg:text-5xl font-clash font-bold text-[#1F2A44] mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Open Positions
          </h2>
          <p
            className={`text-lg font-clash text-[#64748B] leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Explore current opportunities to join our team. We're always looking
            for talented individuals who share our values.
          </p>
        </div>

        {/* Positions List */}
        {jobs.length > 0 ? (
          <div className="space-y-6 max-w-4xl">
            {jobs.map((job, index) => (
              <Link
                key={job.slug}
                href={`/careers/${job.slug}`}
                onClick={() =>
                  trackEvent("career_position_click", {
                    position_title: job.title,
                    department: job.department,
                  })
                }
                className={`group block bg-white rounded-2xl p-8 border-2 border-[#CBD5E1] hover:border-secondary transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-2  transition-colors duration-300">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="inline-flex font-clash items-center gap-1 text-sm text-[#64748B]">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="inline-flex font-clash items-center gap-1 text-sm text-[#64748B]">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="inline-flex font-clash items-center gap-1 text-sm text-[#64748B]">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                    <p className="text-[#64748B] leading-relaxed font-clash">
                      {job.shortDescription}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-clash font-semibold group-hover:bg-[#1F2A44] transition-all duration-300 group-hover:gap-3 cursor-pointer">
                      <span>View Details</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-1 bg-gradient-to-r from-[#A2D2FF] to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-[#CBD5E1]">
            <Briefcase className="w-16 h-16 text-[#64748B] mx-auto mb-4" />
            <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-3">
              No Open Positions Right Now
            </h3>
            <p className="text-[#64748B] mb-6">
              We're not currently hiring, but we'd love to hear from you for future
              opportunities.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#5B6CFF] text-white rounded-full font-clash font-semibold hover:bg-[#1F2A44] transition-all duration-300"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "AI Contract Generator",
    description:
      "A web app that generates fully formatted legal contracts in real-time based on user input.",
    category: "AI/Automation",
    image: "/images/ai-contract-read-cover.png",
    href: "https://ai-contract-generator-five.vercel.app/",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "SongDis",
    description:
      "Music distribution platform connecting independent artists with global streaming services and digital stores.",
    category: "Web Application",
    image: "/images/songdis-cover.png",
    href: "https://songdis.com",
    color: "from-purple-500 to-indigo-600",
  },
  {
    title: "AI Powered Fraud Detection and AML System",
    description:
      "Advanced machine learning system for real-time fraud detection and anti-money laundering compliance.",
    category: "AI/Automation",
    image: "/images/fraud-new.png",
    href: "/",
    color: "from-red-500 to-rose-600",
  },
  {
    title: "Melly AI Suite",
    description:
      "Comprehensive AI-powered productivity suite with intelligent automation and workflow optimization.",
    category: "AI/Automation",
    image: "/images/melly-new.png",
    href: "/",
    color: "from-blue-500 to-cyan-600",
  },
  {
    title: "WriteTech Hub",
    description:
      "Technical writing platform and documentation management system for engineering teams.",
    category: "Web Application",
    image: "/images/wth.png",
    href: "https://writetechhub.org",
    color: "from-orange-500 to-amber-600",
  },
];

export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
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
      id="projects-list"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className={`text-4xl lg:text-5xl font-clash font-bold text-[#1F2A44] mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Selected Projects
          </h2>
          <p
            className={`font-clash text-lg text-[#64748B] transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            A showcase of the software products, systems, and automation we've
            delivered for our clients.
          </p>
        </div>

        {/* Projects Grid - 2 Columns */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-white rounded-3xl overflow-hidden border-2 border-[#CBD5E1] hover:border-[#A2D2FF] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[#E6EAF0] to-[#A2D2FF]/20 overflow-hidden">
                {/* Placeholder - Replace with actual images */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#A2D2FF]/20 to-[#A2D2FF]/10">
                  <div className="text-center p-8">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${project.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl`}
                    >
                      <span className="text-white text-3xl font-clash font-bold">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    <p className="text-[#64748B] text-sm">Project Screenshot</p>
                  </div>
                </div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm text-[#1F2A44] rounded-full text-sm font-clash font-semibold shadow-lg">
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#1F2A44]/0 group-hover:bg-[#1F2A44]/20 transition-all duration-500" />
              </div>

              {/* Project Info */}
              <div className="p-8">
                <h3 className="text-2xl font-clash font-bold text-[#1F2A44] mb-3 group-hover:text-[hover:] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-clash text-[#64748B] leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* View Project Link */}
                <div className="flex items-center gap-2 text-[#A2D2FF] font-clash font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Project Link</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom border animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A2D2FF] to-[#A2D2FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-block bg-white rounded-2xl p-8 lg:p-10 border-2 border-[#A2D2FF]/30">
            <p className="font-clash text-lg text-[#64748B] mb-6">
              Want to see how we can help your business?
            </p>
            <Link
              href="https://cal.com/refactrd/technical-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 hover:bg-[#A2D2FF] text-white rounded-full font-clash font-bold bg-[#1F2A44] transition-all duration-300 hover:scale-105 group"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

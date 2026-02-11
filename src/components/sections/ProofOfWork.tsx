"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";

const workCategories = [
  "Customer-facing applications",
  "Internal business and operational systems",
  "Automated workflows",
  "Technical documentation and onboarding materials",
];

const projects = [
  {
    title: "SongDis",
    description: "A music distribution platform connecting artists with global streaming services",
    category: "Web Application",
    image: "/images/songdis-cover.png",
    href: "https://songdis.com",
    
  },
  {
    title: "AI Contract Generator",
    description: "The AI Contract Generator is an AI-powered web application built to allow users to create professional contracts efficiently",
    category: "AI",
    image: "/images/ai-contract-read-cover.png",
    href: "https://ai-contract-generator-five.vercel.app/",
  },
  {
    title: "AI- poweredFraud Detection & AML System",
    description: "An AI-driven fraud monitoring and detection tool. It provides real-time detection across multiple channels, monitors transactions for AML/CTF risks, offers explainable AI outputs for regulatory acceptance, and automates compliance workflows to reduce operational costs.",
    category: "AI",
    image: "/images/fraud-new.png",
    href: "/",
  },
 {
    title: "WriteTech Hub",
    description:
      "Technical writing platform and documentation management system for engineering teams.",
    category: "Website",
    image: "/images/wth.png",
    href: "https://writetechhub.org",
  },
];

export default function ProofOfWork() {
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

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "web application":
        return "bg-accent text-white";
      case "website":
        return "bg-primary text-secondary";
      case "ai":
        return "bg-[#10B981] text-white";
      default:
        return "bg-tertiary text-secondary";
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white"
      id="work"
    >
      <div className="container-custom">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <h2
            className={`heading-lg text-secondary mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Excellence from Concept to Completion
          </h2>
          <p
            className={`body-lg text-[#64748B] mb-8 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Turning visionary ideas into impactful realities with precision and passion.
          </p>
          <p
            className={`body-lg text-[#64748B] transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            We have delivered software products, internal systems, automations,
            and documentation for organizations at different stages.
          </p>
        </div>

        {/* Work categories */}
        <div
          className={`bg-tertiary/30 rounded-2xl p-8 lg:p-10 mb-12 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-xl font-clash font-semibold text-secondary mb-6">
            Our work includes:
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {workCategories.map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-accent rounded-full" />
                <p className="font-clash text-[#0F172A]">{category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.href}
              className={`group relative overflow-hidden rounded-2xl bg-white border-2 border-[#CBD5E1] hover:border-[#A2D2FF] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${500 + index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-tertiary to-tertiary-dark overflow-hidden">
               
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <ExternalLink className="w-16 h-16 text-secondary/20 mx-auto mb-4" />
                    <p className="text-secondary/40 font-jakarta text-sm">
                      Project Image
                    </p>
                  </div>
                </div>
               
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
               
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`font-clash inline-block px-4 py-2 rounded-full text-sm font-semibold ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/20 transition-all duration-500" />
              </div>

              {/* Project Info */}
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl font-clash font-bold text-secondary mb-3 group-hover:text-[#A2D2FF] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-clash text-[#64748B] mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                

                {/* View Project Link */}
                <div className="font-clash flex items-center gap-2 text-[#1F2A44] font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>View Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center transition-all duration-700 delay-900 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-clash text-lg text-[#64748B] mb-6">
            Selected projects and case studies are available below
          </p>
          <Link
            href="/projects"
            className="font-clash inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
          >
            View our work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
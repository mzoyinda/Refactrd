"use client";

import Link from "next/link";
import Image from "next/image";
import { FaProjectDiagram, FaBriefcase } from "react-icons/fa";

export function GlobalOpportunities() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 font-heading">
            Connect with Global Careers
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 font-heading">
            Talents and Exciting Available Projects
          </p>
        </div>

        {/* Cards Grid - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-4 md:gap-6">
          {/* LEFT COLUMN - Two stacked cards */}
          <div className="flex flex-col gap-4 md:gap-6">
            {/* Card 1: Bring Your Own Talents - Top Left */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 h-auto lg:h-fit flex flex-col">
              {/* Icon/Illustration */}
              <div className="mb-4 md:mb-6 relative w-full h-32 md:h-40 lg:h-40 -mt-8 flex-shrink-0">
                <Image
                  src="/images/world.svg"
                  alt="World globe illustration"
                  fill
                  className="object-contain object-top"
                />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full mb-3 md:mb-4 w-fit">
                <FaBriefcase className="w-4 h-4" />
                <span className="text-xs font-semibold">B.Y.O.T</span>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
                Bring Your Own Talents
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed flex-grow">
                Already have candidates and need structured vetting? We can
                assess technical and professional readiness using the same
                standards applied across our network.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-purple-600 text-white font-normal px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  Start Now!
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center bg-white text-gray-900 font-normal px-6 py-3 rounded-full hover:bg-gray-50 transition-all duration-200 border border-gray-300 hover:border-gray-400 text-base"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Card 3: Available Projects - Bottom Left */}
         
          </div>

          {/* RIGHT COLUMN - Single tall card */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 h-auto lg:h-[452px] flex flex-col">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full mb-3 md:mb-4 w-fit">
              <FaBriefcase className="w-4 h-4" />
              <span className="text-xs font-semibold">Quality Roles</span>
            </div>

            {/* Content */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3">
              Available Roles
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">
              We support hiring across product, platform, and infrastructure teams for companies building and scaling distributed systems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-purple-600 text-white font-normal px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm md:text-base"
              >
                Explore Refriend Roles
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-white text-gray-900 font-normal px-6 py-3 rounded-full hover:bg-gray-50 transition-all duration-200 border border-gray-300 hover:border-gray-400 text-base"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Illustration - Takes up remaining space */}
            <div className="relative w-full flex-grow min-h-[300px] md:min-h-[100px] -mb-6 lg:min-h-0">
              <Image
                src="/images/tower.svg"
                alt="Building tower illustration"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

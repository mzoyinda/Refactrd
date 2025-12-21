"use client";

import Link from "next/link";
import { FaRocket } from "react-icons/fa";

export function FreelanceCTA() {
  return (
    // <section className="py-20 bg-gradient-to-b from-white to-gray-50">
    <section className="py-2 lg:py-20  bg-[radial-gradient(#e9d5ff_1px,transparent_1px)] [background-size:24px_24px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
        {/* CTA Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 lg:p-12">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-6">
              <FaRocket className="w-4 h-4" />
              <span className="text-sm font-semibold">Start Now!</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Find Freelance Talents
            </h2>

            <p className="text-3xl lg:text-4xl font-bold text-purple-600 mb-6">
              For Your Business Today!
            </p>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
              From tech experts to creative professionals, we've got you covered
              for all your business needs, connecting you with top freelance
              talents quickly, reliably, and hassle-free.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-purple-600 text-white font-normal px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Start Hiring Now
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-gray-900 font-normal px-6 py-3 rounded-full hover:bg-gray-50 transition-all duration-200 border border-gray-300 hover:border-gray-400 text-base"
              >
                Apply as Freelancer
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
        </div>
      </div>
    </section>
  );
}
// src/components/sections/Hero.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { MdVerified } from "react-icons/md";

export function Hero() {
  return (
    <section className="pt-32 pb-16 lg:pb-24 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2.5 rounded-full animate-fade-in">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-normal font-body">
                #1 Remote Engineering Platform
              </span>
            </div>

            {/* Main Headline */}

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
              <span className="text-gray-900 font-body">Global hiring for </span>
              <span className="text-purple-600 font-body">
                exceptional African
              </span>
              <span className="text-gray-900 font-body"> engineering talent!</span>
            </h1>

       

            {/* Subheadline */}
            <p className="text-base lg:text-[18px] text-gray-600 leading-[32px] max-w-xl animate-slide-up animation-delay-100">
              We help startups and global companies hire top-tier{" "}
              <span className="font-semibold text-gray-900">
                top-tier African engineers {" "}
              </span>
              for remote, full-time roles. Through a highly selective vetting
              process, we connect you with engineers who meet global standards,
              without the cost, noise, or inefficiency of traditional hiring.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up animation-delay-300">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base"
              >
                Start Hiring Now
              </Link>
              {/* <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-all duration-200 border border-gray-300 hover:border-gray-400 text-base"
              >
                Apply as a Talent
              </Link> */}
            </div>
           
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[600px] flex items-center justify-center order-first lg:order-last">
            <div className="relative w-full h-full animate-fade-in animation-delay-200">
              <Image
                src="/images/hero-image.png"
                alt="Talented remote engineers from Refactrd"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out backwards;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </section>
  );
}

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
            {/* <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2.5 rounded-full animate-fade-in">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-normal font-body">
                #1 Remote Engineering Platform
              </span>
            </div> */}

            {/* Main Headline */}
            {/* <h1 className="text-5xl lg:text-6xl font-bold leading-tight animate-slide-up">
              <span className="text-gray-900 font-body">Hire talents you </span>
              <span className="text-purple-600 font-body">
                literally cannot
              </span>
              <span className="text-gray-900 font-body"> find elsewhere!</span>
            </h1> */}

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

            {/* Stats Row */}
            {/* <div className="flex flex-wrap items-center gap-6 animate-slide-up animation-delay-200">
             
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="/images/user-1.jpg"
                      alt="Talent avatar"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="/images/user-2.jpg"
                      alt="Talent avatar"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="/images/user-3.jpg"
                      alt="Talent avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <span className="text-gray-700 font-semibold">
                  31K+ Talents
                </span>
              </div>

         
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <MdVerified className="text-[25px] text-green-600" />
                </div>
                <span className="text-gray-700 font-semibold">
                  Verified profiles
                </span>
              </div>
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up animation-delay-300">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base"
              >
                Start Hiring Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-50 transition-all duration-200 border border-gray-300 hover:border-gray-400 text-base"
              >
                Apply as a Talent
              </Link>
            </div>

            {/* Social Proof */}
            {/* <div className="flex flex-wrap items-center gap-8 pt-4 animate-slide-up animation-delay-400">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <span className="text-gray-600 font-medium">
                  +500 Companies trust us
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-900 font-semibold">4.8/5</span>
                <span className="text-gray-600 font-medium">Rating</span>
              </div>
            </div> */}
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

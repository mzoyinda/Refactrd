'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function ImplementationHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const carouselImages = [
    {
      src: '/images/ai-dashboard.jpg',
      alt: 'AI Dashboard in action',
      caption: 'Live AI Operations Dashboard',
    },
    {
      src: '/images/ai-workflow.jpg',
      alt: 'Automated workflow',
      caption: 'Automated Workflow Pipeline',
    },
    {
      src: '/images/ai-analytics.jpg',
      alt: 'Real-time analytics',
      caption: 'Real-time Performance Analytics',
    },
  ];

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate carousel
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-32 pb-20">
      {/* Subtle animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-[#A2D2FF]/20 to-transparent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-[#daeeff]/30 to-transparent rounded-full blur-3xl animate-pulse-slower" />
      </div>

      {/* LEFT SIDE BIGGER: 60% text, 40% carousel */}
      <div className="container max-w-[1300px] mx-auto px-[5vw] relative z-10">
        <div className="grid lg:grid-cols-[58%_42%] gap-12 items-center">
          {/* LEFT SIDE - Content with better readability */}
          <div className="space-y-7">
            {/* Main Heading - Clear and Bold */}
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <h1 className="text-[40px] md:text-5xl lg:text-[49px] font-clash font-extrabold text-[#1F2A44] leading-[45px] lg:leading-[58px] mb-7">
                <span className="block">Get Your first AI employee.</span>
                <span className="block text-[#5a6580] mt-1">Free. 3 Weeks. No Risk.</span>
              </h1>

              <div className="w-20 h-1.5 bg-gradient-to-r from-[#A2D2FF] to-[#1F2A44] rounded-full" />
            </div>

            {/* Description - Larger, more readable */}
            <p
              className={`font-clash text-lg text-[#5a6580] leading-[1.75] transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              We'll identify the manual work slowing your startup down, build a custom AI solution to automate it, and let you test it free for 3 weeks. Subscribe only if you see results.
            </p>

            {/* Key Points - More spacing */}
            <div
              className={`space-y-4 pt-2 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {[
                'Free business audit (no commitment)',
                '3-week free trial (run it live)',
                'Subscribe for $100/month (only if it works)',
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#A2D2FF] to-[#1F2A44] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                  <span className="font-clash text-base font-semibold text-[#1F2A44] leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs - Bold and Clear */}
            <div
              className={`flex flex-wrap justify-center lg:justify-start items-center gap-4 pt-6 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                href="https://forms.gle/sE5AhgZQrUN3mbC2A"
                target="_blank"
                rel="noopener noreferrer"
                className="font-clash inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
              >
                <span className="relative z-10">Join the Waitlist</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <p className="font-clash text-sm text-[#5a6580]">
                Limited slots available • Cohort 1 launching soon
              </p>
            </div>

            {/* Trust Indicator */}
            <p
              className={`font-clash text-sm text-[#5a6580] flex items-center justify-center lg:justify-start gap-2.5 pt-1 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#639922]" />
              New Program • Cohort 1 • Launching June 2026
            </p>
          </div>

          {/* RIGHT SIDE - Image Carousel (BIGGER NOW - 62%) */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* Main carousel container */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#DDE3EE]/50 bg-[#1F2A44]">
              {/* Gradient overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/60 via-transparent to-transparent z-10 pointer-events-none" />

              {/* Images */}
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ${
                    index === currentImage
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#DDE3EE]/50 shadow-lg">
                  <p className="text-sm font-semibold text-[#1F2A44]">
                    {carouselImages[currentImage].caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Carousel indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? 'w-8 bg-[#1F2A44]'
                      : 'w-2 bg-[#DDE3EE] hover:bg-[#A2D2FF]'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Floating accent elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#A2D2FF]/30 to-transparent rounded-full blur-2xl animate-pulse-slow pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr from-[#daeeff]/40 to-transparent rounded-full blur-2xl animate-pulse-slower pointer-events-none" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.08);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
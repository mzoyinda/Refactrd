'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    src: '/images/ai-dashboard.jpg',
    alt: 'AI dashboard running live',
    tag: 'Live Operations Dashboard',
    stat: '10 hrs',
    statLabel: 'saved per week',
  },
  {
    src: '/images/ai-workflow.jpg',
    alt: 'Automated workflow pipeline',
    tag: 'Automated Workflow Pipeline',
    stat: '3 weeks',
    statLabel: 'from build to live',
  },
  {
    src: '/images/ai-analytics.jpg',
    alt: 'Real-time performance analytics',
    tag: 'Performance Analytics',
    stat: '$0',
    statLabel: 'unless it delivers',
  },
];

const proofPoints = [
  'Custom AI built for your exact bottleneck — not a generic tool',
  'Deployed live in your real operations from day one',
  'You decide whether to continue after the three-week trial',
];

export default function StartupsLaunchpadHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      goToNext();
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToPrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 300);
  };

  const goTo = (index: number) => {
    if (index === current) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-28 pb-20 lg:pt-32">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#A2D2FF]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#daeeff]/30 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-[1300px] mx-auto px-[5vw] relative z-10">
        <div className="grid lg:grid-cols-[55%_45%] gap-10 xl:gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="space-y-6">
            {/* Label */}
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-xs font-clash font-bold tracking-[0.25em] uppercase text-[#5a6580]">
                AI Operations · Early-Stage Startups
              </span>
            </div>

            {/* Headline */}
            <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-[42px] md:text-5xl lg:text-[54px] font-clash font-extrabold text-[#1F2A44] leading-[1.07] tracking-tight">
                Your first AI system.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1F2A44] to-[#5a7fc4]">
                  Built, Deployed, and Tested.
                </span>
                <br />At no cost.
              </h1>
              <div className="mt-5 w-14 h-[3px] bg-[#A2D2FF] rounded-full" />
            </div>

            {/* Subheadline */}
            <p className={`text-[17px] text-[#5a6580] leading-[1.75] max-w-[560px] font-jakarta transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              We find the exact workflow eating your team&apos;s hours, build custom AI to automate it, and deploy it live in your operations. You test it for three weeks. No payment unless it actually delivers.
            </p>

            {/* Proof Points */}
            <div className={`space-y-3 pt-1 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {proofPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#1F2A44] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 10">
                      <path d="M1 5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-jakarta text-[15px] text-[#1F2A44] leading-snug">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`flex flex-wrap items-center gap-4 pt-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a
                href="https://forms.gle/sE5AhgZQrUN3mbC2A"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-[#1F2A44] text-white font-clash font-bold px-8 py-4 rounded-full hover:bg-[#2d3e62] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="font-clash text-sm text-[#5a6580]">Applications reviewed on a rolling basis</span>
            </div>

            {/* Trust row */}
            <div className={`flex flex-wrap gap-6 pt-2 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {['No upfront payment', 'Response in 3–5 days', 'Walk away if it fails'].map((t, i) => (
                <span key={i} className="font-jakarta text-xs text-[#5a6580] flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#639922]" fill="none" viewBox="0 0 14 14">
                    <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Carousel ── */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Main image container */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#1F2A44]">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/80 via-transparent to-transparent z-10 pointer-events-none" />

              {/* Images */}
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === current
                      ? isAnimating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Bottom card overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between gap-4 shadow-lg">
                  <div>
                    <p className="text-xs font-clash font-bold text-[#5a6580] uppercase tracking-wider mb-0.5">
                      {slides[current].tag}
                    </p>
                    <p className="font-clash font-extrabold text-2xl text-[#1F2A44] leading-none">
                      {slides[current].stat}
                    </p>
                    <p className="text-xs font-jakarta text-[#5a6580] mt-0.5">{slides[current].statLabel}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#1F2A44] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#A2D2FF]" fill="none" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Nav arrows */}
              <button
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[#1F2A44]" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-[#1F2A44]" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-[#1F2A44]' : 'w-2 bg-[#DDE3EE] hover:bg-[#A2D2FF]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Floating badge top-right */}
            <div className="absolute -top-4 -right-4 bg-[#1F2A44] text-white rounded-2xl px-4 py-3 shadow-xl hidden lg:flex flex-col items-center">
              <span className="font-clash font-extrabold text-2xl text-[#A2D2FF]">Live AI</span>
              <span className="font-clash text-xs text-white/60 mt-0.5">In Production</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

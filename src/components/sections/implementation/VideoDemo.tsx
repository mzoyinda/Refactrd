'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';

export default function VideoDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section className="py-20 md:py-18 bg-gradient-to-b from-white to-[#F9FAFC]">
        <div className="container max-w-[1100px] mx-auto px-[5vw]">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#5a6580] mb-4">
              See it in action
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-clash font-bold text-[#1F2A44] mb-4">
              Watch How it Works
            </h2>
            <p className="font-clash text-lg text-[#5a6580] max-w-[600px] mx-auto leading-relaxed">
              A 3-minute walkthrough of what deploying an AI role actually looks like,
              from audit to handover.
            </p>
          </div>

          {/* Video Thumbnail */}
          <div className="relative group cursor-pointer" onClick={openModal}>
            {/* Thumbnail Container */}
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-2 border-[#DDE3EE] bg-gradient-to-br from-[#1F2A44] via-[#2a3a5c] to-[#1F2A44] transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.02]">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A44]/80 via-[#1F2A44]/40 to-transparent z-10" />

              {/* Replace this with your actual video thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-6 z-20">
                  {/* Play Button */}
                  <div className="relative inline-flex">
                    {/* Pulse Ring */}
                    <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
                    <span className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                    
                    {/* Main Play Button */}
                    <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#A2D2FF]">
                      <Play className="w-9 h-9 text-[#1F2A44] ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Text Below Play Button */}
                  <div className="space-y-2">
                    <p className="font-clash text-white font-bold text-xl">Watch Demo</p>
                    <p className="font-clash text-white/80 text-sm">3 min overview</p>
                  </div>
                </div>
              </div>

              {/* Optional: Add actual thumbnail image */}
              {/* <Image 
                src="/images/video-thumbnail.jpg" 
                alt="Video thumbnail" 
                fill 
                className="object-cover"
              /> */}
            </div>

            {/* Floating Accent Elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#A2D2FF]/20 to-transparent rounded-full blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-75" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-tr from-[#daeeff]/20 to-transparent rounded-full blur-2xl pointer-events-none transition-opacity duration-500 group-hover:opacity-75" />
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group z-50"
            aria-label="Close video"
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Video Container */}
          <div
            className="relative w-full max-w-5xl mx-4 aspect-video rounded-2xl overflow-hidden shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Replace with your actual video embed */}
            {/* Example for YouTube */}
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
              title="Implementation Program Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

            {/* Example for Loom */}
            {/* <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.loom.com/embed/YOUR_LOOM_ID?autoplay=1"
              title="Implementation Program Demo"
              allowFullScreen
            /> */}

            {/* Example for Vimeo */}
            {/* <iframe
              className="absolute inset-0 w-full h-full"
              src="https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1"
              title="Implementation Program Demo"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            /> */}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
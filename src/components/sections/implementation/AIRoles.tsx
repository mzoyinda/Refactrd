'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Settings, MessageSquare, Headphones, BarChart, Phone, Sparkles } from 'lucide-react';

const aiRoles = [
  {
    icon: Settings,
    title: 'AI Operations Assistant',
    tagline: 'Automate the autopilot work',
    description:
      'Repetitive internal workflows, system updates, task execution. The work your team does on autopilot that still eats hours every week.',
    examples: ['Daily report generation', 'Data entry & validation', 'Status updates', 'File processing'],
    gradient: 'from-[#A2D2FF] to-[#1F2A44]',
    accentColor: '#A2D2FF',
    image: '/images/ai-operations.jpg', // Your image path
  },
  {
    icon: MessageSquare,
    title: 'AI Sales Rep',
    tagline: 'Never miss a lead again',
    description:
      'Lead response, qualification, follow-ups, and call booking. Handles the top of your pipeline so your team focuses on closing.',
    examples: ['Lead qualification', 'Email follow-ups', 'Meeting scheduling', 'CRM updates'],
    gradient: 'from-[#639922] to-[#4a7218]',
    accentColor: '#639922',
    image: '/images/ai-sales.jpg', // Your image path
  },
  {
    icon: Headphones,
    title: 'AI Support Agent',
    tagline: 'First-line support that never sleeps',
    description:
      'Customer queries, knowledge responses, and escalation routing. First-line support that never sleeps and never drops context.',
    examples: ['Ticket triage', 'FAQ responses', 'Issue routing', 'Customer updates'],
    gradient: 'from-[#5B6CFF] to-[#2a3a5c]',
    accentColor: '#5B6CFF',
    image: '/images/ai-support.jpg', // Your image path
  },
  {
    icon: BarChart,
    title: 'AI Research Analyst',
    tagline: 'From raw data to insights',
    description:
      'Data gathering, summarization, and reporting. Turns raw inputs into structured outputs your team can actually act on.',
    examples: ['Market research', 'Competitive analysis', 'Report generation', 'Data synthesis'],
    gradient: 'from-[#FF6B6B] to-[#8B0000]',
    accentColor: '#FF6B6B',
    image: '/images/ai-research.jpg', // Your image path
  },
  {
    icon: Phone,
    title: 'AI Voice Agent',
    tagline: 'Real conversations, zero hold time',
    description:
      'Inbound and outbound voice workflows: intake calls, qualification, follow-up, and routing. Real-time speech handling with full call logging.',
    examples: ['Phone screening', 'Appointment booking', 'Customer intake', 'Call summaries'],
    gradient: 'from-[#A2D2FF] to-[#5B6CFF]',
    accentColor: '#A2D2FF',
    image: '/images/ai-voice.jpg', // Your image path
  },
];

export default function AIRoles() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection Observer
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

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % aiRoles.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + aiRoles.length) % aiRoles.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % aiRoles.length);
    setIsAutoPlaying(false);
  };

  const activeRole = aiRoles[activeIndex];
  const Icon = activeRole.icon;

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-[#F9FAFC] to-white relative overflow-hidden"
      id="roles"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#daeeff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-[1300px] mx-auto px-[5vw] relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-[#1F2A44] to-[#2a3a5c] text-white border border-[#A2D2FF]/30 rounded-full px-5 py-2 mb-6 shadow-lg transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#A2D2FF]" />
            <span className="font-clash text-sm font-bold tracking-wider uppercase">What we deploy</span>
          </div>

          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-clash font-extrabold text-[#1F2A44] mb-5 leading-tight transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            The repetitive work goes to AI.
            <br />
            <span className="text-[#5a6580]">The real work stays with your team.</span>
          </h2>

          <p
            className={`font-jakarta text-lg text-[#5a6580] max-w-[700px] mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Each role we build takes ownership of a defined function, the volume work, the
            triage, the follow-ups, so the people you hired for judgment can actually use it.
          </p>
        </div>

        {/* Main Carousel Card */}
        <div
          className={`relative transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Large Feature Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-[#DDE3EE] overflow-hidden">
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${activeRole.gradient} opacity-5 transition-all duration-700`}
            />

            <div className="relative z-10 grid lg:grid-cols-[60%_40%] gap-8 p-8 md:p-12">
              {/* Left: Content */}
              <div className="space-y-6">
                {/* Icon */}
                <div
                  className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${activeRole.gradient} items-center justify-center shadow-xl transition-all duration-500`}
                  style={{
                    boxShadow: `0 8px 24px ${activeRole.accentColor}40`,
                  }}
                >
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-clash font-extrabold text-[#1F2A44] mb-2">
                    {activeRole.title}
                  </h3>
                  <p className="font-jakarta text-lg font-bold text-[#5a6580]">{activeRole.tagline}</p>
                </div>

                {/* Description */}
                <p className="font-jakarta text-base text-[#5a6580] leading-relaxed">
                  {activeRole.description}
                </p>

                {/* Example Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {activeRole.examples.map((example, i) => (
                    <span
                      key={i}
                      className="font-jakarta inline-block px-4 py-2 bg-[#F9FAFC] border border-[#DDE3EE] rounded-full text-sm font-semibold text-[#1F2A44] hover:border-[#A2D2FF] hover:bg-[#daeeff]/30 transition-all duration-300"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Image */}
              <div className="flex items-center justify-center">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-[#DDE3EE]">
                  <Image 
                    src={activeRole.image}
                    alt={activeRole.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows - Positioned Outside Card */}
          <button
            onClick={goToPrevious}
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#DDE3EE] flex items-center justify-center shadow-xl hover:border-[#A2D2FF] hover:bg-[#daeeff]/30 transition-all duration-300 hover:scale-110 group z-20"
            aria-label="Previous role"
          >
            <ChevronLeft className="w-6 h-6 text-[#1F2A44] group-hover:text-[#1F2A44]" />
          </button>

          <button
            onClick={goToNext}
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#DDE3EE] flex items-center justify-center shadow-xl hover:border-[#A2D2FF] hover:bg-[#daeeff]/30 transition-all duration-300 hover:scale-110 group z-20"
            aria-label="Next role"
          >
            <ChevronRight className="w-6 h-6 text-[#1F2A44] group-hover:text-[#1F2A44]" />
          </button>
        </div>

        {/* Thumbnail Navigation - Smaller & Cleaner */}
        <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-4">
          {aiRoles.map((role, index) => {
            const RoleIcon = role.icon;
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 group relative transition-all duration-300 ${
                  isActive ? 'scale-105' : 'scale-100 hover:scale-105'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1F2A44] shadow-lg'
                      : 'bg-white border border-[#DDE3EE] hover:border-[#A2D2FF] hover:bg-[#F9FAFC]'
                  }`}
                >
                  <RoleIcon
                    className={`w-4 h-4 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-[#5a6580]'
                    }`}
                    strokeWidth={2}
                  />
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1F2A44]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="h-1 bg-[#DDE3EE] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#A2D2FF] to-[#1F2A44] transition-all duration-500 ease-out"
              style={{ width: `${((activeIndex + 1) / aiRoles.length) * 100}%` }}
            />
          </div>
          <div className="font-clash flex justify-between mt-2 text-xs text-[#5a6580] font-semibold">
            <span>
              {activeIndex + 1} / {aiRoles.length}
            </span>
            <span>{aiRoles[activeIndex].title}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping-slow {
          75%,
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }

        @keyframes ping-slower {
          75%,
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-ping-slower {
          animation: ping-slower 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}
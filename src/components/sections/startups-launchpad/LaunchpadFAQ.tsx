'use client';

import { useEffect, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'What kind of problems can the Launchpad solve?',
    a: 'The Launchpad works best for repetitive operational workflows that eat your team\'s time, manual reporting, support ticket triage, onboarding documentation, data entry across tools, recurring admin tasks. If it\'s repetitive and currently manual, we can almost certainly automate it.',
  },
  {
    q: 'How is this different from just hiring a developer?',
    a: 'We\'re not building custom software from scratch. We use AI tools and automation platforms to solve a specific workflow problem fast. A developer would take months and cost significantly more. We deliver in weeks, and the solution keeps running after we hand it over, without an engineering team to maintain it.',
  },
  {
    q: 'Do we need technical expertise on our team?',
    a: 'No. We handle all the technical work. You need one person who understands the workflow problem well enough to walk us through it during the mapping call, and who can test the solution during the trial. That\'s it.',
  },
  {
    q: 'What happens during the three-week trial?',
    a: 'The solution runs live in your operations. Your team uses it daily with real data and real workflows. We monitor it constantly, fix any issues within 24 hours, and track the metrics we agreed on before the build. You\'re never on your own.',
  },
  {
    q: 'Can we expand to other workflows after the trial?',
    a: 'Yes. If the trial delivers results and you want to continue, we can discuss adding workflows one at a time. Most startups start with one bottleneck, see real results, and expand from there. We\'d rather prove value first than build everything upfront.',
  },
  {
    q: 'How many startups do you accept at a time?',
    a: 'We deliberately limit how many startups we take on at once to ensure we can deliver quality to every one we accept. If your application is a strong fit, you\'ll hear from us within three to five business days. If it\'s not, we\'ll tell you honestly and point you somewhere more useful.',
  },
  {
    q: 'I\'m not sure what my biggest bottleneck is. Can I still apply?',
    a: 'The Launchpad is not the right fit if you don\'t have a specific problem identified yet. Start with the free AI Mapping Call instead. it\'s designed for exactly this moment and will give you clarity on where to focus before you commit to anything bigger.',
  },
];

export default function LaunchpadFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-14 md:py-16 bg-[#F9FAFC]">
      <div className="container max-w-[1100px] mx-auto px-[5vw]">

        {/* Header */}
        <div className={`mb-8 grid lg:grid-cols-2 gap-8 items-end transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div>
            <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">FAQ</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-clash font-bold text-[#1F2A44] leading-tight">
              Common questions about the Launchpad.
            </h2>
          </div>
          <p className="font-jakarta text-[16px] text-[#5a6580] leading-relaxed lg:pb-2">
            Still have something we haven&apos;t covered? Apply and ask us directly in your application. We respond to every submission personally, not with an autoresponder.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className={`space-y-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#1F2A44]/20 shadow-md'
                    : 'bg-white border-[#DDE3EE] hover:border-[#1F2A44]/20 hover:shadow-sm'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-6 p-6 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className={`font-clash font-bold text-[16px] leading-snug transition-colors ${isOpen ? 'text-[#1F2A44]' : 'text-[#1F2A44]'}`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-[#1F2A44]' : 'bg-[#F0F4F8] group-hover:bg-[#E8EDF5]'
                  }`}>
                    {isOpen
                      ? <Minus className="w-4 h-4 text-white" strokeWidth={2} />
                      : <Plus className="w-4 h-4 text-[#5a6580]" strokeWidth={2} />
                    }
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-72' : 'max-h-0'}`}>
                  <div className="px-6 pb-6">
                    <div className="h-px bg-[#DDE3EE] mb-4" />
                    <p className="font-jakarta text-[15px] text-[#5a6580] leading-relaxed max-w-[680px]">
                      {faq.a.includes('Mini Consultation') ? (
                        <>
                          {faq.a.split('Mini Consultation ($99)')[0]}
                          <a href="/consultation" className="text-[#1F2A44] font-semibold underline underline-offset-2 hover:text-[#5a6580] transition-colors">
                            Mini Consultation ($99)
                          </a>
                          {faq.a.split('Mini Consultation ($99)')[1]}
                        </>
                      ) : faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

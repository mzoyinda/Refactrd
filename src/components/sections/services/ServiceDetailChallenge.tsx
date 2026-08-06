import { ArrowDown, AlertTriangle } from "lucide-react";
import { ServiceDefinition } from "@/data/services";

const challengeNodes: { x: number; y: number; friction: boolean }[] = [
  { x: 20, y: 100, friction: false },
  { x: 120, y: 60, friction: false },
  { x: 220, y: 120, friction: true },
  { x: 320, y: 50, friction: false },
  { x: 420, y: 110, friction: true },
  { x: 520, y: 70, friction: false },
];

export default function ServiceDetailChallenge({ service }: { service: ServiceDefinition }) {
  const challenge = service.challenge;
  if (!challenge) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="min-w-0">
            <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#5a6580]">
              The Challenge
            </span>
            <h2 className="mt-2 mb-5 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight">
              {challenge.heading}
            </h2>

            {/* Process diagram */}
            {challenge.diagram?.type === "funnel" ? (
              <div className="rounded-2xl border border-[#DDE3EE] bg-[#F9FAFC] p-5 sm:p-6 mb-6">
                <div className="flex flex-col items-center gap-2">
                  {(challenge.diagram.sources ?? []).map((source, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <span className="px-4 py-2 rounded-full bg-white border border-[#DDE3EE] font-clash font-semibold text-xs sm:text-sm text-[#5a6580]">
                        {source}
                      </span>
                      <ArrowDown className="w-3.5 h-3.5 text-[#CBD5E1]" />
                    </div>
                  ))}
                  <span className="px-5 py-2.5 rounded-full bg-[#1F2A44] font-clash font-bold text-xs sm:text-sm text-white shadow-sm">
                    {challenge.diagram.destination}
                  </span>
                </div>
                {challenge.diagram.caption && (
                  <p className="mt-4 font-jakarta text-xs text-[#94A3B8] text-center">
                    {challenge.diagram.caption}
                  </p>
                )}
              </div>
            ) : challenge.diagram?.type === "sequence" ? (
              <div className="rounded-2xl border border-[#DDE3EE] bg-[#F9FAFC] p-5 sm:p-6 mb-6">
                <div className="flex flex-col items-center gap-2">
                  {(challenge.diagram.stages ?? []).map((stage, i, arr) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <span className="px-4 py-2 rounded-full bg-white border border-[#DDE3EE] font-clash font-semibold text-xs sm:text-sm text-[#5a6580]">
                        {stage}
                      </span>
                      {i < arr.length - 1 && <ArrowDown className="w-3.5 h-3.5 text-[#CBD5E1]" />}
                    </div>
                  ))}
                </div>
                {(challenge.diagram.beforeLabel || challenge.diagram.afterLabel) && (
                  <div className="mt-4 pt-4 border-t border-[#DDE3EE] flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 text-center">
                    <p className="font-jakarta text-xs text-[#94A3B8]">
                      Before: <span className="text-[#5a6580] font-semibold">{challenge.diagram.beforeLabel}</span>
                    </p>
                    <span className="hidden sm:inline text-[#CBD5E1]">&rarr;</span>
                    <p className="font-jakarta text-xs text-[#0e5d7d]">
                      After: <span className="font-semibold">{challenge.diagram.afterLabel}</span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#DDE3EE] bg-[#F9FAFC] p-5 sm:p-6 mb-6 overflow-x-auto">
                <svg viewBox="0 0 560 150" className="w-full min-w-[420px] h-auto" fill="none">
                  <path
                    d={`M${challengeNodes.map((n) => `${n.x} ${n.y}`).join(" L")}`}
                    stroke="#CBD5E1"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    fill="none"
                  />
                  {challengeNodes.map((n, i) => (
                    <circle key={i} cx={n.x} cy={n.y} r="7" fill={n.friction ? "#F59E0B" : "#1F2A44"} />
                  ))}
                  <text x="220" y="145" textAnchor="middle" fontSize="11" fill="#B45309" fontFamily="var(--font-jakarta), sans-serif">
                    Handoff delay
                  </text>
                  <text x="420" y="135" textAnchor="middle" fontSize="11" fill="#B45309" fontFamily="var(--font-jakarta), sans-serif">
                    Approval bottleneck
                  </text>
                </svg>
                <p className="mt-2 font-jakarta text-xs text-[#94A3B8] text-center">
                  A typical workflow before transformation
                </p>
              </div>
            )}

            <div className="space-y-3">
              {challenge.body.map((paragraph, i) => (
                <p key={i} className="font-jakarta text-[#5a6580] text-[15px] sm:text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#1F2A44] p-6 sm:p-8">
            <p className="text-xs font-clash font-bold uppercase tracking-[0.18em] text-[#A2D2FF] mb-2">
              Common Signs
            </p>
            <ul className="divide-y divide-white/10">
              {challenge.signs.map((sign, i) => (
                <li key={i} className="flex items-start gap-3.5 py-3.5 first:pt-3 last:pb-0">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#A2D2FF]" strokeWidth={2} />
                  </span>
                  <span className="font-jakarta text-[15px] text-white/80 leading-snug">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

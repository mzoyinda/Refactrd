import {
  Zap,
  Clock,
  Eye,
  Users,
  Cpu,
  TrendingUp,
  Brain,
  BookOpen,
  Bot,
  Activity,
  RefreshCw,
  Gauge,
  Smile,
  Rocket,
  Sparkles,
  Wrench,
  Lightbulb,
  LucideIcon,
} from "lucide-react";
import { ServiceDefinition } from "@/data/services";

const outcomeIcons: Record<string, LucideIcon> = {
  "Faster Execution": Zap,
  "Reduced Manual Effort": Clock,
  "Better Visibility": Eye,
  "Better Collaboration": Users,
  "AI Readiness": Cpu,
  "Greater Agility": TrendingUp,
  "Faster Information Access": Zap,
  "Better Decisions": Brain,
  "Faster Onboarding": Users,
  "Stronger Knowledge Retention": BookOpen,
  "Better AI Responses": Bot,
  "Greater Productivity": TrendingUp,
  "Faster Decisions": Zap,
  "Greater Visibility": Eye,
  "Smarter Execution": Cpu,
  "Better Performance": Activity,
  "Continuous Improvement": RefreshCw,
  "More Scalable Operations": Gauge,
  "Better Customer Experiences": Smile,
  "Faster Product Innovation": Rocket,
  "Practical AI Features": Sparkles,
  "New Growth Opportunities": TrendingUp,
  "Stronger Internal Tools": Wrench,
  "Better Product Decisions": Lightbulb,
};

export default function ServiceDetailOutcomes({ service }: { service: ServiceDefinition }) {
  const outcomes = service.outcomes;
  if (!outcomes) return null;

  return (
    <section className="section-padding bg-[#1F2A44] text-white">
      <div className="container-custom">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-xs font-clash font-bold tracking-[0.22em] uppercase text-[#A2D2FF]">
            Outcomes
          </span>
          <h2 className="mt-2 mb-4 text-2xl sm:text-3xl lg:text-4xl font-clash font-bold leading-tight">
            {outcomes.heading}
          </h2>
          <p className="font-jakarta text-white/70 text-[15px] sm:text-base leading-relaxed">
            {outcomes.intro}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {outcomes.items.map((item, i) => {
            const Icon = outcomeIcons[item.title] ?? Zap;
            return (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 p-7 sm:p-8 hover:bg-white/[0.08] transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#A2D2FF]/15 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#A2D2FF]" strokeWidth={1.75} />
                </div>
                <h3 className="font-clash font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="font-jakarta text-white/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

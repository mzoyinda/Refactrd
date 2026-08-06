import {
  Workflow,
  Gauge,
  Share2,
  GitBranch,
  Sparkles,
  Database,
  Bot,
  Search,
  Network,
  Activity,
  Lightbulb,
  Cpu,
  Eye,
  RefreshCw,
  Target,
  Smile,
  Wrench,
  FlaskConical,
  LucideIcon,
} from "lucide-react";
import { ServiceDefinition } from "@/data/services";

const transformIcons: Record<string, LucideIcon> = {
  "Workflow Design": Workflow,
  "Operational Efficiency": Gauge,
  "Information Flow": Share2,
  "Decision-Making": GitBranch,
  "AI Readiness": Sparkles,
  "Enterprise Knowledge Systems": Database,
  "AI Assistants": Bot,
  "Enterprise Search": Search,
  "Knowledge Architecture": Network,
  "Operational Intelligence": Activity,
  "Decision Support": Lightbulb,
  "AI-Enabled Workflows": Cpu,
  "Operational Monitoring": Eye,
  "Continuous Improvement": RefreshCw,
  "AI Product Strategy": Target,
  "AI-Powered Features": Sparkles,
  "Customer Experiences": Smile,
  "Internal Product Tools": Wrench,
  "Product Validation": FlaskConical,
};

export default function ServiceDetailCapabilities({ service }: { service: ServiceDefinition }) {
  const transformItems = service.transformItems;
  if (!transformItems) return null;

  return (
    <section className="section-padding bg-[#F9FAFC]">
      <div className="container-custom">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-clash font-bold text-[#1F2A44] leading-tight mb-10 sm:mb-14 max-w-2xl">
          What We Deliver
        </h2>

        <div className="border-t border-[#DDE3EE]">
          {transformItems.map((item, i) => {
            const Icon = transformIcons[item.title] ?? Workflow;
            return (
              <div
                key={i}
                className="group flex flex-col sm:grid sm:grid-cols-[104px_1fr_1fr] lg:grid-cols-[120px_1fr_1fr] sm:items-center gap-4 sm:gap-8 py-8 sm:py-10 border-b border-[#DDE3EE]"
              >
                {/* Number + icon */}
                <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-4">
                  <span className="font-clash font-extrabold text-3xl sm:text-4xl text-[#1F2A44]/10 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white border border-[#DDE3EE] flex items-center justify-center flex-shrink-0 group-hover:border-[#A2D2FF] group-hover:bg-[#A2D2FF]/10 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-[#1F2A44]" strokeWidth={1.75} />
                  </div>
                </div>

                {/* Title + tagline */}
                <div>
                  <h3 className="font-clash font-bold text-[#1F2A44] text-xl sm:text-2xl leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="font-clash font-semibold text-[#0e5d7d] text-sm sm:text-base">
                    {item.tagline}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <p className="font-jakarta text-[#5a6580] text-[15px] sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

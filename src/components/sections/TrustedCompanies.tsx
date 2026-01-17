"use client";
import Image from "next/image";
import { FaUser, FaCheckCircle, FaBriefcase, FaList } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
export function TrustedCompanies() {
  // Company logos - you'll replace these with actual logo images
  const companies = [
    { name: "Mistral AI", logo: "/images/mistralai.svg" },
    { name: "vodafone", logo: "/images/vodafone.svg" },
    { name: "wayfair", logo: "/images/wayfair.svg" },
    { name: "onfleet", logo: "/images/onfleet.svg" },
    { name: "paddle", logo: "/images/paddle.svg" },
    // Duplicate for seamless loop
    { name: "Mistral AI", logo: "/images/mistralai.svg" },
    { name: "vodafone", logo: "/images/vodafone.svg" },
    { name: "wayfair", logo: "/images/wayfair.svg" },
    { name: "onfleet", logo: "/images/onfleet.svg" },
    { name: "paddle", logo: "/images/paddle.svg" },
  ];

  const stats = [
    {
      icon: <FaUser className="w-6 h-6" />,
      label: "Selective Talent Network",
      value: "Engineers screened for senior-level capability",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      icon: <CiGlobe  className="w-6 h-6" />,
      label: "Global Hiring Coverage",
      value: "Supporting distributed teams across regions",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      icon: <FaBriefcase className="w-6 h-6" />,
      label: "Structured Vetting Process",
      value: "Manual review supported by AI-assisted evaluation",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    // {
    //   icon: <FaList className="w-6 h-6" />,
    //   label: "Skills & specialties",
    //   value: "1,264",
    //   bgColor: "bg-green-100",
    //   iconColor: "text-green-500",
    // },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-center text-gray-400 text-lg lg:text-[22px] mb-12">
          Trusted by forward-thinking teams building globally distributed engineering organizations.
        </h2>

        {/* Company Logos Slider */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-12 animate-scroll">
            {companies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <div className="relative h-10 w-auto flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={120}
                    height={40}
                    className="object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`${stat.bgColor} ${stat.iconColor} p-3 rounded-xl flex-shrink-0`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-[15.3px] font-normal text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
       
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

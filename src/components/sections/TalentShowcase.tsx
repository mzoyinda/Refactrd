"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaMobileAlt,
  FaPalette,
  FaReact,
  FaCode,
  FaBriefcase,
  FaChartLine,
  FaPython,
  FaLaptopCode,
} from "react-icons/fa";

interface TalentProfile {
  id: number;
  role: string;
  specialty: string;
  experience: number;
  rate: number;
  color: string;
  categories: string[];
}

export function TalentShowcase() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const roles = [
    {
      name: "Mobile Developers",
      icon: <FaMobileAlt />,
      color: "bg-purple-100 text-purple-600",
      category: "mobile",
    },
    {
      name: "UI/UX Designers",
      icon: <FaPalette />,
      color: "bg-gray-100 text-gray-600",
      category: "uiux",
    },
    {
      name: "React/RN Developers",
      icon: <FaReact />,
      color: "bg-gray-100 text-gray-600",
      category: "react",
    },
    {
      name: "Graphic Designers",
      icon: <FaPalette />,
      color: "bg-gray-100 text-gray-600",
      category: "graphic",
    },
    {
      name: "BI Developers",
      icon: <FaChartLine />,
      color: "bg-gray-100 text-gray-600",
      category: "bi",
    },
    {
      name: "Technical Leads",
      icon: <FaBriefcase />,
      color: "bg-gray-100 text-gray-600",
      category: "lead",
    },
    {
      name: ".Net Developers",
      icon: <FaCode />,
      color: "bg-gray-100 text-gray-600",
      category: "dotnet",
    },
    {
      name: "Python Developers",
      icon: <FaPython />,
      color: "bg-gray-100 text-gray-600",
      category: "python",
    },
    {
      name: "Digital Marketers",
      icon: <FaChartLine />,
      color: "bg-gray-100 text-gray-600",
      category: "marketing",
    },
    {
      name: "Front-End Developers",
      icon: <FaLaptopCode />,
      color: "bg-gray-100 text-gray-600",
      category: "frontend",
    },
  ];

  const talents: TalentProfile[] = [
    {
      id: 1,
      role: "Java Developer",
      specialty: "Backend & Microservices",
      experience: 4,
      rate: 21,
      color: "bg-emerald-100",
      categories: ["mobile", "lead", "frontend"],
    },
    {
      id: 2,
      role: "Flutter Developer",
      specialty: "Cross-platform Mobile",
      experience: 6,
      rate: 32,
      color: "bg-amber-100",
      categories: ["mobile", "frontend"],
    },
    {
      id: 3,
      role: "ReactNative Developer",
      specialty: "Mobile App Development",
      experience: 3,
      rate: 24,
      color: "bg-purple-100",
      categories: ["mobile", "react", "frontend"],
    },
    {
      id: 4,
      role: "Kotlin Developer",
      specialty: "Android Development",
      experience: 5,
      rate: 37,
      color: "bg-rose-100",
      categories: ["mobile", "frontend"],
    },
    {
      id: 5,
      role: "Flutter Developer",
      specialty: "iOS & Android Apps",
      experience: 8,
      rate: 32,
      color: "bg-sky-100",
      categories: ["mobile", "lead", "frontend"],
    },
    {
      id: 6,
      role: "KMP Developer",
      specialty: "Kotlin Multiplatform",
      experience: 5,
      rate: 40,
      color: "bg-indigo-100",
      categories: ["mobile", "frontend"],
    },
    {
      id: 7,
      role: "UI/UX Designer",
      specialty: "Product Design",
      experience: 4,
      rate: 28,
      color: "bg-pink-100",
      categories: ["uiux", "graphic"],
    },
    {
      id: 8,
      role: "Python Developer",
      specialty: "Data Engineering",
      experience: 6,
      rate: 35,
      color: "bg-yellow-100",
      categories: ["python", "bi", "lead"],
    },
    {
      id: 9,
      role: ".NET Developer",
      specialty: "Enterprise Solutions",
      experience: 7,
      rate: 38,
      color: "bg-blue-100",
      categories: ["dotnet", "lead", "frontend"],
    },
    {
      id: 10,
      role: "Digital Marketer",
      specialty: "Growth & Analytics",
      experience: 5,
      rate: 30,
      color: "bg-green-100",
      categories: ["marketing"],
    },
  ];

  const handleRoleClick = (category: string) => {
    setActiveFilter(activeFilter === category ? null : category);
  };

  const filteredTalents = activeFilter
    ? talents.filter((talent) => talent.categories.includes(activeFilter))
    : talents;

  return (
    <section className="py-8 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container with border */}
        <div className="border-2 border-gray-200 rounded-3xl p-8 lg:p-12 bg-white">
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-gray-400 text-base font-medium mb-2">Expertise</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              World-Class Talent Across Key Technical Roles
            </h2>
          </div>

          {/* Role Filter Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {roles.map((role) => (
              <button
                key={role.category}
                onClick={() => handleRoleClick(role.category)}
                className={`flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-medium transition-all duration-200 w-full ${
                  activeFilter === role.category
                    ? "bg-purple-600 text-white shadow-md scale-[1.02]"
                    : `${role.color} hover:shadow-md hover:scale-[1.02]`
                }`}
              >
                <span className="text-lg">{role.icon}</span>
                <span className="text-sm">{role.name}</span>
              </button>
            ))}
          </div>

          {/* Talent Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredTalents.slice(0, 6).map((talent) => (
              <div
                key={talent.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                {/* Avatar Section */}
                <div
                  className={`${talent.color} h-48 flex items-center justify-center relative`}
                >
                  <div className="w-32 h-32 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-5xl">👤</span>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1.5 rounded-full shadow-md">
                    <span className="text-sm font-semibold text-gray-700">
                      Available
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {talent.role}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {talent.specialty}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span className="font-medium">
                        {talent.experience} Years Experience
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">
                        ${talent.rate}€ Per-Hour
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-purple-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Request Access to Full Talent Pool
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Access our network of 31,000+ verified professionals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";

// const services = [
//   {
//     title: "Website Design & Development",
//     description:
//       "Create stunning, user-friendly websites that engage visitors and convert them into loyal customers. We blend creativity with technical expertise to bring your brand online.",
//     gradient: "from-[#CCFF00] to-[#A8E600]",
//     textColor: "text-secondary",
//   },
//   {
//     title: "Digital Marketing & SEO",
//     description:
//       "Boost your online presence with data-driven marketing strategies and SEO techniques that drive traffic and enhance brand visibility, at the right audience, at the right time.",
//     gradient: "from-secondary to-secondary-light",
//     textColor: "text-white",
//   },
//   {
//     title: "Social Media Management",
//     description:
//       "Grow your brand's influence across social platforms with strategic content creation and community engagement. We ensure your message resonates with your target audience.",
//     gradient: "from-secondary to-secondary-light",
//     textColor: "text-white",
//   },
//   {
//     title: "Branding & Identity Design",
//     description:
//       "Develop a compelling brand identity that tells your story and resonates with your audience. We craft logos, color schemes, and brand guidelines that set you apart.",
//     gradient: "from-secondary to-secondary-light",
//     textColor: "text-white",
//   },
// ];

// export default function WhatWeDoSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="section-padding bg-black text-white relative overflow-hidden"
//       id="services"
//     >
//       {/* Decorative dotted border */}
//       <div className="absolute inset-4 border-2 border-dashed border-primary/20 rounded-3xl pointer-events-none" />
//       <div className="absolute inset-8 border border-dashed border-accent/10 rounded-2xl pointer-events-none" />

//       <div className="container-custom relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
//           {/* Left: Heading */}
//           <div
//             className={`transition-all duration-1000 ease-out ${
//               isVisible
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 -translate-x-12"
//             }`}
//           >
//             <h2 className="text-5xl lg:text-7xl font-clash font-bold leading-tight mb-8">
//               Innovative{" "}
//               <span className="block text-white/90">Solutions,</span>
//               <span className="block text-white/90">Tailored for You</span>
//             </h2>

//             <p className="body-lg text-white/70 mb-8 max-w-md">
//              We provide end to end software development and technical documentation as a managed service.
// Our core capabilities include:
//             </p>

//             <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-jakarta font-semibold hover:bg-white hover:text-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl">
//               Book a call
//               <svg
//                 className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Right: Service Cards */}
//           <div className="space-y-4">
//             {services.map((service, index) => {
//               const isHighlighted = index === 0;
//               return (
//                 <div
//                   key={index}
//                   className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-[1.02] ${
//                     isVisible
//                       ? "opacity-100 translate-x-0"
//                       : "opacity-0 translate-x-12"
//                   }`}
//                   style={{ transitionDelay: `${200 + index * 100}ms` }}
//                 >
//                   <div
//                     className={`p-6 lg:p-8 bg-gradient-to-r ${service.gradient} ${service.textColor} relative`}
//                   >
//                     {/* Animated background on hover */}
//                     <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />

//                     <div className="relative z-10">
//                       <h3 className="text-xl lg:text-2xl font-clash font-semibold mb-3 group-hover:translate-x-2 transition-transform duration-300">
//                         {service.title}
//                       </h3>
//                       <p
//                         className={`text-sm lg:text-base leading-relaxed ${
//                           isHighlighted
//                             ? "text-secondary/80"
//                             : "text-white/80"
//                         }`}
//                       >
//                         {service.description}
//                       </p>
//                     </div>

//                     {/* Corner accent */}
//                     <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
//                   </div>

//                   {/* Bottom border animation */}
//                   <div
//                     className={`h-1 ${
//                       isHighlighted ? "bg-secondary" : "bg-primary"
//                     } w-0 group-hover:w-full transition-all duration-500`}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Background glow effects */}
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Website Development",
    description:
      "Design and development of fast, reliable, and scalable websites built to support real business use cases.",
    href: "/services/website-development",
  },
  {
    title: "Application Development",
    description:
      "Development of web and mobile applications with clean architecture, strong performance, and long-term maintainability.",
    href: "/services/application-development",
  },
  {
    title: "AI and Automation",
    description:
      "Design and implementation of automation and AI-driven workflows that reduce manual effort and improve operational efficiency.",
    href: "/services/ai-automation",
  },
  {
    title: "DevOps and Infrastructure",
    description:
      "Setup and management of infrastructure, deployments, monitoring, and performance to ensure system stability and scalability.",
    href: "/services/devops-infrastructure",
  },
  {
    title: "Technical Documentation and Product Content",
    description:
      "Creation of clear technical documentation and product content that supports onboarding, usage, maintenance, and continuity.",
    href: "/services/technical-documentation",
  },
  {
    title: "Delivery Support and Team Setup",
    description:
      "When required, we help structure or extend delivery capacity without the commitment and overhead of permanent hiring.",
    href: "/services/delivery-support",
  },
];

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-black text-white relative overflow-hidden"
      id="services"
    >
      {/* Decorative dotted border */}
      <div className="absolute inset-4   pointer-events-none" />
      <div className="absolute inset-8 border border-dashed border-accent/10 rounded-2xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2
            className={`text-5xl lg:text-7xl font-clash font-bold leading-tight mb-6 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            What We{" "}
            <span className="text-white/90">Do</span>
          </h2>

          <p
            className={`text-lg font-montserrat lg:text-xl text-white/70 transition-all duration-1000 ease-out delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            We provide end-to-end software development and technical documentation as a managed service. Our core capabilities include:
          </p>
        </div>

        {/* Service Cards - 3 Column Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 ease-out hover:scale-[1.02] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="p-6 lg:p-8 bg-gradient-to-br from-secondary to-secondary-light text-white relative min-h-[320px] flex flex-col">
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500" />

                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-xl lg:text-2xl font-clash font-semibold mb-4 group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm lg:text-base leading-relaxed text-white/80 flex-1 mb-6 font-montserrat">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  {/* <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-sm font-jakarta font-semibold text-white/90 hover:text-white group/link transition-colors duration-300"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link> */}
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
              </div>

              {/* Bottom border animation */}
              <div className="h-1 bg-primary w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center transition-all duration-1000 ease-out delay-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-clash text-lg text-white/70 mb-6">
            Ready to bring your project to life?
          </p>
          <Link
            href="/contact"
            className="font-clash inline-flex items-center justify-center gap-2 text-[#1F2A44] bg-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
          >
            Book a Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
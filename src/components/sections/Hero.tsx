"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-tertiary-light via-white to-primary/10">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="heading-xl text-secondary mb-6 animate-fade-up">
            Outsource your software.{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Get it built properly.</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-primary/30 -z-0 transform -rotate-1" />
            </span>
          </h1>

          {/* Subheading */}
          <p className="body-lg text-secondary/80 max-w-3xl mx-auto mb-8 animate-fade-up delay-200">
            Product development, automation, and technical documentation
            delivered with clarity, structure, and ownership.
          </p>

          {/* Supporting text */}
          <p className="body-lg text-secondary/70 max-w-3xl mx-auto mb-12 animate-fade-up delay-300">
            Refactrd supports startups, growing businesses, and enterprises in
            designing, building, and maintaining reliable software products. We
            take full responsibility for delivery, covering development,
            infrastructure, automation, and documentation, so you can focus on
            running and scaling your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-500">
            <Link
              href="/contact"
              // className="button-primary group flex items-center gap-2 px-8 py-4 text-lg"
              className="font-clash inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-[#E6EAF0] rounded-full transition-transform hover:scale-105 px-8 py-4"
            >
              Book a call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/hire"
              className="font-clash border border-[#1F2A44] px-8 py-4 rounded-full "
            >
              Hire a team
            </Link>
          </div>

          {/* Trust indicators */}
          
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-secondary/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-secondary/40 rounded-full animate-pulse" />
        </div>
      </div> */}
    </section>
  );
}


// "use client";

// import Link from "next/link";
// import { ArrowRight } from "lucide-react";

// export default function Hero() {
//   return (
//     <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
//       <div className="container-custom w-full pt-32 pb-20 lg:pt-40 lg:pb-28">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left Content */}
//           <div className="max-w-2xl">
//             {/* Small tag */}
//             <div className="inline-block mb-6 animate-fade-in">
//               <span className="text-sm font-montserrat text-secondary/60">
//                 Unlock Boundless Opportunities with
//               </span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="mb-8 animate-fade-up">
//               <span className="block text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-secondary leading-tight mb-4">
//                 Outsource your software.
//               </span>
//               <span className="relative inline-block">
//                 <span className="block text-5xl lg:text-6xl xl:text-7xl font-clash font-bold text-secondary leading-tight">
//                   Get it built properly.
//                 </span>
//                 <span className="absolute -bottom-2 left-0 w-full h-4 bg-[#CCFF00] -z-10 transform -skew-y-1" />
//               </span>
//             </h1>

//             {/* Description Paragraphs */}
//             <div className="space-y-4 mb-8 animate-fade-up delay-200">
//               <p className="text-lg text-secondary/70 leading-relaxed">
//                 Product development, automation, and technical documentation
//                 delivered with clarity, structure, and ownership.
//               </p>
//               <p className="text-base text-secondary/60 leading-relaxed">
//                 Refactrd supports startups, growing businesses, and enterprises in
//                 designing, building, and maintaining reliable software products. We
//                 take full responsibility for delivery, covering development,
//                 infrastructure, automation, and documentation, so you can focus on
//                 running and scaling your business.
//               </p>
//             </div>

//             {/* CTA Button */}
//             <div className="animate-fade-up delay-300">
//               <Link
//                 href="/contact"
//                 className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-lg font-jakarta font-semibold hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-xl group"
//               >
//                 Book a Call
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//               </Link>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="relative animate-fade-in delay-400">
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl">
//               {/* Placeholder for team image */}
//               <div className="aspect-[4/3] bg-gradient-to-br from-tertiary to-tertiary-dark flex items-center justify-center">
//                 {/* Replace with actual image: */}
//                 {/* <Image
//                   src="/images/hero-team.jpg"
//                   alt="Refactrd team collaborating"
//                   fill
//                   className="object-cover"
//                   priority
//                 /> */}
//                 <div className="text-center p-8">
//                   <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                     <svg
//                       className="w-12 h-12 text-accent"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                       />
//                     </svg>
//                   </div>
//                   <p className="text-secondary/60 font-jakarta">Hero Image</p>
//                 </div>
//               </div>

//               {/* Decorative element - optional */}
//               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl" />
//             </div>
//           </div>
//         </div>

//         {/* Stats Section - Like the design reference */}
//         <div className="mt-20 animate-fade-up delay-500">
//           <div className="bg-[#CCFF00] rounded-2xl p-8 lg:p-12">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//               <div className="text-center">
//                 <div className="text-4xl lg:text-5xl font-clash font-bold text-secondary mb-2">
//                   $100K+
//                 </div>
//                 <div className="text-sm text-secondary/70 font-montserrat">
//                   Money Raised
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl lg:text-5xl font-clash font-bold text-secondary mb-2">
//                   $12+
//                 </div>
//                 <div className="text-sm text-secondary/70 font-montserrat">
//                   Unicorn Award
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl lg:text-5xl font-clash font-bold text-secondary mb-2">
//                   $425+
//                 </div>
//                 <div className="text-sm text-secondary/70 font-montserrat">
//                   Project Complete
//                 </div>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl lg:text-5xl font-clash font-bold text-secondary mb-2">
//                   100+
//                 </div>
//                 <div className="text-sm text-secondary/70 font-montserrat">
//                   Amazing Clients
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
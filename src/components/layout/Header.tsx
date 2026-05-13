// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";
// import Image from "next/image";
// import { trackCTAClick } from "@/lib/analytics";
// import { trackNavigation } from "@/lib/analytics";

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close mobile menu on escape key
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setMobileMenuOpen(false);
//     };

//     if (mobileMenuOpen) {
//       document.addEventListener("keydown", handleEscape);
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.body.style.overflow = "unset";
//     };
//   }, [mobileMenuOpen]);

//   return (
//     <>
//       <header
//         className={`fixed w-full top-0 z-40 transition-all duration-300 ${
//           scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
//         }`}
//       >
//         <nav className="container-custom">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             {/* Logo */}
//             <Link
//               href="/"
//               aria-label="Refactrd Home"
//               className="relative z-50 flex items-center"
//             >
//               <Image
//                 src="/images/refactrd-logo.png"
//                 alt="Refactrd"
//                 width={320}
//                 height={50}
//                 priority
//                 className="h-32 md:h-36 lg:h-40 w-auto object-contain"
//               />
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center space-x-10">
//               <Link
//                 href="/"
//                 onClick={() => trackNavigation("home", "/")}
//                 className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
//               >
//                 Home
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
//               </Link>

//               <Link
//                 href="/about"
//                 onClick={() => trackNavigation("about", "/about")}
//                 className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
//               >
//                 About
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
//               </Link>

//               <Link
//                 href="/services"
//                 onClick={() => trackNavigation("services", "/services")}
//                 className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
//               >
//                 Services
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
//               </Link>

//               <Link
//                 href="/projects"
//                 onClick={() => trackNavigation("projects", "/projects")}
//                 className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
//               >
//                 Projects
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
//               </Link>

//               <Link
//                 href="/careers"
//                 onClick={() => trackNavigation("careers", "/careers")}
//                 className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
//               >
//                 Careers
//                 <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
//               </Link>
//             </div>

//             {/* CTA Button - Desktop */}
//             {/* <div className="hidden lg:flex items-center">
//               <Link
//                 href="https://cal.com/refactrd/technical-discovery-call"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={() => trackCTAClick("header_book_call", "cal.com")}
//                 className="inline-flex items-center justify-center px-7 py-3 bg-secondary text-white rounded-full font-clash font-semibold text-[15px] hover:bg-[#A2D2FF] transition-all duration-300 hover:scale-105 hover:shadow-lg"
//               >
//                 Book a Call
//               </Link>
//             </div> */}
//             <div className="hidden lg:flex items-center gap-4">
//               {/* <Link
//                 href="/pricing-calculator"
//                 onClick={() =>
//                   trackNavigation("get_quote", "/pricing-calculator")
//                 }
//                 className="inline-flex items-center justify-center px-7 py-3 bg-white text-secondary border-2 border-secondary rounded-full font-clash font-semibold text-[15px] hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-105"
//               >
//                 Get a Quote
//               </Link> */}

//               <Link
//                 href="https://cal.com/refactrd/technical-discovery-call"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={() => trackCTAClick("header_book_call", "cal.com")}
//                 className="inline-flex items-center justify-center px-7 py-3 bg-secondary text-white rounded-full font-clash font-semibold text-[15px] hover:bg-[#A2D2FF] transition-all duration-300 hover:scale-105 hover:shadow-lg"
//               >
//                 Book a Call
//               </Link>
//             </div>

//             {/* Mobile menu button */}
//             <button
//               type="button"
//               className="lg:hidden p-2 rounded-md text-secondary hover:bg-tertiary transition-colors duration-200 relative z-50"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {mobileMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Mobile Navigation - Separate Portal */}
//       {mobileMenuOpen && (
//         <>
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden animate-fade-in"
//             onClick={() => setMobileMenuOpen(false)}
//           />

//           {/* Sidebar */}
//           <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-[70] lg:hidden overflow-y-auto animate-slide-in-right">
//             <div className="p-6">
//               {/* Close button area - spacing */}
//               <div className="h-20 flex items-center justify-end mb-4">
//                 <button
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="p-2 rounded-lg hover:bg-tertiary transition-colors"
//                 >
//                   <X className="w-6 h-6 text-secondary" />
//                 </button>
//               </div>

//               {/* Navigation Links */}
//               <div className="space-y-2">
//                 <Link
//                   href="/"
//                   className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
//                   onClick={() => {
//                     trackNavigation("home_mobile", "/");
//                     setMobileMenuOpen(false);
//                   }}
//                 >
//                   Home
//                 </Link>

//                 <Link
//                   href="/about"
//                   className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
//                   onClick={() => {
//                     trackNavigation("about_mobile", "/about");
//                     setMobileMenuOpen(false);
//                   }}
//                 >
//                   About
//                 </Link>

//                 <Link
//                   href="/services"
//                   className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
//                   onClick={() => {
//                     trackNavigation("services_mobile", "/services");
//                     setMobileMenuOpen(false);
//                   }}
//                 >
//                   Services
//                 </Link>

//                 <Link
//                   href="/projects"
//                   className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
//                   onClick={() => {
//                     trackNavigation("projects_mobile", "/projects");
//                     setMobileMenuOpen(false);
//                   }}
//                 >
//                   Projects
//                 </Link>
//                 <Link
//                   href="/careers"
//                   className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
//                   onClick={() => {
//                     trackNavigation("careers_mobile", "/careers");
//                     setMobileMenuOpen(false);
//                   }}
//                 >
//                   Careers
//                 </Link>
//               </div>

//               {/* CTA Button */}
//               <div className="mt-6 pt-6 border-t border-tertiary">
//                 <Link
//                   href="https://cal.com/refactrd/technical-discovery-call"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block w-full text-center px-7 py-4 bg-secondary text-white rounded-full font-clash font-semibold  transition-all duration-300"
//                   onClick={() => {
//                     trackCTAClick("header_book_call", "cal.com");
//                     setMobileMenuOpen(false);
//                   }}
//                 >
//                   Book a Call
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { trackCTAClick } from "@/lib/analytics";
import { trackNavigation } from "@/lib/analytics";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setProgramsDropdownOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setProgramsDropdownOpen(false);
    };

    if (programsDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [programsDropdownOpen]);

  return (
    <>
      <header
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Refactrd Home"
              className="relative z-50 flex items-center"
            >
              <Image
                src="/images/refactrd-logo.png"
                alt="Refactrd"
                width={320}
                height={50}
                priority
                className="h-32 md:h-36 lg:h-40 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              <Link
                href="/"
                onClick={() => trackNavigation("home", "/")}
                className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/about"
                onClick={() => trackNavigation("about", "/about")}
                className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/services"
                onClick={() => trackNavigation("services", "/services")}
                className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Programs Dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProgramsDropdownOpen(!programsDropdownOpen);
                  }}
                  className="text-secondary font-clash font-semibold text-[16px] transition-colors duration-200 relative group flex items-center gap-1"
                >
                  Programs
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      programsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
                </button>

                {/* Dropdown Menu */}
                {programsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-[#DDE3EE] rounded-xl shadow-xl overflow-hidden animate-fade-in">
                    <Link
                      href="/implementation-program"
                      onClick={() => {
                        trackNavigation("implementation_program", "/implementation-program");
                        setProgramsDropdownOpen(false);
                      }}
                      className="block px-5 py-4 hover:bg-[#F9FAFC] transition-colors duration-200 border-b border-[#DDE3EE] last:border-b-0"
                    >
                      <div className="font-clash font-semibold text-[#1F2A44] mb-1">
                        2-Week Build
                      </div>
                      <div className="text-sm text-[#5a6580] font-jakarta">
                        Deploy your first AI role in 14 days
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/projects"
                onClick={() => trackNavigation("projects", "/projects")}
                className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>

              <Link
                href="/careers"
                onClick={() => trackNavigation("careers", "/careers")}
                className="text-secondary font-clash font-semibold text-[16px]  transition-colors duration-200 relative group"
              >
                Careers
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A2D2FF] transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="https://cal.com/refactrd/technical-discovery-call"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("header_book_call", "cal.com")}
                className="inline-flex items-center justify-center px-7 py-3 bg-secondary text-white rounded-full font-clash font-semibold text-[15px] hover:bg-[#A2D2FF] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Book a Call
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-secondary hover:bg-tertiary transition-colors duration-200 relative z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation - Separate Portal */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-[70] lg:hidden overflow-y-auto animate-slide-in-right">
            <div className="p-6">
              {/* Close button area - spacing */}
              <div className="h-20 flex items-center justify-end mb-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-tertiary transition-colors"
                >
                  <X className="w-6 h-6 text-secondary" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("home_mobile", "/");
                    setMobileMenuOpen(false);
                  }}
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("about_mobile", "/about");
                    setMobileMenuOpen(false);
                  }}
                >
                  About
                </Link>

                <Link
                  href="/services"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("services_mobile", "/services");
                    setMobileMenuOpen(false);
                  }}
                >
                  Services
                </Link>

                {/* Programs - Mobile Accordion */}
                <div>
                  <button
                    onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  >
                    Programs
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        programsDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {programsDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-1">
                      <Link
                        href="/implementation-program"
                        className="block px-4 py-3 text-[#5a6580] font-jakarta hover:bg-tertiary rounded-lg transition-colors duration-200"
                        onClick={() => {
                          trackNavigation("implementation_program_mobile", "/implementation-program");
                          setMobileMenuOpen(false);
                        }}
                      >
                        2-Week Build
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/projects"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("projects_mobile", "/projects");
                    setMobileMenuOpen(false);
                  }}
                >
                  Projects
                </Link>

                <Link
                  href="/careers"
                  className="block px-4 py-3 text-secondary font-clash font-semibold hover:bg-tertiary rounded-lg transition-colors duration-200"
                  onClick={() => {
                    trackNavigation("careers_mobile", "/careers");
                    setMobileMenuOpen(false);
                  }}
                >
                  Careers
                </Link>
              </div>

              {/* CTA Button */}
              <div className="mt-6 pt-6 border-t border-tertiary">
                <Link
                  href="https://cal.com/refactrd/technical-discovery-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-7 py-4 bg-secondary text-white rounded-full font-clash font-semibold  transition-all duration-300"
                  onClick={() => {
                    trackCTAClick("header_book_call", "cal.com");
                    setMobileMenuOpen(false);
                  }}
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
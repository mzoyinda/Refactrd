// "use client";

// import { useRef, useState, useEffect } from "react";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Check } from "lucide-react";
// import Image from "next/image";

// const considerationAreas = [
//   "Operations",
//   "Knowledge Systems",
//   "Customer Experience",
//   "Product",
//   "Organization-Wide Transformation",
// ];

// const maturityOptions = [
//   "Exploring Opportunities",
//   "Early Experiments",
//   "Active Pilots",
//   "Multiple Initiatives Running",
// ];

// type Step = "form" | "payment";
// type PaymentProvider = "paystack" | "flutterwave";

// const USD_PRICE = 499;

// function PaymentMethodCard({
//   provider,
//   selected,
//   onSelect,
// }: {
//   provider: PaymentProvider;
//   selected: boolean;
//   onSelect: () => void;
// }) {
//   const isPaystack = provider === "paystack";
//   return (
//     <button
//       onClick={onSelect}
//       className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 flex items-center gap-4 ${
//         selected
//           ? "border-[#1F2A44] bg-[#1F2A44]"
//           : "border-[#E2E8F0] hover:border-[#94A3B8] bg-white"
//       }`}
//     >
//       {/* Logo */}
//       <div className={`h-10 w-36 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden px-3 ${
//         selected ? "bg-white/15" : "bg-[#F4F6F9]"
//       }`}>
//         <Image
//           src={isPaystack ? "/images/paystack-logo.png" : "/images/flutterwave-logo.png"}
//           alt={isPaystack ? "Paystack" : "Flutterwave"}
//           width={150}
//           height={80}
//           className="h-12 w-auto object-contain"
//         />
//       </div>
//       {/* Description */}
//       <div className="flex-1">
//         <p className={`font-jakarta text-xs ${selected ? "text-white/70" : "text-[#94A3B8]"}`}>
//           {isPaystack ? "Cards, bank transfer, USSD" : "Cards, mobile money, bank"}
//         </p>
//       </div>
//       {/* Radio */}
//       <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
//         selected ? "border-white" : "border-[#CBD5E1]"
//       }`}>
//         {selected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
//       </span>
//     </button>
//   );
// }

// export default function ExecutiveDiscoveryPage() {
//   const heroRef = useRef<HTMLElement>(null);
//   const [heroVisible, setHeroVisible] = useState(false);
//   const [step, setStep] = useState<Step>("form");
//   const [loading, setLoading] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>("paystack");
//   const [ngnAmount, setNgnAmount] = useState<number | null>(null);
//   const [rate, setRate] = useState(1600);
//   const [fetchingRate, setFetchingRate] = useState(true);

//   const [form, setForm] = useState({
//     name: "",
//     organization: "",
//     email: "",
//     role: "",
//     why_ai: "",
//     areas: [] as string[],
//     maturity: "",
//     challenges: "",
//     outcomes: "",
//   });

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
//       { threshold: 0.1 }
//     );
//     if (heroRef.current) observer.observe(heroRef.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     fetchRate();
//   }, []);

//   const fetchRate = async () => {
//     setFetchingRate(true);
//     try {
//       const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
//       const data = await res.json();
//       const liveRate = data.rates?.NGN || 1600;
//       setRate(liveRate);
//       setNgnAmount(Math.round(USD_PRICE * liveRate));
//     } catch {
//       setRate(1600);
//       setNgnAmount(Math.round(USD_PRICE * 1600));
//     } finally {
//       setFetchingRate(false);
//     }
//   };

//   const formatNgn = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setError("");
//   };

//   const toggleArea = (area: string) => {
//     setForm((prev) => ({
//       ...prev,
//       areas: prev.areas.includes(area)
//         ? prev.areas.filter((a) => a !== area)
//         : [...prev.areas, area],
//     }));
//     setError("");
//   };

//   const handleFormSubmit = async () => {
//     const { name, organization, email, role, why_ai, areas, maturity, challenges, outcomes } = form;

//     if (!name || !organization || !email || !role || !why_ai || areas.length === 0 || !maturity || !challenges || !outcomes) {
//       setError("Please fill in all required fields and select at least one area.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       await fetch("/api/submit-executive-discovery", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, areas: form.areas.join(", ") }),
//       });
//     } catch {
//       // Non-blocking
//     } finally {
//       setLoading(false);
//       setStep("payment");
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const handlePayment = async () => {
//     setPaymentLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/initialize-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           type: "enterprise",
//           email: form.email,
//           full_name: form.name,
//           provider: selectedProvider,
//           metadata: {
//             company_name: form.organization,
//             role: form.role,
//             why_ai: form.why_ai,
//             areas: form.areas.join(", "),
//             maturity: form.maturity,
//             challenges: form.challenges,
//             outcomes: form.outcomes,
//           },
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Something went wrong. Please try again.");
//         setPaymentLoading(false);
//         return;
//       }

//       window.location.href = data.authorization_url;
//     } catch {
//       setError("Something went wrong. Please try again.");
//       setPaymentLoading(false);
//     }
//   };

//   const inputCls = "w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white";
//   const selectCls = "w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white appearance-none cursor-pointer";
//   const labelCls = "block font-clash font-semibold text-sm text-[#1F2A44] mb-1.5";

//   return (
//     <main className="min-h-screen">
//       <Header />

//       {/* ── HERO ── */}
//       <section
//         ref={heroRef}
//         className="relative flex items-center justify-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-36 pb-16 md:pt-40 md:pb-20"
//       >
//         <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />
//         <div className="container-custom w-full relative z-10">
//           <div className="max-w-3xl mx-auto text-center">
//             <div className={`mb-5 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
//               <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F2A44]/8 text-[#1F2A44] rounded-full text-xs font-clash font-bold uppercase tracking-[0.16em]">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#1F2A44]" />
//                 Enterprise Consultation · $499
//               </span>
//             </div>
//             <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
//               Build A Roadmap For AI Adoption
//             </h1>
//             <p className={`font-jakarta text-base lg:text-lg text-[#5a6580] leading-relaxed max-w-2xl mx-auto mb-3 transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
//               A structured assessment for leadership teams evaluating broader AI initiatives. We will map your organization, identify priorities, and deliver a written transformation roadmap.
//               <span className="block mt-2">Complete the assessment below, then confirm your engagement with payment.</span>
//             </p>
//             <p className={`font-clash text-sm font-semibold text-[#1F2A44]/60 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
//               {fetchingRate ? "Loading price..." : `$${USD_PRICE} · ${ngnAmount ? formatNgn(ngnAmount) : ""} at today's rate`}
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ── FORM / PAYMENT ── */}
//       <section className="bg-[#F4F6F9] py-12 md:py-16 px-4 sm:px-6">
//         <div className="max-w-[680px] mx-auto">

//           {/* Step indicator */}
//           <div className="flex items-center gap-3 mb-8">
//             <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-clash font-bold text-xs transition-all ${
//               step === "form" ? "bg-[#1F2A44] text-white" : "bg-white border border-[#E2E8F0] text-[#94A3B8]"
//             }`}>
//               {step === "payment" ? <Check className="w-3.5 h-3.5" /> : <span>1</span>}
//               Discovery Assessment
//             </div>
//             <div className="flex-1 h-px bg-[#E2E8F0]" />
//             <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-clash font-bold text-xs transition-all ${
//               step === "payment" ? "bg-[#1F2A44] text-white" : "bg-white border border-[#E2E8F0] text-[#94A3B8]"
//             }`}>
//               <span>2</span>
//               Payment
//             </div>
//           </div>

//           {/* ── ASSESSMENT FORM ── */}
//           {step === "form" && (
//             <div className="bg-white rounded-3xl border border-[#DDE3EE] shadow-sm overflow-hidden">
//               <div className="bg-[#1F2A44] px-8 py-7 md:px-10">
//                 <h2 className="font-clash font-bold text-white text-xl mb-1">Executive Discovery Assessment</h2>
//                 <p className="font-jakarta text-white/55 text-sm">Help us understand your organization, priorities, and transformation goals.</p>
//               </div>

//               <div className="px-6 py-8 md:px-10 md:py-10 space-y-6">

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelCls}>Your Name *</label>
//                     <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className={inputCls} />
//                   </div>
//                   <div>
//                     <label className={labelCls}>Organization *</label>
//                     <input name="organization" value={form.organization} onChange={handleChange} placeholder="Your organization" className={inputCls} />
//                   </div>
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className={labelCls}>Your Email *</label>
//                     <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@organization.com" className={inputCls} />
//                   </div>
//                   <div>
//                     <label className={labelCls}>Role / Position *</label>
//                     <input name="role" value={form.role} onChange={handleChange} placeholder="CEO, COO, Director..." className={inputCls} />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelCls}>Why are you evaluating AI adoption? *</label>
//                   <textarea name="why_ai" value={form.why_ai} onChange={handleChange} rows={4}
//                     placeholder="Describe the business drivers behind this initiative."
//                     className={`${inputCls} resize-none`}
//                   />
//                 </div>

//                 <div>
//                   <label className={`${labelCls} mb-3`}>Which areas are being considered? *</label>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                     {considerationAreas.map((area) => {
//                       const checked = form.areas.includes(area);
//                       return (
//                         <button key={area} type="button" onClick={() => toggleArea(area)}
//                           className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left font-jakarta text-sm transition-all duration-150 ${
//                             checked ? "border-[#1F2A44] bg-[#1F2A44] text-white" : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#94A3B8]"
//                           }`}
//                         >
//                           <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${checked ? "border-white bg-white" : "border-[#CBD5E1]"}`}>
//                             {checked && <svg className="w-2.5 h-2.5 text-[#1F2A44]" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 6l3 3 5-5" /></svg>}
//                           </span>
//                           {area}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelCls}>Current AI Maturity *</label>
//                   <select name="maturity" value={form.maturity} onChange={handleChange} className={selectCls}>
//                     <option value="" disabled>Select current stage</option>
//                     {maturityOptions.map((opt) => (
//                       <option key={opt} value={opt}>{opt}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className={labelCls}>What are the biggest organizational challenges today? *</label>
//                   <textarea name="challenges" value={form.challenges} onChange={handleChange} rows={4}
//                     placeholder="Describe operational, strategic, or organizational barriers."
//                     className={`${inputCls} resize-none`}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelCls}>What outcomes are you hoping to achieve? *</label>
//                   <textarea name="outcomes" value={form.outcomes} onChange={handleChange} rows={4}
//                     placeholder="Describe what success looks like."
//                     className={`${inputCls} resize-none`}
//                   />
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
//                     <p className="font-jakarta text-sm text-red-600">{error}</p>
//                   </div>
//                 )}

//                 <div className="h-px bg-[#E8ECF2]" />

//                 <div className="space-y-3">
//                   <button onClick={handleFormSubmit} disabled={loading}
//                     className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group"
//                   >
//                     {loading
//                       ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
//                       : <>Continue to Payment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
//                     }
//                   </button>
//                   <p className="font-jakarta text-xs text-[#94A3B8] text-center">
//                     Next step: choose your payment method and confirm your engagement.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ── PAYMENT STEP ── */}
//           {step === "payment" && (
//             <div className="bg-white rounded-3xl border border-[#DDE3EE] shadow-sm overflow-hidden">
//               <div className="bg-[#1F2A44] px-8 py-7 md:px-10">
//                 <h2 className="font-clash font-bold text-white text-xl mb-1">Complete Your Booking</h2>
//                 <p className="font-jakarta text-white/55 text-sm">Choose how you would like to pay to confirm your engagement.</p>
//               </div>

//               <div className="px-6 py-8 md:px-10 md:py-10 space-y-6">

//                 {/* Session summary */}
//                 <div className="bg-[#F4F6F9] rounded-xl p-5 border border-[#E2E8F0]">
//                   <div className="flex items-start justify-between gap-4">
//                     <div>
//                       <p className="font-clash font-bold text-[#1F2A44]">Enterprise Consultation</p>
//                       <p className="font-jakarta text-xs text-[#94A3B8] mt-1">Deep-dive audit + transformation roadmap</p>
//                       <p className="font-jakarta text-xs text-[#94A3B8] mt-0.5">Booked for: {form.name} · {form.organization}</p>
//                     </div>
//                     <div className="text-right flex-shrink-0">
//                       <p className="font-clash font-bold text-[#1F2A44] text-lg">${USD_PRICE}</p>
//                       {ngnAmount && (
//                         <p className="font-jakarta text-xs text-[#94A3B8]">{formatNgn(ngnAmount)}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* NGN total */}
//                 <div className="bg-[#1F2A44] rounded-xl p-5 text-center">
//                   <p className="font-jakarta text-white/60 text-xs mb-1">Total due today</p>
//                   <p className="font-clash font-bold text-white text-3xl">
//                     {ngnAmount ? formatNgn(ngnAmount) : "..."}
//                   </p>
//                   <p className="font-jakarta text-white/40 text-xs mt-1">
//                     ${USD_PRICE} · Rate: ₦{Math.round(rate).toLocaleString()}/USD (live)
//                   </p>
//                 </div>

//                 {/* Payment method */}
//                 <div>
//                   <p className="font-clash font-bold text-sm text-[#1F2A44] mb-3">Select payment method</p>
//                   <div className="space-y-2.5">
//                     <PaymentMethodCard provider="paystack" selected={selectedProvider === "paystack"} onSelect={() => setSelectedProvider("paystack")} />
//                     <PaymentMethodCard provider="flutterwave" selected={selectedProvider === "flutterwave"} onSelect={() => setSelectedProvider("flutterwave")} />
//                   </div>
//                 </div>

//                 {error && (
//                   <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
//                     <p className="font-jakarta text-sm text-red-600">{error}</p>
//                   </div>
//                 )}

//                 <div className="h-px bg-[#E8ECF2]" />

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => { setStep("form"); setError(""); }}
//                     className="flex items-center gap-1.5 px-5 py-3.5 border-2 border-[#E2E8F0] text-[#64748B] rounded-xl font-clash font-semibold text-sm hover:border-[#1F2A44] hover:text-[#1F2A44] transition-all duration-200"
//                   >
//                     <ArrowLeft className="w-4 h-4" />
//                     Back
//                   </button>
//                   <button onClick={handlePayment} disabled={paymentLoading}
//                     className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group"
//                   >
//                     {paymentLoading
//                       ? <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting...</>
//                       : <>Pay with {selectedProvider === "paystack" ? "Paystack" : "Flutterwave"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>
//                     }
//                   </button>
//                 </div>

//                 <p className="font-jakarta text-xs text-[#94A3B8] text-center">
//                   Secured payment. Your card details are never stored by us.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }

"use client";

import { useRef, useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Loader2, Check } from "lucide-react";

const considerationAreas = [
  "Operations",
  "Knowledge Systems",
  "Customer Experience",
  "Product",
  "Organization-Wide Transformation",
];

const maturityOptions = [
  "Exploring Opportunities",
  "Early Experiments",
  "Active Pilots",
  "Multiple Initiatives Running",
];

type Step = "form" | "payment";
type PaymentProvider = "paystack" | "flutterwave";

const USD_PRICE = 499;

function PaymentMethodCard({
  provider,
  selected,
  onSelect,
  isNigerian,
}: {
  provider: PaymentProvider;
  selected: boolean;
  onSelect: () => void;
  isNigerian: boolean;
}) {
  const isPaystack = provider === "paystack";
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 flex items-center gap-4 ${
        selected ? "border-[#1F2A44] bg-[#1F2A44]" : "border-[#E2E8F0] hover:border-[#94A3B8] bg-white"
      }`}
    >
      <div className={`h-10 w-36 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden px-3 ${
        selected ? "bg-white/15" : "bg-[#F4F6F9]"
      }`}>
        <Image
          src={isPaystack ? "/images/paystack-logo.png" : "/images/flutterwave-logo.png"}
          alt={isPaystack ? "Paystack" : "Flutterwave"}
          width={150}
          height={80}
          className="h-12 w-auto object-contain"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          {isPaystack && isNigerian && (
            <span className="inline-block px-2 py-0.5 bg-emerald-500/15 text-emerald-600 text-[10px] font-clash font-bold rounded-full border border-emerald-500/20">
              Recommended for Nigerians
            </span>
          )}
          {!isPaystack && !isNigerian && (
            <span className="inline-block px-2 py-0.5 bg-blue-500/15 text-blue-600 text-[10px] font-clash font-bold rounded-full border border-blue-500/20">
              Best for international
            </span>
          )}
        </div>
        <p className={`font-jakarta text-xs mt-1 ${selected ? "text-white/70" : "text-[#94A3B8]"}`}>
          {isPaystack ? "Cards, bank transfer, USSD · NGN & USD" : "Cards, mobile money · Charged in USD"}
        </p>
      </div>
      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        selected ? "border-white" : "border-[#CBD5E1]"
      }`}>
        {selected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
      </span>
    </button>
  );
}

export default function ExecutiveDiscoveryPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>("paystack");
  const [ngnAmount, setNgnAmount] = useState<number | null>(null);
  const [rate, setRate] = useState(1600);
  const [fetchingRate, setFetchingRate] = useState(true);
  const [isNigerian, setIsNigerian] = useState(false);

  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    role: "",
    why_ai: "",
    areas: [] as string[],
    maturity: "",
    challenges: "",
    outcomes: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeroVisible(true); },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchRate();
    detectLocation();
  }, []);

  const detectLocation = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      setIsNigerian(data.country_code === "NG");
    } catch {
      setIsNigerian(false);
    }
  };

  const fetchRate = async () => {
    setFetchingRate(true);
    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      const data = await res.json();
      const liveRate = data.rates?.NGN || 1600;
      setRate(liveRate);
      setNgnAmount(Math.round(USD_PRICE * liveRate));
    } catch {
      setRate(1600);
      setNgnAmount(Math.round(USD_PRICE * 1600));
    } finally {
      setFetchingRate(false);
    }
  };

  const formatNgn = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const toggleArea = (area: string) => {
    setForm((prev) => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter((a) => a !== area)
        : [...prev.areas, area],
    }));
    setError("");
  };

  const handleFormSubmit = async () => {
    const { name, organization, email, role, why_ai, areas, maturity, challenges, outcomes } = form;
    if (!name || !organization || !email || !role || !why_ai || areas.length === 0 || !maturity || !challenges || !outcomes) {
      setError("Please fill in all required fields and select at least one area.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await fetch("/api/submit-executive-discovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, areas: form.areas.join(", ") }),
      });
    } catch { /* non-blocking */ } finally {
      setLoading(false);
      setStep("payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    setError("");
    try {
      const res = await fetch("/api/initialize-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "enterprise",
          email: form.email,
          full_name: form.name,
          provider: selectedProvider,
          metadata: {
            company_name: form.organization,
            role: form.role,
            why_ai: form.why_ai,
            areas: form.areas.join(", "),
            maturity: form.maturity,
            challenges: form.challenges,
            outcomes: form.outcomes,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setPaymentLoading(false);
        return;
      }
      window.location.href = data.authorization_url;
    } catch {
      setError("Something went wrong. Please try again.");
      setPaymentLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] placeholder:text-[#CBD5E1] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white";
  const selectCls = "w-full px-4 py-3.5 rounded-xl border-2 border-[#E2E8F0] font-jakarta text-sm text-[#1F2A44] focus:outline-none focus:border-[#1F2A44] transition-colors duration-200 bg-white appearance-none cursor-pointer";
  const labelCls = "block font-clash font-semibold text-sm text-[#1F2A44] mb-1.5";

  return (
    <main className="min-h-screen">
      <Header />

      <section ref={heroRef} className="relative flex items-center justify-center bg-gradient-to-br from-[#E6EAF0] via-white to-white overflow-hidden pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A2D2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#5B6CFF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom w-full relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`mb-5 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F2A44]/8 text-[#1F2A44] rounded-full text-xs font-clash font-bold uppercase tracking-[0.16em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1F2A44]" />
                Enterprise Consultation · $499
              </span>
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-clash font-bold text-[#1F2A44] leading-tight mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              Build A Roadmap For AI Adoption
            </h1>
            <p className={`font-jakarta text-base lg:text-lg text-[#5a6580] leading-relaxed max-w-2xl mx-auto mb-3 transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              A structured assessment for leadership teams evaluating broader AI initiatives. We will map your organization, identify priorities, and deliver a written transformation roadmap.
              <span className="block mt-2">Complete the assessment below, then confirm your engagement with payment.</span>
            </p>
            <p className={`font-clash text-sm font-semibold text-[#1F2A44]/60 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {fetchingRate ? "Loading price..." : `$${USD_PRICE} · ${ngnAmount ? formatNgn(ngnAmount) : ""} at today's rate`}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F6F9] py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-[680px] mx-auto">

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-clash font-bold text-xs transition-all ${
              step === "form" ? "bg-[#1F2A44] text-white" : "bg-white border border-[#E2E8F0] text-[#94A3B8]"
            }`}>
              {step === "payment" ? <Check className="w-3.5 h-3.5" /> : <span>1</span>}
              Discovery Assessment
            </div>
            <div className="flex-1 h-px bg-[#E2E8F0]" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-clash font-bold text-xs transition-all ${
              step === "payment" ? "bg-[#1F2A44] text-white" : "bg-white border border-[#E2E8F0] text-[#94A3B8]"
            }`}>
              <span>2</span>
              Payment
            </div>
          </div>

          {/* ── FORM ── */}
          {step === "form" && (
            <div className="bg-white rounded-3xl border border-[#DDE3EE] shadow-sm overflow-hidden">
              <div className="bg-[#1F2A44] px-8 py-7 md:px-10">
                <h2 className="font-clash font-bold text-white text-xl mb-1">Executive Discovery Assessment</h2>
                <p className="font-jakarta text-white/55 text-sm">Help us understand your organization, priorities, and transformation goals.</p>
              </div>
              <div className="px-6 py-8 md:px-10 md:py-10 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Organization *</label>
                    <input name="organization" value={form.organization} onChange={handleChange} placeholder="Your organization" className={inputCls} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Your Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@organization.com" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Role / Position *</label>
                    <input name="role" value={form.role} onChange={handleChange} placeholder="CEO, COO, Director..." className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Why are you evaluating AI adoption? *</label>
                  <textarea name="why_ai" value={form.why_ai} onChange={handleChange} rows={4} placeholder="Describe the business drivers behind this initiative." className={`${inputCls} resize-none`} />
                </div>
                <div>
                  <label className={`${labelCls} mb-3`}>Which areas are being considered? *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {considerationAreas.map((area) => {
                      const checked = form.areas.includes(area);
                      return (
                        <button key={area} type="button" onClick={() => toggleArea(area)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left font-jakarta text-sm transition-all duration-150 ${
                            checked ? "border-[#1F2A44] bg-[#1F2A44] text-white" : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#94A3B8]"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center ${checked ? "border-white bg-white" : "border-[#CBD5E1]"}`}>
                            {checked && <svg className="w-2.5 h-2.5 text-[#1F2A44]" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 6l3 3 5-5" /></svg>}
                          </span>
                          {area}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Current AI Maturity *</label>
                  <select name="maturity" value={form.maturity} onChange={handleChange} className={selectCls}>
                    <option value="" disabled>Select current stage</option>
                    {maturityOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>What are the biggest organizational challenges today? *</label>
                  <textarea name="challenges" value={form.challenges} onChange={handleChange} rows={4} placeholder="Describe operational, strategic, or organizational barriers." className={`${inputCls} resize-none`} />
                </div>
                <div>
                  <label className={labelCls}>What outcomes are you hoping to achieve? *</label>
                  <textarea name="outcomes" value={form.outcomes} onChange={handleChange} rows={4} placeholder="Describe what success looks like." className={`${inputCls} resize-none`} />
                </div>
                {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3"><p className="font-jakarta text-sm text-red-600">{error}</p></div>}
                <div className="h-px bg-[#E8ECF2]" />
                <div className="space-y-3">
                  <button onClick={handleFormSubmit} disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <>Continue to Payment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>}
                  </button>
                  <p className="font-jakarta text-xs text-[#94A3B8] text-center">Next step: choose your payment method and confirm your engagement.</p>
                </div>
              </div>
            </div>
          )}

          {/* ── PAYMENT ── */}
          {step === "payment" && (
            <div className="bg-white rounded-3xl border border-[#DDE3EE] shadow-sm overflow-hidden">
              <div className="bg-[#1F2A44] px-8 py-7 md:px-10">
                <h2 className="font-clash font-bold text-white text-xl mb-1">Complete Your Booking</h2>
                <p className="font-jakarta text-white/55 text-sm">Choose how you would like to pay to confirm your engagement.</p>
              </div>
              <div className="px-6 py-8 md:px-10 md:py-10 space-y-6">
                <div className="bg-[#F4F6F9] rounded-xl p-5 border border-[#E2E8F0]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-clash font-bold text-[#1F2A44]">Enterprise Consultation</p>
                      <p className="font-jakarta text-xs text-[#94A3B8] mt-1">Deep-dive audit + transformation roadmap</p>
                      <p className="font-jakarta text-xs text-[#94A3B8] mt-0.5">Booked for: {form.name} · {form.organization}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-clash font-bold text-[#1F2A44] text-lg">${USD_PRICE}</p>
                      {ngnAmount && <p className="font-jakarta text-xs text-[#94A3B8]">{formatNgn(ngnAmount)}</p>}
                    </div>
                  </div>
                </div>
                <div className="bg-[#1F2A44] rounded-xl p-5 text-center">
                  <p className="font-jakarta text-white/60 text-xs mb-1">Total due today</p>
                  <p className="font-clash font-bold text-white text-3xl">{ngnAmount ? formatNgn(ngnAmount) : "..."}</p>
                  <p className="font-jakarta text-white/40 text-xs mt-1">${USD_PRICE} · Rate: ₦{Math.round(rate).toLocaleString()}/USD (live)</p>
                </div>
                <div>
                  <p className="font-clash font-bold text-sm text-[#1F2A44] mb-3">Select payment method</p>
                  <div className="space-y-2.5">
                    <PaymentMethodCard provider="paystack" selected={selectedProvider === "paystack"} onSelect={() => setSelectedProvider("paystack")} isNigerian={isNigerian} />
                    <PaymentMethodCard provider="flutterwave" selected={selectedProvider === "flutterwave"} onSelect={() => setSelectedProvider("flutterwave")} isNigerian={isNigerian} />
                  </div>
                </div>
                {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3"><p className="font-jakarta text-sm text-red-600">{error}</p></div>}
                <div className="h-px bg-[#E8ECF2]" />
                <div className="flex gap-3">
                  <button onClick={() => { setStep("form"); setError(""); }}
                    className="flex items-center gap-1.5 px-5 py-3.5 border-2 border-[#E2E8F0] text-[#64748B] rounded-xl font-clash font-semibold text-sm hover:border-[#1F2A44] hover:text-[#1F2A44] transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button onClick={handlePayment} disabled={paymentLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1F2A44] text-white rounded-xl font-clash font-bold text-[15px] transition-all duration-300 hover:bg-[#263352] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {paymentLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Redirecting...</> : <>Pay with {selectedProvider === "paystack" ? "Paystack" : "Flutterwave"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" /></>}
                  </button>
                </div>
                <p className="font-jakarta text-xs text-[#94A3B8] text-center">Secured payment. Your card details are never stored by us.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AnalyticsProvider } from "./providers";

// Google Fonts
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Local font - Clash Display
const clash = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const codec = localFont({
  src: [
    {
      path: "../../public/fonts/CodecPro-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-codec",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Refactrd | Your Favourite AI Engineering Studio",
  description:
    "We build AI-powered systems that help companies do less manual work. Workflow automation, AI assistants, product AI features, and agentic workflows for businesses globally.",
  keywords: [
    "AI engineering studio",
    "AI automation",
    "workflow automation",
    "AI assistants",
    "internal AI copilots",
    "AI features development",
    "agentic workflows",
    "AI operations",
    "enterprise AI implementation",
    "West Africa AI solutions",
    "Lagos AI studio",
    "startup AI automation",
  ],
  authors: [{ name: "Refactrd" }],
  creator: "Refactrd",
  publisher: "Refactrd",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://refactrd.com",
    title: "Refactrd | AI Engineering Studio",
    description:
      "We build AI-powered systems that help companies do less manual work. Workflow automation, AI assistants, and agentic workflows for businesses globally.",
    siteName: "Refactrd",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refactrd | AI Engineering Studio",
    description:
      "We build AI-powered systems that help companies do less manual work. Workflow automation, AI assistants, and agentic workflows.",
    creator: "@refactrd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: "/refactored_favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakarta.variable} ${montserrat.variable} ${clash.variable} ${codec.variable} antialiased`}
      >
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!} />
    </html>
  );
}
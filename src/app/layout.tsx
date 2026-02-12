import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
// Note: You'll need to add Clash Display font files to your public/fonts directory
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

export const metadata: Metadata = {
  title: "Refactrd | Outsource Your Software Development",
  description:
    "Product development, automation, and technical documentation delivered with clarity, structure, and ownership. Build reliable software with Refactrd.",
  keywords: [
    "software development",
    "web development",
    "mobile app development",
    "DevOps",
    "technical documentation",
    "AI automation",
    "outsourced development",
    "software engineering",
  ],
  authors: [{ name: "Refactrd" }],
  creator: "Refactrd",
  publisher: "Refactrd",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://refactrd.com",
    title: "Refactrd | Outsource Your Software Development",
    description:
      "Product development, automation, and technical documentation delivered with clarity, structure, and ownership.",
    siteName: "Refactrd",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refactrd | Outsource Your Software Development",
    description:
      "Product development, automation, and technical documentation delivered with clarity, structure, and ownership.",
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
        className={`${jakarta.variable} ${montserrat.variable} ${clash.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

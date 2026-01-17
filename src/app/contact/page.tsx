// src/app/(marketing)/contact/page.tsx
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactContent } from '@/components/sections/contact/ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Refactrd to start a hiring conversation. We work with companies seeking qualified engineers and a structured, dependable hiring process.',
  openGraph: {
    title: 'Contact Us | Refactrd',
    description: 'Start a hiring conversation with Refactrd. Explore remote, full-time engineering hires.',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <ContactHero />
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
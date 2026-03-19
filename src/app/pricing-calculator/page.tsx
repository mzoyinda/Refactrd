import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PricingCalculator from '@/components/sections/pricing/PricingCalculator';

export const metadata = {
  title: 'Pricing Calculator | Get Your Custom Quote - Refactrd',
  description:
    'Calculate an estimated investment for your project. Get instant pricing for websites, operational systems, automation, and custom software development.',
  keywords: [
    'pricing calculator',
    'software development cost',
    'project estimate',
    'custom quote',
    'website pricing',
    'app development cost',
  ],
};

export default function PricingCalculatorPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PricingCalculator />
      <Footer />
    </main>
  );
}
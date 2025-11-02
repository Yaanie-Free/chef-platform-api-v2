// app/page.tsx
import PremiumHeader from '@/components/premium/PremiumHeader';
import PremiumHero from '@/components/premium/PremiumHero';
import PremiumFooter from '@/components/premium/PremiumFooter';
import FeaturedChefs from '@/components/sections/FeaturedChefs';
import TrustBadges from '@/components/sections/TrustBadges';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';

export const metadata = {
  title: 'Table & Plate - Find Your Perfect Private Chef',
  description: 'Book luxury private chefs in South Africa',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <PremiumHeader />
      
      <main className="flex-grow">
        <PremiumHero />
        <TrustBadges />
        <FeaturedChefs /> {/* Chef cards/carousel */}
        <Testimonials />
        <CTASection />
      </main>
      
      <PremiumFooter />
    </div>
  );
}
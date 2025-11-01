import LuxuryHeader from '@/components/luxury/LuxuryHeader';
import LuxuryFooter from '@/components/luxury/LuxuryFooter';
import LuxuryHero from '@/components/luxury/LuxuryHero';
import TrustBadges from '@/components/sections/TrustBadges';
import FeaturedChefs from '@/components/sections/FeaturedChefs';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <LuxuryHeader />
      
      <main className="flex-grow">
        <LuxuryHero />
        <TrustBadges />
        <FeaturedChefs />
        <Testimonials />
        <CTASection />
      </main>
      
      <LuxuryFooter />
    </div>
  );
}
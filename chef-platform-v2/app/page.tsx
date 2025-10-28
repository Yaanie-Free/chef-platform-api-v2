import Header from '@/components/features/layout/Header';
import Footer from '@/components/features/layout/Footer';
import UniversalHero from '@/components/sections/UniversalHero';
import FeaturedChefs from '@/components/sections/FeaturedChefs';
import HowItWorks from '@/components/sections/HowItWorks';
import Cuisines from '@/components/sections/Cuisines';
import Testimonials from '@/components/sections/Testimonials';
import PopularCities from '@/components/sections/PopularCities';
import CTASection from '@/components/sections/CTASection';
import TrustBadges from '@/components/sections/TrustBadges';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <UniversalHero />
        <TrustBadges />
        <FeaturedChefs />
        <HowItWorks />
        <Cuisines />
        <PopularCities />
        <Testimonials />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
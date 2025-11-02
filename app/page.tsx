import PremiumHeader from '@/components/premium/PremiumHeader';
import PremiumHero from '@/components/premium/PremiumHero';
import PremiumFooter from '@/components/premium/PremiumFooter';

export const metadata = {
  title: 'Table & Plate - Find Your Perfect Private Chef',
  description: 'Book luxury private chefs in South Africa for unforgettable dining experiences.',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <PremiumHeader />
      
      <main className="flex-grow">
        <PremiumHero />
        
        {/* Placeholder for future sections */}
        <div className="py-20 text-center text-white">
          <p className="text-gray-400">More sections coming soon...</p>
        </div>
      </main>
      
      <PremiumFooter />
    </div>
  );
}
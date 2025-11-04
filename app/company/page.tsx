// app/company/page.tsx
import PremiumHeader from '@/components/premium/PremiumHeader';
import PremiumFooter from '@/components/premium/PremiumFooter';

export const metadata = {
  title: 'About Us - Table & Plate',
  description: 'Discover the mission and vision behind Table & Plate.',
};

export default function CompanyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <PremiumHeader />
      
      <main className="flex-grow pt-32 pb-20 max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-white mb-6">Our Company</h1>
        <p className="text-lg text-gray-400">
          This page is ready for the detailed mission, values, and team components.
        </p>
      </main>
      
      <PremiumFooter />
    </div>
  );
}
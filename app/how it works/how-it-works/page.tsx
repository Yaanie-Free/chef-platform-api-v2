// app/how-it-works/page.tsx
import PremiumHeader from '@/components/premium/PremiumHeader';
import PremiumFooter from '@/components/premium/PremiumFooter';

export const metadata = {
  title: 'How It Works - Table & Plate',
  description: 'Learn the simple steps to booking your luxury private chef.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <PremiumHeader />
      
      <main className="flex-grow pt-32 pb-20 max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-white mb-6">How It Works</h1>
        <p className="text-lg text-gray-400">
          This page is ready for the detailed step-by-step feature component design.
        </p>
        
        {/* Placeholder for future content sections */}
        <div className="mt-12 py-10 border-t border-gray-800 text-center">
            <p className="text-gray-600">Content sections coming soon...</p>
        </div>
      </main>
      
      <PremiumFooter />
    </div>
  );
}
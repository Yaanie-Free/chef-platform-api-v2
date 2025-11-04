// app/review/page.tsx
import PremiumHeader from '@/components/premium/PremiumHeader';
import PremiumFooter from '@/components/premium/PremiumFooter';

export const metadata = {
  title: 'Review Your Experience - Table & Plate',
  description: 'Share feedback and rate your private dining experience.',
};

export default function ReviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <PremiumHeader />
      
      <main className="flex-grow pt-32 pb-20 max-w-xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">Review Your Experience</h1>
        <p className="text-lg text-gray-400">
          This page is ready for the rating form and submission component.
        </p>
      </main>
      
      <PremiumFooter />
    </div>
  );
}
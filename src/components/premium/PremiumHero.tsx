// src/components/premium/PremiumHero.tsx
'use client';

import Link from 'next/link';

/**
 * SELF-CONTAINED PREMIUM HERO
 * ✅ Zero dependencies
 * ✅ Fast loading
 * ✅ Mobile responsive
 * ✅ Easy to customize
 */

interface PremiumHeroProps {
  className?: string;
}

export default function PremiumHero({ className = '' }: PremiumHeroProps) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center bg-black px-6 pt-24 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Find Your Perfect
          <br />
          <span className="text-red-600">Private Chef</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Connect with top-rated private chefs in South Africa.
          <br />
          Experience fine dining in the comfort of your own home.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/discover"
            className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-center"
          >
            Find Your Chef
          </Link>
          <Link 
            href="/signup?type=chef"
            className="px-8 py-4 border border-gray-700 text-white rounded-lg hover:bg-gray-900 transition font-medium text-center"
          >
            Become a Chef
          </Link>
        </div>
      </div>
    </section>
  );
}
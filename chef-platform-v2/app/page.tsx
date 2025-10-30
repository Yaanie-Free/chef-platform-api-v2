"use client";
import React from 'react';
import Header from '@/components/features/layout/Header';
import Footer from '@/components/features/layout/Footer';
import UniversalHero from '@/components/sections/UniversalHero';
import FeaturedChefs from '@/components/sections/FeaturedChefs';
import HowItWorks from '@/components/sections/HowItWorks';
import CTASection from '@/components/sections/CTASection';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ChefSignupFlow from '@/components/auth/ChefSignupFlow';

export default function Home() {
  const [openChefSignup, setOpenChefSignup] = React.useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Header onChefSignupClick={() => setOpenChefSignup(true)} />
      
      <main className="flex-grow pt-16">
        <UniversalHero />
        <FeaturedChefs />
        <HowItWorks />
        <CTASection />
      </main>
      
      <Footer />

      <Dialog open={openChefSignup} onOpenChange={setOpenChefSignup}>
        <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-none">
          <div className="flex items-center justify-center py-8">
            <ChefSignupFlow modal onClose={() => setOpenChefSignup(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
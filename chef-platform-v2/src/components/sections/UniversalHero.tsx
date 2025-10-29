"use client";
import React from 'react';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Button } from '@/components/ui/Button'; 
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';
import { cn } from '@/lib/utils';

const UniversalHero: React.FC = React.memo(() => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-pink-950 dark:via-background dark:to-rose-950" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <ResponsiveLayout className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className={cn(
            'font-bold text-foreground mb-6',
            isMobile ? 'text-4xl sm:text-5xl' : 
            isTablet ? 'text-5xl sm:text-6xl' : 
            'text-6xl sm:text-7xl lg:text-8xl'
          )}>
            <span className="block">Welcome to Table & Plate</span>
          </h1>

          {/* Subheading */}
          <p className={cn(
            'text-muted-foreground mb-8 max-w-2xl mx-auto',
            isMobile ? 'text-base sm:text-lg' : 
            isTablet ? 'text-lg sm:text-xl' : 
            'text-xl sm:text-2xl'
          )}>
            Luxury made personal
          </p>

          {/* CTA Buttons */}
          <div className={cn(
            'flex flex-col sm:flex-row gap-4 justify-center items-center',
            isMobile ? 'mb-8' : 'mb-12'
          )}>
            <Link href="/signup">
              <Button
                size={isMobile ? 'responsive' : 'lg'}
                variant="gradient"
                className="w-full sm:w-auto"
              >
                Get started
              </Button>
            </Link>
            <Button
              size={isMobile ? 'responsive' : 'lg'}
              variant="outline"
              className="w-full sm:w-auto"
            >
              How It Works
            </Button>
          </div>
        </div>
      </ResponsiveLayout>
    </section>
  );
});

export default UniversalHero;
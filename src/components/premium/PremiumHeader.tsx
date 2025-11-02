// src/components/premium/PremiumHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * FINAL HEADER IMPLEMENTATION: PILL/THREE-STATE LOGIC
 * ✅ Pill-shaped component when collapsed (Image 2/3 style)
 * ✅ Expanded/Collapsed/Hovered states based on scroll position
 * ✅ Far-left logo, far-right CTA, central nav links
 * ✅ Removed search bar and hamburger menu
 */

// ============================================
// CONFIGURATION
// ============================================

// Navigation items visible only in the expanded/hovered desktop state
const NAV_ITEMS = [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Company', href: '/company' },
    { label: 'Support', href: '/support' },
];

interface PremiumHeaderProps {
  className?: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function PremiumHeader({ className = '' }: PremiumHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // SCROLL HANDLER: Checks scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Set to true if scrolled beyond 100px
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LOGIC: Determines the visual state
  // Expanded at top (default), OR expanded by hover when scrolled down
  const isExpanded = !isScrolled || isHovered; 

  // Dynamic Class Names for the Pill effect
  const headerPaddingClass = isExpanded ? 'py-4 md:py-5' : 'py-2 md:py-3';
  const logoTextClass = isExpanded ? 'text-2xl' : 'text-xl';
  
  // Outer Container Styling: Makes the header component a pill when scrolled
  const outerContainerClass = isScrolled 
    ? 'top-4 left-1/2 -translate-x-1/2 max-w-7xl mx-auto rounded-full' // Pill shape when scrolled
    : 'top-0 left-0 right-0 max-w-full'; // Full width when at top

  // Inner Background Styling: Adds shadow and color
  const innerBgClass = isExpanded 
    ? 'bg-white shadow-xl' // Solid white, strong shadow when expanded
    : 'bg-white/95 backdrop-blur-md shadow-lg'; // Translucent, blur when collapsed

  // Navigation visibility: hides unless expanded
  const navOpacityClass = isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none';

  return (
    <header
      className={`fixed z-50 transition-all duration-300 ${outerContainerClass} ${className}`}
      // Apply hover state tracking only if scrolled
      onMouseEnter={() => isScrolled && setIsHovered(true)}
      onMouseLeave={() => isScrolled && setIsHovered(false)}
    >
      <div
        className={`border border-gray-100 transition-all duration-300 ${innerBgClass} ${headerPaddingClass} ${isScrolled ? 'rounded-full' : ''}`}
      >
        <nav className={`mx-auto px-6 ${isScrolled ? 'max-w-7xl' : 'max-w-full'}`}>
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* Left: Logo and Name (Far Left) */}
            <Link
              href="/"
              className={`font-light text-gray-900 hover:text-gray-700 transition-all duration-300 flex-shrink-0 ${logoTextClass}`}
            >
              Table & Plate
            </Link>

            {/* Center: Navigation Links (Desktop - Disappear when collapsed) */}
            <div 
                className={`hidden lg:flex items-center gap-8 transition-all duration-300 flex-grow justify-center ${navOpacityClass}`}
            >
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm transition-colors ${
                            pathname === item.href
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* Right: CTA Button (Far Right) */}
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/signup" // Changed to general /signup
                className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
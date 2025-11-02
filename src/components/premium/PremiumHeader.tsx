// src/components/premium/PremiumHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * FINAL HEADER IMPLEMENTATION: SPACED & SMOOTHED TRANSITIONS
 * ✅ Fixed Spacing: Navigation links are grouped and centered.
 * ✅ Smooth Transitions: Uses long duration CSS for slow, appearance/position changes.
 */

// ============================================
// CONFIGURATION (No change, kept for context)
// ============================================

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
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LOGIC: Determines the visual state
  const isExpanded = !isScrolled || isHovered; 

  // --- STYLING LOGIC ---

  // Outer Container Styling: Apply transition to everything for smooth movement.
  const outerContainerClass = `left-1/2 -translate-x-1/2 mx-auto transition-all duration-700 ease-out ${ // INCREASED DURATION to 700ms for smooth movement
    isScrolled ? 'top-4 max-w-7xl' : 'top-6 max-w-7xl'
  }`;
  
  // Inner Background Styling: Dark, smoky background for the pill.
  const innerBgClass = isExpanded 
    ? 'bg-gray-800/95 shadow-2xl'
    : 'bg-gray-900/90 backdrop-blur-md shadow-xl'; 
  
  // Padding & Text size adjust on scroll/hover state
  const headerPaddingClass = isExpanded ? 'py-4 md:py-5' : 'py-2 md:py-3';
  const logoTextClass = isExpanded ? 'text-2xl text-white' : 'text-xl text-white';
  
  // Navigation visibility: Apply transition directly to the links container
  const navOpacityClass = isExpanded 
    ? 'opacity-100 transition-opacity duration-500 delay-200' // Slow fade in
    : 'opacity-0 pointer-events-none transition-opacity duration-300'; // Slow fade out
  
  // Link colors within the pill
  const navTextColorClass = isExpanded ? 'text-gray-300' : 'text-gray-400';

  return (
    <header
      className={`fixed z-50 ${outerContainerClass} ${className}`}
      onMouseEnter={() => isScrolled && setIsHovered(true)}
      onMouseLeave={() => isScrolled && setIsHovered(false)}
    >
      <div
        className={`rounded-full border border-gray-700 transition-all duration-700 ease-out ${innerBgClass} ${headerPaddingClass}`} // INCREASED DURATION for background/size change
      >
        <nav className="mx-auto px-6 max-w-full">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* Left: Logo and Name (Far Left) */}
            <Link
              href="/"
              className={`font-light hover:text-red-500 transition-colors duration-300 flex-shrink-0 ${logoTextClass}`}
            >
              Table & Plate
            </Link>

            {/* Center: Navigation Links (Grouped and Centered) */}
            <div 
                // key fix: Removed flex-grow and justify-center. Added mx-auto for centering the group.
                className={`hidden lg:flex items-center gap-10 mx-auto flex-shrink-0 ${navOpacityClass}`}
            >
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm transition-colors ${
                            pathname === item.href
                            ? 'text-white font-medium'
                            : `${navTextColorClass} hover:text-white`
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* Right: CTA Button (Far Right) */}
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/signup"
                className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
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
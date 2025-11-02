// src/components/premium/PremiumHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * FINAL HEADER IMPLEMENTATION: LENGTH ADJUSTMENT
 * ✅ Pill component width remains constant in all states.
 * ✅ Pill component length is doubled in the expanded state.
 * ✅ Smooth transitions applied to vertical padding.
 */

// ============================================
// CONFIGURATION
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
  
  // Outer Container Styling: Max-width is constant. Position adjusts slightly.
  const outerContainerClass = `left-1/2 -translate-x-1/2 mx-auto transition-all duration-700 ease-out max-w-7xl ${
    isScrolled ? 'top-4' : 'top-6' // Position adjustment for floating effect
  }`;
  
  // Inner Background Styling: Dark, smoky background for the pill.
  const innerBgClass = isExpanded 
    ? 'bg-gray-800/95 shadow-2xl'
    : 'bg-gray-900/90 backdrop-blur-md shadow-xl'; 
  
  // Vertical Padding Control (The Length Adjustment)
  // Expanded: Py-8/Py-10 (Roughly double the current py-4/py-5)
  // Collapsed: Py-4/Py-5 (Current small size)
  const headerPaddingClass = isExpanded ? 'py-8 md:py-10' : 'py-4 md:py-5'; 
  
  // Text size/color
  const logoTextClass = isExpanded ? 'text-3xl text-white' : 'text-2xl text-white'; // Adjusted text size to match larger pill
  const navOpacityClass = isExpanded 
    ? 'opacity-100 transition-opacity duration-500 delay-200'
    : 'opacity-0 pointer-events-none transition-opacity duration-300';
  const navTextColorClass = isExpanded ? 'text-gray-300' : 'text-gray-400';

  return (
    <header
      className={`fixed z-50 ${outerContainerClass} ${className}`}
      onMouseEnter={() => isScrolled && setIsHovered(true)}
      onMouseLeave={() => isScrolled && setIsHovered(false)}
    >
      <div
        // Note: transition-all will now smoothly animate the padding change
        className={`rounded-full border border-gray-700 transition-all duration-700 ease-out ${innerBgClass} ${headerPaddingClass}`}
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
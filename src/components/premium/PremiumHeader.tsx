// src/components/premium/PremiumHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * FINAL HEADER IMPLEMENTATION: MINIMUM WIDTH AND MOBILE CLEAN-UP
 * ✅ Collapsed Width increased to max-w-2xl for better spacing.
 * ✅ Mobile view simplified by removing the logo text.
 */

// ============================================
// INLINE ICONS
// ============================================

const MenuIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // SCROLL HANDLER: Checks scroll position and screen width
  useEffect(() => {
    const handleScroll = () => {
      // Logic to determine if it's desktop view (width > 1024px)
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) { 
        setIsScrolled(window.scrollY > 100);
      } else {
        // Force the minimalist view on mobile by setting isScrolled to true
        setIsScrolled(true); 
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    }
  }, []);

  // LOGIC: Desktop Expansion
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const isExpanded = isDesktop ? (!isScrolled || isHovered) : false; 

  // --- STYLING LOGIC ---
  
  // Collapsed Width increased to max-w-2xl for better spacing
  const pillWidthClass = isExpanded ? 'max-w-7xl' : 'max-w-2xl'; 
  
  // Outer Container Styling
  const outerContainerClass = `w-full left-1/2 -translate-x-1/2 mx-auto transition-all duration-700 ease-out ${
    isScrolled ? 'top-4' : 'top-6'
  }`;
  
  // Inner Background Styling
  const innerBgClass = isExpanded 
    ? 'bg-gray-800/95 shadow-2xl'
    : 'bg-gray-900/90 backdrop-blur-md shadow-xl'; 
  
  // Vertical Padding Control (CONSTANT/SMALL LENGTH)
  const headerPaddingClass = 'py-4 md:py-5'; 
  
  // Text size/color
  const logoTextClass = isExpanded ? 'text-2xl text-white' : 'text-xl text-white';
  const navOpacityClass = isExpanded 
    ? 'opacity-100 transition-opacity duration-500 delay-200'
    : 'opacity-0 pointer-events-none transition-opacity duration-300';
  const navTextColorClass = isExpanded ? 'text-gray-300' : 'text-gray-400';

  return (
    <header
      className={`fixed z-50 ${outerContainerClass} ${pillWidthClass} ${className}`}
      onMouseEnter={() => isDesktop && isScrolled && setIsHovered(true)}
      onMouseLeave={() => isDesktop && isScrolled && setIsHovered(false)}
    >
      <div
        className={`w-full rounded-full border border-gray-700 transition-all duration-700 ease-out ${innerBgClass} ${headerPaddingClass}`}
      >
        <nav className="mx-auto px-6 max-w-full">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* Left: Logo and Name (Hidden on Mobile/Collapsed) */}
            <Link
              href="/"
              // Hide on mobile and when collapsed (minimalist view)
              className={`font-light hover:text-red-500 transition-colors duration-300 flex-shrink-0 ${logoTextClass} ${isExpanded ? 'block' : 'hidden lg:block'}`}
            >
              Table & Plate
            </Link>

            {/* Center: Navigation Links (Desktop ONLY) */}
            <div 
                className={`hidden lg:flex items-center gap-16 mx-auto flex-shrink-0 ${navOpacityClass}`}
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

            {/* Right Side: Menu Icon (Mobile) / CTA Button (All) */}
            <div className="flex items-center flex-shrink-0">
                
              {/* Mobile Menu Icon (Visible on small screens) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
              
              {/* CTA Button */}
              <Link
                href="/signup"
                className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg ml-4 lg:ml-0"
              >
                Sign Up
              </Link>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown (Simplified, light box) */}
          {mobileMenuOpen && (
              <div className="lg:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl p-4 space-y-3 z-40">
                  {NAV_ITEMS.map((item) => (
                      <Link
                          key={item.href}
                          href={item.href}
                          className="block py-2 text-gray-800 hover:text-red-600 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                      >
                          {item.label}
                      </Link>
                  ))}
              </div>
          )}
        </nav>
      </div>
    </header>
  );
}
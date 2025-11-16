// src/components/premium/PremiumHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * FINAL HEADER IMPLEMENTATION: VISUAL INTEGRITY FIX
 * ✅ Vertical height (padding) is CONSTANT across all views.
 * ✅ Logo and CTA are locked within the fixed vertical space.
 * ✅ Expanded: max-w-7xl (Wide)
 * ✅ Collapsed: max-w-4xl (Visibly smaller, medium length)
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
    { label: 'Review Your Experience', href: '/review' },
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
      const isDesktop = window.innerWidth >= 1024;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      if (isDesktop) {
        setIsScrolled(window.scrollY > 100);
      } else if (isTablet) {
        setIsScrolled(window.scrollY > 50);
      } else {
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

  // Horizontal Width Control: Responsive to screen size
  // Mobile: Full width with padding, Tablet: max-w-3xl, Laptop: max-w-5xl/7xl, Desktop+: max-w-7xl, Ultrawide: max-w-desktop-lg
  const pillWidthClass = isExpanded
    ? 'max-w-[95%] md:max-w-3xl lg:max-w-7xl desktop:max-w-desktop-lg ultrawide:max-w-ultrawide'
    : 'max-w-[90%] md:max-w-2xl lg:max-w-4xl desktop:max-w-5xl';

  // Outer Container Styling - Responsive top spacing
  const outerContainerClass = `w-full left-1/2 -translate-x-1/2 mx-auto transition-all duration-700 ease-out ${
    isScrolled ? 'top-2 xs:top-3 md:top-4' : 'top-3 xs:top-4 md:top-6'
  }`;

  // Inner Background Styling
  const innerBgClass = isExpanded
    ? 'bg-gray-800/95 shadow-2xl'
    : 'bg-gray-900/90 backdrop-blur-md shadow-xl';

  // Vertical Padding Control - Responsive to screen size
  const headerPaddingClass = 'py-3 xs:py-4 md:py-5 desktop:py-6';

  // Text size/color - Responsive logo size
  const logoTextClass = isExpanded
    ? 'text-lg xs:text-xl md:text-2xl desktop:text-3xl text-white'
    : 'text-base xs:text-lg md:text-xl desktop:text-2xl text-white';

  // Opacity transition for links (smooth fade-out)
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
        <nav className="mx-auto px-3 xs:px-4 md:px-6 desktop:px-8 max-w-full">
          {/* Main Content Row: Now explicitly controlling gap to avoid vertical shift */}
          <div className="flex items-center justify-between gap-2 xs:gap-3 md:gap-6 lg:gap-8">

            {/* GROUP 1: Left - Logo and Name */}
            <Link
              href="/"
              className={`font-light hover:text-red-500 transition-colors duration-300 flex-shrink-0 ${logoTextClass} ${isExpanded ? 'block' : 'hidden lg:block'}`}
            >
              Table & Plate
            </Link>

            {/* Mobile Logo (T&P - Visible only when desktop links are hidden) */}
             {!isExpanded && (
                <Link
                    href="/"
                    className={`lg:hidden font-light text-base xs:text-lg text-white hover:text-red-500 transition-colors duration-300 flex-shrink-0`}
                >
                    T&P
                </Link>
            )}

            {/* GROUP 2: Center - Navigation Links (Desktop ONLY) */}
            <div
                className={`hidden lg:flex items-center justify-center flex-grow gap-4 xl:gap-6 desktop:gap-8 ultrawide:gap-10 ${navOpacityClass}`}
            >
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-xs xl:text-sm desktop:text-base transition-colors whitespace-nowrap ${
                            pathname === item.href
                            ? 'text-white font-medium'
                            : `${navTextColorClass} hover:text-white`
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* GROUP 3: Right - CTA Button and Menu Icon */}
            <div className="flex items-center flex-shrink-0 space-x-2 xs:space-x-3">

              {/* CTA Button */}
              <Link
                href="/signup"
                className="px-3 xs:px-4 md:px-5 desktop:px-6 py-1.5 xs:py-2 md:py-2.5 bg-red-600 text-white text-xs xs:text-sm md:text-base font-medium rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Sign Up
              </Link>

              {/* Mobile Menu Icon (Visible on small screens) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 xs:p-2 text-white hover:bg-gray-700 rounded-full transition-colors touch-target"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown (Simplified, light box) */}
          {mobileMenuOpen && (
              <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-2 xs:mx-3 bg-white rounded-lg shadow-xl p-3 xs:p-4 space-y-2 xs:space-y-3 z-40 safe-left safe-right">
                  {NAV_ITEMS.map((item) => (
                      <Link
                          key={item.href}
                          href={item.href}
                          className="block py-2 xs:py-2.5 text-sm xs:text-base text-gray-800 hover:text-red-600 transition-colors touch-target"
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
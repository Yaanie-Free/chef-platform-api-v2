// src/components/premium/PremiumHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * SELF-CONTAINED PREMIUM HEADER - THREE-STATE LOGIC
 * ✅ Fixed at the top (z-50)
 * ✅ Collapses on scroll, expands on hover (the "design twist")
 * ✅ Performance-focused: uses simple scroll and CSS transitions
 * ✅ Uses the pill-shaped search bar and minimalist layout required
 */

// ============================================
// INLINE ICONS
// ============================================

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ============================================
// CONFIGURATION
// ============================================

// Navigation items visible only in the expanded/hovered desktop state
const NAV_ITEMS = [
    { label: 'Find a Chef', href: '/discover' },
    { label: 'Messages', href: '/messages' },
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
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  // 1. SCROLL HANDLER: Checks scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Set to true if scrolled beyond 100px (fast, simple check)
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // 2. LOGIC: Determines the visual state
  const isExpanded = !isScrolled || isHovered; // Expanded at top, OR expanded by hover when scrolled down

  // Dynamic Class Names
  const headerHeightClass = isExpanded ? 'py-4 md:py-5 shadow-lg' : 'py-2 md:py-3 shadow-md';
  const logoTextClass = isExpanded ? 'text-2xl' : 'text-xl';
  // Use a solid color when expanded, and slightly transparent/blurred when collapsed
  const headerBgClass = isExpanded ? 'bg-white' : 'bg-white/90 backdrop-blur-sm'; 
  
  // Navigation visibility: hides unless expanded
  const navOpacityClass = isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none';
  
  // Search bar width adjustment: wide when expanded, narrow when collapsed (central focus)
  const searchBarWidth = isExpanded ? 'w-full max-w-lg' : 'w-64 max-w-sm'; 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/discover?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${className}`}
      // Apply hover state tracking only if scrolled (to enable the collapse/expand feature)
      onMouseEnter={() => isScrolled && setIsHovered(true)}
      onMouseLeave={() => isScrolled && setIsHovered(false)}
    >
      <div
        className={`border-b border-gray-200 transition-all duration-300 ${headerBgClass} ${headerHeightClass}`}
      >
        <nav className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            
            {/* Left: Logo and Name */}
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

            {/* Center-Right: Search Bar (Desktop - Main element when collapsed) */}
            <div className={`hidden lg:flex justify-center transition-all duration-300 ${isExpanded ? 'flex-shrink-0' : 'flex-grow'}`}>
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </div>
                  <input
                    type="search"
                    placeholder="Search chefs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // Pill shape with dynamic width
                    className={`pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 transition-all ${searchBarWidth}`}
                  />
                </form>
            </div>

            {/* Right: CTA Button + Mobile Menu */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Desktop CTA (Chef Signup) - Always visible in desktop view for minimalism */}
              <Link
                href="/signup?type=chef"
                className="hidden sm:block px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors"
              >
                Chef Signup
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {/* Mobile Search & Menu (Simplified logic from before, but kept for function) */}
          {!mobileMenuOpen && (
             <form onSubmit={handleSearch} className="lg:hidden mt-3 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
                </div>
                <input
                type="search"
                placeholder="Search chefs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:border-red-600 focus:outline-none"
                />
            </form>
          )}

          {/* Mobile Menu (Using simplified NAV_ITEMS for mobile) */}
          {mobileMenuOpen && (
            <div className="py-4 space-y-3 border-t border-gray-200 mt-4 lg:hidden">
              {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {item.label}
                    </Link>
                ))}
              <Link
                href="/signup"
                className="block w-full px-6 py-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
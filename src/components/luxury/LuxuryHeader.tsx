'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Search, MessageCircle, User, Menu, X, Bell } from 'lucide-react';
import { cn, debounce } from '@/lib/utils';
import { logger } from '@/lib/error-handler';
import type { User as UserType } from '@/types';

/**
 * Header Props Interface
 */
interface PremiumHeaderProps {
  /** Current authenticated user */
  user?: UserType | null;
  /** Custom className */
  className?: string;
  /** Callback when search is performed */
  onSearch?: (query: string) => void;
  /** Callback when modal is requested */
  onOpenModal?: (type: 'signin' | 'signup' | 'chef-signup') => void;
}

/**
 * Navigation Link Component
 */
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const NavLink = memo(({ href, children, onClick, icon }: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-xs xl:text-sm desktop:text-base text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
  >
    {icon}
    {children}
  </Link>
));

NavLink.displayName = 'NavLink';

/**
 * Search Bar Component
 */
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = memo(({ onSearch, placeholder = 'Search chefs, cuisines...', className }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        logger.info('Search performed', { query: value });
        onSearch(value);
      }
    }, 500),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/discover?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <Search 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all"
        aria-label="Search for chefs or cuisines"
      />
    </form>
  );
});

SearchBar.displayName = 'SearchBar';

/**
 * Premium Header Component
 * Sticky header that expands on hover, inspired by Stitch.money
 */
const PremiumHeader = ({ 
  user, 
  className,
  onSearch = () => {},
  onOpenModal = () => {}
}: PremiumHeaderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Close mobile menu when route changes
   */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  /**
   * Fetch unread message count (if user is logged in)
   */
  useEffect(() => {
    if (user) {
      fetchUnreadCount();
    }
  }, [user]);

  /**
   * Fetch unread message count from API
   */
  const fetchUnreadCount = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/messages/unread');
      // const data = await response.json();
      // setUnreadMessages(data.count);
      setUnreadMessages(3); // Mock data
    } catch (error) {
      logger.error(error as Error, 'Failed to fetch unread messages');
    }
  };

  /**
   * Handle sign out
   */
  const handleSignOut = async () => {
    try {
      logger.info('User signing out', { userId: user?.id });
      // TODO: Implement actual sign out logic
      // await signOut();
      router.push('/');
    } catch (error) {
      logger.error(error as Error, 'Sign out failed');
    }
  };

  /**
   * Handle modal opening
   */
  const handleOpenModal = (type: 'signin' | 'signup' | 'chef-signup') => {
    logger.info('Modal opened', { type });
    onOpenModal(type);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      role="banner"
    >
      <div className={cn(
        'bg-white border-b border-gray-200 transition-all duration-300',
        isExpanded ? 'py-3 xs:py-4 md:py-5' : 'py-2 xs:py-2.5 md:py-3'
      )}>
        <nav
          className="mx-auto max-w-7xl desktop:max-w-desktop-lg ultrawide:max-w-ultrawide px-3 xs:px-4 md:px-6 desktop:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between gap-3 xs:gap-4 md:gap-6 lg:gap-8">
            {/* Left: Logo + Navigation */}
            <div className="flex items-center gap-12">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded"
                aria-label="Table & Plate home"
              >
                <span className="text-lg xs:text-xl md:text-2xl desktop:text-3xl font-light tracking-tight text-gray-900">
                  Table & Plate
                </span>
              </Link>

              {/* Desktop Navigation - Shows when expanded */}
              <div className={cn(
                'hidden lg:flex items-center gap-4 xl:gap-6 desktop:gap-8 transition-all duration-300',
                isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}>
                <button
                  className="text-xs xl:text-sm desktop:text-base text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
                  onClick={() => router.push('/how-it-works')}
                  aria-label="Learn how it works"
                >
                  How it works
                </button>

                <NavLink href="/discover">
                  Find a chef
                </NavLink>

                {user && (
                  <NavLink 
                    href="/messages" 
                    icon={
                      <div className="relative">
                        <MessageCircle className="w-4 h-4" />
                        {unreadMessages > 0 && (
                          <span 
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-semibold rounded-full flex items-center justify-center"
                            aria-label={`${unreadMessages} unread messages`}
                          >
                            {unreadMessages}
                          </span>
                        )}
                      </div>
                    }
                  >
                    Messages
                  </NavLink>
                )}
              </div>
            </div>

            {/* Right: Search + User Actions */}
            <div className="flex items-center gap-4">
              {/* Search - Desktop only, shows when expanded */}
              {isExpanded && (
                <SearchBar
                  onSearch={onSearch}
                  className="hidden lg:block w-48 xl:w-56 desktop:w-64 ultrawide:w-80"
                />
              )}

              {/* User Profile (when logged in) */}
              {user ? (
                <div className="hidden lg:flex items-center gap-3">
                  <button
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                  </button>

                  <Link 
                    href="/profile"
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Your profile"
                  >
                    {user.profilePhoto ? (
                      <img 
                        src={user.profilePhoto} 
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-medium">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                    )}
                  </Link>
                </div>
              ) : (
                /* Guest CTAs */
                <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/signup?type=chef')}
                    className="text-xs xl:text-sm desktop:text-base text-gray-900 hover:bg-gray-100 transition-colors whitespace-nowrap"
                  >
                    Become a chef
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleOpenModal('signin')}
                    className="text-xs xl:text-sm desktop:text-base text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    Sign in
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleOpenModal('signup')}
                    className="bg-gray-900 hover:bg-gray-800 text-white text-xs xl:text-sm desktop:text-base font-medium px-4 xl:px-5 desktop:px-6 rounded-lg transition-colors uppercase tracking-wide whitespace-nowrap"
                  >
                    GUEST SIGNUP
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-900 p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors touch-target"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 xs:w-6 xs:h-6" /> : <Menu className="w-5 h-5 xs:w-6 xs:h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search (always visible) */}
          <div className="lg:hidden mt-2 xs:mt-3">
            <SearchBar onSearch={onSearch} />
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div
              className="lg:hidden py-3 xs:py-4 space-y-3 xs:space-y-4 border-t border-gray-200 mt-3 xs:mt-4 safe-left safe-right"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <button
                className="block w-full text-left text-sm xs:text-base text-gray-600 hover:text-gray-900 py-2 xs:py-2.5 touch-target"
                onClick={() => router.push('/how-it-works')}
              >
                How it works
              </button>

              <Link href="/discover" className="block w-full text-left text-sm xs:text-base text-gray-600 hover:text-gray-900 py-2 xs:py-2.5 touch-target">
                Find a chef
              </Link>

              {user && (
                <Link href="/messages" className="block w-full text-left text-sm xs:text-base text-gray-600 hover:text-gray-900 py-2 xs:py-2.5 touch-target flex items-center justify-between">
                  Messages
                  {unreadMessages > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-red-600 text-white text-xs rounded-full">
                      {unreadMessages}
                    </span>
                  )}
                </Link>
              )}

              <Link href="/signup?type=chef" className="block w-full text-left text-sm xs:text-base text-gray-600 hover:text-gray-900 py-2 xs:py-2.5 touch-target">
                Become a chef
              </Link>

              {user ? (
                <>
                  <Link href="/profile" className="block w-full text-left text-sm xs:text-base text-gray-600 hover:text-gray-900 py-2 xs:py-2.5 touch-target">
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left text-sm xs:text-base text-gray-600 hover:text-gray-900 py-2 xs:py-2.5 touch-target"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleOpenModal('signin')}
                    className="w-full justify-start text-sm xs:text-base text-gray-900 touch-target"
                  >
                    Sign in
                  </Button>
                  <Button
                    onClick={() => handleOpenModal('signup')}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm xs:text-base uppercase tracking-wide touch-target"
                  >
                    GUEST SIGNUP
                  </Button>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

// Export memoized component for performance
export default memo(PremiumHeader);

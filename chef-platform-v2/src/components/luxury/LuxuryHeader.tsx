'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Menu, X, Sparkles } from 'lucide-react';

export default function LuxuryHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-amber-900/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Sparkles className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform" />
            <div>
              <div className="text-lg font-serif text-white tracking-tight">
                Table & Plate
              </div>
              <div className="text-[10px] text-amber-400 uppercase tracking-widest -mt-1">
                Luxury Made Personal
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link 
              href="/discover" 
              className="text-gray-300 hover:text-amber-400 transition-colors font-light tracking-wide"
            >
              Find a Chef
            </Link>
            <Link 
              href="/messages" 
              className="text-gray-300 hover:text-amber-400 transition-colors font-light tracking-wide"
            >
              Messages
            </Link>
            <Link 
              href="/support" 
              className="text-gray-300 hover:text-amber-400 transition-colors font-light tracking-wide"
            >
              Support
            </Link>
            
            {/* Divider */}
            <div className="h-6 w-px bg-amber-900/30" />
            
            <Link 
              href="/signup?type=chef" 
              className="text-amber-400 hover:text-amber-300 transition-colors font-light tracking-wide"
            >
              Become a Chef
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black rounded-none transition-all"
            >
              Sign In
            </Button>
            <Button 
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-none"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-amber-400 hover:text-amber-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-amber-900/20">
            <Link 
              href="/discover" 
              className="block text-gray-300 hover:text-amber-400 transition-colors font-light"
            >
              Find a Chef
            </Link>
            <Link 
              href="/messages" 
              className="block text-gray-300 hover:text-amber-400 transition-colors font-light"
            >
              Messages
            </Link>
            <Link 
              href="/support" 
              className="block text-gray-300 hover:text-amber-400 transition-colors font-light"
            >
              Support
            </Link>
            <Link 
              href="/signup?type=chef" 
              className="block text-amber-400 hover:text-amber-300 transition-colors font-light"
            >
              Become a Chef
            </Link>
            <div className="flex flex-col space-y-2 pt-4">
              <Button 
                variant="outline" 
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black rounded-none w-full"
              >
                Sign In
              </Button>
              <Button 
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-none w-full"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Sparkles, Users, MapPin, Star } from 'lucide-react';

export default function LuxuryHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50" />
      
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-amber-200 rounded-full animate-pulse delay-200" />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-serif font-light text-white tracking-tight mb-2">
            Table & Plate
          </h1>
          <p className="text-xl md:text-2xl text-amber-400 font-light tracking-widest">
            LUXURY MADE PERSONAL
          </p>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl md:text-5xl font-light text-white mb-6 max-w-4xl mx-auto leading-tight">
          Find Your Perfect
          <span className="block text-amber-400 font-serif italic mt-2">
            Private Chef
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
          Connect with top-rated private chefs in South Africa.
          <br />
          Experience fine dining in the comfort of your own home.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 text-lg rounded-none border-2 border-amber-500 hover:border-amber-600 transition-all duration-300 hover:scale-105"
          >
            Find Your Chef
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-semibold px-8 py-4 text-lg rounded-none transition-all duration-300 hover:scale-105"
          >
            Become a Chef
          </Button>
        </div>

        {/* Stats - Luxury Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="group">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-light text-white mb-1">500+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Chefs</div>
          </div>
          
          <div className="group">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-light text-white mb-1">10K+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Happy Clients</div>
          </div>
          
          <div className="group">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-light text-white mb-1">50+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Cities</div>
          </div>
          
          <div className="group">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-3xl font-light text-white mb-1">4.9★</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-amber-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
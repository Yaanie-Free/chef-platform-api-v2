'use client';

import React from 'react';
import { Star, MapPin, ChefHat, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Chef {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  priceRange: string;
  image: string;
  featured: boolean;
}

// Mock data - replace with API calls later
const featuredChefs: Chef[] = [
  {
    id: '1',
    name: 'Chef Sarah Johnson',
    specialty: 'Modern French Cuisine',
    rating: 4.9,
    reviews: 127,
    location: 'Cape Town',
    priceRange: 'R2,500 - R5,000',
    image: '/api/placeholder/300/300',
    featured: true,
  },
  {
    id: '2',
    name: 'Chef Michael Chen',
    specialty: 'Asian Fusion',
    rating: 4.8,
    reviews: 98,
    location: 'Johannesburg',
    priceRange: 'R2,000 - R4,500',
    image: '/api/placeholder/300/300',
    featured: true,
  },
  {
    id: '3',
    name: 'Chef Amara Nkosi',
    specialty: 'Traditional South African',
    rating: 5.0,
    reviews: 156,
    location: 'Durban',
    priceRange: 'R1,800 - R3,500',
    image: '/api/placeholder/300/300',
    featured: true,
  },
  {
    id: '4',
    name: 'Chef Marco Rossi',
    specialty: 'Italian & Mediterranean',
    rating: 4.7,
    reviews: 89,
    location: 'Pretoria',
    priceRange: 'R2,200 - R4,000',
    image: '/api/placeholder/300/300',
    featured: true,
  },
];

export default function FeaturedChefs() {
  return (
    <section className="py-responsive px-responsive bg-gray-900 text-gray-300">
      <div className="max-w-7xl desktop:max-w-desktop-lg ultrawide:max-w-ultrawide mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 xs:mb-10 md:mb-12 desktop:mb-16">
          <h2 className="text-fluid-3xl md:text-fluid-4xl desktop:text-fluid-5xl font-bold text-white mb-3 xs:mb-4">
            Meet Our Featured Chefs
          </h2>
          <p className="text-fluid-base md:text-fluid-lg desktop:text-fluid-xl text-gray-400 max-w-2xl desktop:max-w-3xl mx-auto px-4">
            Discover talented chefs who will bring restaurant-quality experiences to your home
          </p>
        </div>

        {/* Chef Grid - Responsive: 1 col mobile, 2 col tablet, 3 col laptop, 4 col desktop, 5 col ultrawide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 desktop-lg:grid-cols-5 gap-4 xs:gap-5 md:gap-6 desktop:gap-8 mb-6 xs:mb-8 md:mb-10">
          {featuredChefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-gray-800 rounded-lg xs:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              {/* Chef Image */}
              <div className="relative h-48 xs:h-56 md:h-64 desktop:h-72 bg-gray-900 overflow-hidden flex items-center justify-center">
                <ChefHat className="w-12 h-12 xs:w-14 xs:h-14 md:w-16 md:h-16 text-amber-500 opacity-50" />

                {/* Favorite Button */}
                <button className="absolute top-2 xs:top-3 right-2 xs:right-3 p-1.5 xs:p-2 bg-gray-800/80 rounded-full hover:bg-amber-500/80 transition-colors touch-target" aria-label="Add to favorites">
                  <Heart className="w-4 h-4 xs:w-5 xs:h-5 text-gray-300 hover:text-white transition-colors" />
                </button>

                {/* Featured Badge */}
                {chef.featured && (
                  <div className="absolute top-2 xs:top-3 left-2 xs:left-3 bg-amber-500 text-black px-2 xs:px-3 py-0.5 xs:py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>

              {/* Chef Info */}
              <div className="p-4 xs:p-5 md:p-6">
                <h3 className="text-base xs:text-lg md:text-xl desktop:text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
                  {chef.name}
                </h3>
                <p className="text-xs xs:text-sm md:text-base text-gray-400 mb-2 xs:mb-3 line-clamp-2">{chef.specialty}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-2 xs:mb-3">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 xs:w-4 xs:h-4 text-amber-400 fill-current" />
                    <span className="ml-1 text-xs xs:text-sm font-semibold text-gray-200">
                      {chef.rating}
                    </span>
                  </div>
                  <span className="text-xs xs:text-sm text-gray-500">
                    ({chef.reviews} reviews)
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center text-xs xs:text-sm text-gray-400 mb-2 xs:mb-3">
                  <MapPin className="w-3 h-3 xs:w-4 xs:h-4 mr-1 text-amber-500 flex-shrink-0" />
                  <span className="line-clamp-1">{chef.location}</span>
                </div>

                {/* Price Range */}
                <div className="mb-3 xs:mb-4">
                  <span className="text-xs xs:text-sm font-semibold text-gray-200">
                    {chef.priceRange}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">per event</span>
                </div>

                {/* CTA Button */}
                <Link href={`/chef/${chef.id}`}>
                  <Button
                    className="w-full bg-amber-500 text-black hover:bg-amber-600 transition-colors font-semibold text-xs xs:text-sm md:text-base touch-target"
                    size="sm"
                  >
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-6 xs:mt-8 md:mt-10">
          <Link href="/discover">
            <Button
              variant="outline"
              size="lg"
              className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-colors text-sm xs:text-base md:text-lg px-6 xs:px-8 md:px-10 desktop:px-12 touch-target"
            >
              View All Chefs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

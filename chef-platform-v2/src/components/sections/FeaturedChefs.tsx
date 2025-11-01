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

// Mock data - will be replaced with API calls later
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
    featured: true
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
    featured: true
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
    featured: true
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
    featured: true
  }
];

export default function FeaturedChefs() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Featured Chefs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover talented chefs who will bring restaurant-quality experiences to your home
          </p>
        </div>

        {/* Chef Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredChefs.map((chef) => (
            <div
              key={chef.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              {/* Chef Image */}
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                  <ChefHat className="w-16 h-16 text-primary/40" />
                </div>
                {/* Favorite Button */}
                <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
                {/* Featured Badge */}
                {chef.featured && (
                  <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>

              {/* Chef Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                  {chef.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{chef.specialty}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-semibold text-gray-900">
                      {chef.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({chef.reviews} reviews)
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{chef.location}</span>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {chef.priceRange}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">per event</span>
                </div>

                {/* CTA Button */}
                <Link href={`/chef/${chef.id}`}>
                  <Button className="w-full" size="sm">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/discover">
            <Button variant="outline" size="lg">
              View All Chefs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

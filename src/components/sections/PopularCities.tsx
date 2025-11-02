'use client';

import React from 'react';
import { MapPin, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface City {
  id: string;
  name: string;
  province: string;
  chefCount: number;
  popularCuisines: string[];
  averagePrice: string;
  image: string;
  trending: boolean;
}

const cities: City[] = [
  {
    id: 'cape-town',
    name: 'Cape Town',
    province: 'Western Cape',
    chefCount: 127,
    popularCuisines: ['French', 'Italian', 'Mediterranean'],
    averagePrice: 'R2,800',
    image: '/api/placeholder/600/400',
    trending: true
  },
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    province: 'Gauteng',
    chefCount: 156,
    popularCuisines: ['Asian Fusion', 'Modern SA', 'Italian'],
    averagePrice: 'R2,500',
    image: '/api/placeholder/600/400',
    trending: true
  },
  {
    id: 'durban',
    name: 'Durban',
    province: 'KwaZulu-Natal',
    chefCount: 89,
    popularCuisines: ['Indian', 'Seafood', 'Traditional SA'],
    averagePrice: 'R2,200',
    image: '/api/placeholder/600/400',
    trending: false
  },
  {
    id: 'pretoria',
    name: 'Pretoria',
    province: 'Gauteng',
    chefCount: 76,
    popularCuisines: ['BBQ', 'French', 'South African'],
    averagePrice: 'R2,400',
    image: '/api/placeholder/600/400',
    trending: false
  },
  {
    id: 'port-elizabeth',
    name: 'Port Elizabeth',
    province: 'Eastern Cape',
    chefCount: 45,
    popularCuisines: ['Seafood', 'Italian', 'Mediterranean'],
    averagePrice: 'R2,000',
    image: '/api/placeholder/600/400',
    trending: false
  },
  {
    id: 'stellenbosch',
    name: 'Stellenbosch',
    province: 'Western Cape',
    chefCount: 38,
    popularCuisines: ['French', 'Wine Pairing', 'Modern SA'],
    averagePrice: 'R3,200',
    image: '/api/placeholder/600/400',
    trending: true
  }
];

export default function PopularCities() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Popular Cities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find talented private chefs in major cities across South Africa
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/discover?city=${city.id}`}
              className="group"
            >
              <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* City Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-primary/40" />
                  </div>
                  
                  {/* Trending Badge */}
                  {city.trending && (
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* City Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {city.name}
                    </h3>
                    <p className="text-white/90 text-sm">{city.province}</p>
                  </div>
                </div>

                {/* City Info */}
                <div className="p-6">
                  {/* Chef Count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-primary font-semibold">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{city.chefCount} Chefs Available</span>
                    </div>
                  </div>

                  {/* Popular Cuisines */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Popular Cuisines:</p>
                    <div className="flex flex-wrap gap-2">
                      {city.popularCuisines.map((cuisine) => (
                        <span
                          key={cuisine}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Average Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Avg. Price</span>
                    <span className="font-semibold text-gray-900">{city.averagePrice}</span>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-300 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">531</div>
            <div className="text-sm text-gray-600">Total Chefs</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">9</div>
            <div className="text-sm text-gray-600">Provinces Covered</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">2.5k+</div>
            <div className="text-sm text-gray-600">Events Completed</div>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-bold text-primary mb-2">4.9</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>

        {/* Coverage Map Info */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Can't Find Your City?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're constantly expanding our network of chefs across South Africa. Don't see your city listed? Get in touch and we'll help you find a chef who can travel to your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/discover"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Browse All Chefs
            </Link>
            <Link
              href="/support"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

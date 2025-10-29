"use client";
import React from 'react';
import { Filter } from 'lucide-react';
import { ChefCard } from '@/components/cards/ChefCard';

const MOCK_CHEFS = [
  {
    id: '1',
    name: 'Chen',
    surname: 'Li',
    bio: 'An expert in authentic Cantonese cuisine, blending tradition with modern techniques.',
    location: 'Cape Town, Western Cape',
    specialties: ['Cantonese', 'Dim Sum', 'Seafood'],
    rating: 4.8,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1603415526960-f7e0328d13bf?q=80&w=1080&auto=format&fit=crop',
    priceRange: 'R350-650 pp',
    gallery: [
      'https://images.unsplash.com/photo-1528697203043-733bfdca1dda?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&auto=format&fit=crop',
    ],
  },
  {
    id: '2',
    name: 'Oliver',
    surname: 'Smith',
    bio: 'Focuses on modern British cuisine, seasonal ingredients, and balanced flavors.',
    location: 'Cape Town, Western Cape',
    specialties: ['Modern British', 'Gourmet', 'Supper Club'],
    rating: 4.7,
    reviewCount: 27,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1080&auto=format&fit=crop',
    priceRange: 'R400-800 pp',
  },
  {
    id: '3',
    name: 'Sofia',
    surname: 'Rodriguez',
    bio: 'Bringing vibrant flavors of Latin America with modern presentation and finesse.',
    location: 'Cape Town, Western Cape',
    specialties: ['Latin', 'Vegetarian', 'Seafood'],
    rating: 4.9,
    reviewCount: 47,
    image: 'https://images.unsplash.com/photo-1564836235918-6268d6a7b0db?q=80&w=1080&auto=format&fit=crop',
    priceRange: 'R500-900 pp',
  },
  {
    id: '4',
    name: 'David',
    surname: 'Lee',
    bio: 'Minimalist, ingredient-driven menus with fine-dining techniques and precision.',
    location: 'Cape Town, Western Cape',
    specialties: ['Fine Dining', 'Tasting Menus', 'Seafood'],
    rating: 4.8,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=1080&auto=format&fit=crop',
    priceRange: 'R600-1100 pp',
  },
];

export default function FeaturedChefs() {
  const handleLike = (id: string) => {};
  const handlePass = (id: string) => {};

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">Discover your perfect chef</h2>
          <Filter className="w-5 h-5 text-white/70" />
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none">
            {MOCK_CHEFS.map((chef) => (
              <div key={chef.id} className="snap-start">
                <ChefCard
                  chef={chef}
                  onLike={handleLike}
                  onPass={handlePass}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

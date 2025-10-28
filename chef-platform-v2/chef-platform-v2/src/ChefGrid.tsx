import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, MapPin, Star, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Chef {
  id: string;
  name: string;
  surname: string;
  bio: string;
  location: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  image: string;
  priceRange: string;
  gallery?: string[];
  qualifications?: string[];
}

interface ChefGridProps {
  chefs: Chef[];
  onChefLike: (chefId: string) => void;
  onChefSelect: (chef: Chef) => void;
  isUserSignedUp?: boolean;
}

export function ChefGrid({ chefs, onChefLike, onChefSelect, isUserSignedUp = false }: ChefGridProps) {
  const [likedChefs, setLikedChefs] = useState<string[]>([]);
  const [showLikeMessage, setShowLikeMessage] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Create multiple copies of chefs for endless scroll
  const extendedChefs = [...chefs, ...chefs, ...chefs];
  const originalLength = chefs.length;

  useEffect(() => {
    // Start in the middle section (second copy) for true endless scroll
    if (scrollContainerRef.current && chefs.length > 0) {
      const container = scrollContainerRef.current;
      // Dynamically calculate card width based on first card
      const firstCard = container.querySelector('.chef-card') as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth + 24; // card width + gap
        container.scrollLeft = originalLength * cardWidth;
      }
    }
  }, [chefs.length, originalLength]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Dynamically calculate card width
      const firstCard = container.querySelector('.chef-card') as HTMLElement;
      if (!firstCard) return;
      
      const cardWidth = firstCard.offsetWidth + 24; // card width + gap
      const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time
      
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      
      // Check if we need to jump to the end section
      setTimeout(() => {
        const currentScroll = container.scrollLeft;
        if (currentScroll <= cardWidth) {
          container.scrollLeft = currentScroll + (originalLength * 2 * cardWidth);
        }
      }, 300);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Dynamically calculate card width
      const firstCard = container.querySelector('.chef-card') as HTMLElement;
      if (!firstCard) return;
      
      const cardWidth = firstCard.offsetWidth + 24; // card width + gap
      const scrollAmount = cardWidth * 2; // Scroll 2 cards at a time
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Check if we need to jump to the beginning section
      setTimeout(() => {
        const currentScroll = container.scrollLeft;
        if (currentScroll >= maxScroll - cardWidth) {
          container.scrollLeft = currentScroll - (originalLength * 2 * cardWidth);
        }
      }, 300);
    }
  };

  const handleLike = (chefId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!likedChefs.includes(chefId)) {
      setLikedChefs(prev => [...prev, chefId]);
      onChefLike(chefId);
      
      // Show like message for 3 seconds
      setShowLikeMessage(true);
      setTimeout(() => setShowLikeMessage(false), 3000);
    } else {
      setLikedChefs(prev => prev.filter(id => id !== chefId));
    }
  };

  return (
    <div className="relative w-full">
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl mb-2">
          {isUserSignedUp ? 'Select a chef from our curated selection' : 'Discover your perfect chef'}
        </h2>
      </div>

      {/* Left Scroll Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={scrollLeft}
        className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 rounded-2xl bg-background/90 backdrop-blur-sm border-border/40 hover:bg-background shadow-lg"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Right Scroll Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={scrollRight}
        className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 rounded-2xl bg-background/90 backdrop-blur-sm border-border/40 hover:bg-background shadow-lg"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Chef Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 sm:pb-6 px-10 sm:px-12 lg:px-16"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {extendedChefs.map((chef, index) => (
          <Card
            key={`${chef.id}-${index}`}
            className="chef-card flex-shrink-0 w-72 sm:w-80 lg:w-96 rounded-3xl overflow-hidden shadow-[0_15px_50px_-10px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_70px_-5px_rgba(0,0,0,0.6)] transition-all duration-500 cursor-pointer group hover:-translate-y-1 bg-gradient-to-br from-card/95 to-card backdrop-blur-sm border border-white/5"
            onClick={() => onChefSelect(chef)}
          >
            {/* Chef Image */}
            <div className="relative h-52 sm:h-56 lg:h-64 overflow-hidden">
              <ImageWithFallback
                src={chef.image}
                alt={`Chef ${chef.name} ${chef.surname}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10" />
              
              {/* Like Button */}
              <Button
                variant="ghost"
                size="sm"
                className={`absolute top-4 right-4 rounded-full p-3 backdrop-blur-md transition-all duration-300 border-2 shadow-lg ${
                  likedChefs.includes(chef.id)
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400'
                    : 'bg-black/40 text-white hover:bg-black/60 border-pink-500/50 hover:border-pink-400'
                }`}
                onClick={(e) => handleLike(chef.id, e)}
              >
                <Heart 
                  className={`w-4 h-4 stroke-2 ${
                    likedChefs.includes(chef.id) ? 'fill-current' : ''
                  }`} 
                />
              </Button>
              
              {/* Chef Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl mb-1">{chef.name} {chef.surname}</h3>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-3 h-3" />
                  <span className="text-sm">{chef.location}</span>
                </div>
              </div>
            </div>

            {/* Chef Details */}
            <div className="p-5 space-y-2.5">
              {/* Rating and Reviews - In blank space above bio */}
              {chef.reviewCount >= 5 && (
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-white">{chef.rating.toFixed(1)}</span>
                  </div>
                  <button 
                    className="text-xs text-white/80 hover:text-white transition-colors hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('View reviews for', chef.id);
                    }}
                  >
                    {chef.reviewCount} reviews
                  </button>
                </div>
              )}

              <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                {chef.bio}
              </p>
              
              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5">
                {chef.specialties.slice(0, 2).map((specialty, index) => (
                  <Badge 
                    key={index} 
                    className="rounded-xl text-xs px-2 py-1 bg-white/5 hover:bg-white/10 transition-colors text-white border-transparent"
                  >
                    {specialty}
                  </Badge>
                ))}
                {chef.specialties.length > 2 && (
                  <Badge className="rounded-xl text-xs px-2 py-1 border-white/20 text-white bg-transparent">
                    +{chef.specialties.length - 2}
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="pt-1">
                <span className="text-lg text-white">
                  {chef.priceRange.replace('pp', 'per person').replace(/R(\d+)-(\d+)/, 'R$1 - R$2')}
                </span>
              </div>

              {/* Mini Gallery */}
              {chef.gallery && chef.gallery.length > 0 && (
                <div className="flex gap-1.5 overflow-hidden pt-1">
                  {chef.gallery.slice(0, 4).map((image, idx) => (
                    <div 
                      key={idx}
                      className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-white/10 hover:scale-105 transition-transform duration-300"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`${chef.name}'s dish ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {chef.gallery.length > 4 && (
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg border border-white/20 flex items-center justify-center text-xs text-white/70">
                      +{chef.gallery.length - 4}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Chef Liked Message */}
      {showLikeMessage && (
        <div className="mt-6 flex justify-center">
          <Card className="px-4 py-2 rounded-2xl bg-white/10 border-white/20">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl text-xs p-0 h-auto font-normal hover:bg-transparent text-white"
                onClick={() => {/* Handle view saved chefs */}}
              >
                Chef liked, view all saved chefs
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

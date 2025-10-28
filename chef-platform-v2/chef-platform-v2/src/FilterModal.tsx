import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { MapPin, DollarSign, Star, Utensils, Briefcase, Users } from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

export interface FilterOptions {
  locations: string[];
  priceRange: [number, number];
  minRating: number;
  cuisines: string[];
  eventType: 'all' | 'personal' | 'corporate';
  guestCount: [number, number];
}

const availableLocations = [
  'Cape Town, Western Cape',
  'Johannesburg, Gauteng',
  'Durban, KwaZulu-Natal',
  'Pretoria, Gauteng',
  'Port Elizabeth, Eastern Cape',
  'Stellenbosch, Western Cape',
];

const availableCuisines = [
  'Italian',
  'Mediterranean',
  'Fine Dining',
  'African Fusion',
  'Vegan',
  'Asian',
  'French',
  'Seafood',
  'BBQ',
  'Modern European',
];

export function FilterModal({ isOpen, onClose, onApplyFilters, currentFilters }: FilterModalProps) {
  const [locations, setLocations] = useState<string[]>(currentFilters.locations);
  const [priceRange, setPriceRange] = useState<[number, number]>(currentFilters.priceRange);
  const [minRating, setMinRating] = useState(currentFilters.minRating);
  const [cuisines, setCuisines] = useState<string[]>(currentFilters.cuisines);
  const [eventType, setEventType] = useState<'all' | 'personal' | 'corporate'>(currentFilters.eventType);
  const [guestCount, setGuestCount] = useState<[number, number]>(currentFilters.guestCount);

  const toggleLocation = (location: string) => {
    setLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const toggleCuisine = (cuisine: string) => {
    setCuisines(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      locations,
      priceRange,
      minRating,
      cuisines,
      eventType,
      guestCount,
    });
    onClose();
  };

  const handleReset = () => {
    setLocations([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setCuisines([]);
    setEventType('all');
    setGuestCount([1, 50]);
  };

  const activeFilterCount = 
    locations.length + 
    cuisines.length + 
    (minRating > 0 ? 1 : 0) + 
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) +
    (eventType !== 'all' ? 1 : 0) +
    (guestCount[0] > 1 || guestCount[1] < 50 ? 1 : 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-black border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-white">
            <span>Filter Chefs</span>
            {activeFilterCount > 0 && (
              <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                {activeFilterCount} active
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Location Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-pink-400" />
              <h3 className="font-medium text-white">Filter by Location</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableLocations.map((location) => (
                <Badge
                  key={location}
                  onClick={() => toggleLocation(location)}
                  className={`cursor-pointer rounded-xl px-3 py-2 transition-all ${
                    locations.includes(location)
                      ? 'bg-pink-500/20 text-pink-400 border-pink-500/50'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {location}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-pink-400" />
              <h3 className="font-medium text-white">Filter by Price (per person)</h3>
            </div>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                min={0}
                max={1000}
                step={50}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>R{priceRange[0]}</span>
                <span>R{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Star Rating Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-pink-400" />
              <h3 className="font-medium text-white">Filter by Star Rating</h3>
            </div>
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <Badge
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`cursor-pointer rounded-xl px-3 py-2 transition-all ${
                    minRating === rating
                      ? 'bg-pink-500/20 text-pink-400 border-pink-500/50'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}+ ⭐`}
                </Badge>
              ))}
            </div>
          </div>

          {/* Cuisine Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Utensils className="w-4 h-4 text-pink-400" />
              <h3 className="font-medium text-white">Filter by Cuisine</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableCuisines.map((cuisine) => (
                <Badge
                  key={cuisine}
                  onClick={() => toggleCuisine(cuisine)}
                  className={`cursor-pointer rounded-xl px-3 py-2 transition-all ${
                    cuisines.includes(cuisine)
                      ? 'bg-pink-500/20 text-pink-400 border-pink-500/50'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>

          {/* Event Type Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-pink-400" />
              <h3 className="font-medium text-white">Event Type</h3>
            </div>
            <div className="flex gap-2">
              {[
                { value: 'all' as const, label: 'All Events' },
                { value: 'personal' as const, label: 'Personal' },
                { value: 'corporate' as const, label: 'Corporate' }
              ].map((type) => (
                <Badge
                  key={type.value}
                  onClick={() => setEventType(type.value)}
                  className={`cursor-pointer rounded-xl px-3 py-2 transition-all ${
                    eventType === type.value
                      ? 'bg-pink-500/20 text-pink-400 border-pink-500/50'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Number of Guests Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-pink-400" />
              <h3 className="font-medium text-white">Number of Guests</h3>
            </div>
            <div className="space-y-4">
              <Slider
                value={guestCount}
                onValueChange={(value) => setGuestCount(value as [number, number])}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>{guestCount[0]} {guestCount[0] === 1 ? 'guest' : 'guests'}</span>
                <span>{guestCount[1] === 50 ? '50+ guests' : `${guestCount[1]} guests`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 rounded-2xl border-white/20 bg-black/50 text-white hover:bg-white/5"
          >
            Reset All
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/20 transition-all duration-300"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

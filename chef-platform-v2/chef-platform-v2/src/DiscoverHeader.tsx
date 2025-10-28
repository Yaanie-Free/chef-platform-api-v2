import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FilterModal, FilterOptions } from './FilterModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SlidersHorizontal } from 'lucide-react';

interface DiscoverHeaderProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sortBy: string) => void;
}

export function DiscoverHeader({ onFilterChange, onSortChange }: DiscoverHeaderProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    locations: [],
    priceRange: [0, 1000],
    minRating: 0,
    cuisines: [],
    eventType: 'all',
    guestCount: [1, 50],
  });

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const activeFilterCount = 
    filters.locations.length + 
    filters.cuisines.length + 
    (filters.minRating > 0 ? 1 : 0) + 
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0) +
    (filters.eventType !== 'all' ? 1 : 0) +
    (filters.guestCount[0] > 1 || filters.guestCount[1] < 50 ? 1 : 0);

  return (
    <>
      <div className="mb-8 sm:mb-12">
        {/* Top Row - Title and Filter Button */}
        <div className="flex items-center gap-4 mb-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white">
            Discover your perfect chef
          </h2>
          
          {/* Filters Button */}
          <Button
            onClick={() => setIsFilterModalOpen(true)}
            variant="outline"
            className="rounded-2xl border-white/20 bg-black/50 text-white hover:bg-white/5"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-pink-500/20 text-pink-400 border-pink-500/30">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Bottom Row - Subtitle and Sort */}
        <div className="flex items-center justify-between gap-6">
          <p className="text-base sm:text-lg text-white/70">
            From our chefs hands to your table
          </p>

          {/* Sort Dropdown */}
          <Select onValueChange={onSortChange} defaultValue="rating">
            <SelectTrigger className="w-[200px] rounded-2xl border-white/20 bg-black/50 text-white hover:bg-black/70">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl bg-black/95 backdrop-blur-xl border-white/10 text-white">
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </>
  );
}

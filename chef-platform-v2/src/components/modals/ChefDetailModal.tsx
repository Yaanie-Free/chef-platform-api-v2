"use client";
import { useState, useMemo } from 'react';
import { X, MapPin, Star, Heart, MessageCircle, Calendar, Images, Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

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
}

interface ChefDetailModalProps {
  chef: Chef | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (chef: Chef) => void;
  onSendMessage: (chef: Chef) => void;
}

export function ChefDetailModal({ chef, isOpen, onClose, onBookNow, onSendMessage }: ChefDetailModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewSortOrder, setReviewSortOrder] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  if (!chef) return null;

  const handleLike = () => setIsLiked(!isLiked);

  const mockReviews = [
    { id: 1, author: 'Sarah M.', rating: 5, comment: "Absolutely incredible experience! Marco's authentic Italian cuisine was perfection.", date: '2 weeks ago', dateValue: new Date('2024-01-01') },
    { id: 2, author: 'David L.', rating: 5, comment: 'Professional, creative, and delicious. Highly recommend for special occasions.', date: '1 month ago', dateValue: new Date('2023-12-15') },
    { id: 3, author: 'Emily R.', rating: 4, comment: 'Great food and presentation, though the service took a bit longer than expected.', date: '3 weeks ago', dateValue: new Date('2023-12-25') },
    { id: 4, author: 'Michael K.', rating: 3, comment: 'Decent experience overall, but the pricing felt quite steep for what was delivered.', date: '1 week ago', dateValue: new Date('2024-01-08') },
    { id: 5, author: 'Jessica T.', rating: 4, comment: 'Loved the creativity in the dishes! The plating was absolutely stunning.', date: '5 days ago', dateValue: new Date('2024-01-10') },
    { id: 6, author: 'Robert W.', rating: 2, comment: "Unfortunately, the food didn't meet our expectations. Several dishes were oversalted.", date: '2 months ago', dateValue: new Date('2023-11-15') },
  ];

  const sortedReviews = useMemo(() => {
    const reviews = [...mockReviews];
    switch (reviewSortOrder) {
      case 'highest':
        return reviews.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return reviews.sort((a, b) => a.rating - b.rating);
      case 'oldest':
        return reviews.sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());
      case 'newest':
      default:
        return reviews.sort((a, b) => b.dateValue.getTime() - a.dateValue.getTime());
    }
  }, [reviewSortOrder]);

  const mockGallery = [
    'https://images.unsplash.com/photo-1718939043990-83078968ae7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1622001635931-3874528bd099?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1719329466199-f18fb7f6972e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-0">
        <div className="relative">
          {/* Hero Section */}
          <div className="relative h-80 overflow-hidden rounded-t-3xl">
            <ImageWithFallback src={chef.image} alt={`Chef ${chef.name} ${chef.surname}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="absolute top-4 right-4 rounded-full p-3 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:border-white/40">
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
            <Button
              variant="ghost"
              size="sm"
              className={`absolute top-4 right-20 rounded-full p-3 backdrop-blur-sm transition-all border ${isLiked ? 'bg-red-500 text-white border-red-500' : 'bg-white/20 text-white hover:bg-white/30 border-white/20 hover:border-white/40'}`}
              onClick={handleLike}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            {chef.reviewCount >= 5 && (
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-2xl px-3 py-1 flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white text-sm">{chef.rating.toFixed(1)}</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl mb-2 font-semibold">{chef.name} {chef.surname}</h1>
              <div className="flex items-center gap-1 text-white/90">
                <MapPin className="w-4 h-4" />
                <span>{chef.location}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 rounded-2xl bg-white text-black hover:bg-white/90" onClick={() => onBookNow(chef)}>
                <Calendar className="w-4 h-4 mr-2" />
                Book now
              </Button>
              <Button variant="outline" className="flex-1 rounded-2xl" onClick={() => onSendMessage(chef)}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>

            {/* Price Range */}
            <Card className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/5 to-rose-500/5 border-pink-200/20">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                <p className="text-2xl text-primary">{chef.priceRange}</p>
                <p className="text-xs text-muted-foreground">Final quote provided after consultation</p>
              </div>
            </Card>

            {/* Bio */}
            <div>
              <h3 className="text-lg mb-3">About {chef.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{chef.bio}</p>
            </div>

            {/* Specialties */}
            <div>
              <h3 className="text-lg mb-3">Specialities</h3>
              <div className="flex flex-wrap gap-2">
                {chef.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="rounded-xl px-3 py-1">{specialty}</Badge>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg">Gallery</h3>
                <Button variant="outline" size="sm" className="rounded-2xl bg-white text-black hover:bg-white/90" onClick={() => setShowFullGallery(true)}>
                  <Images className="w-4 h-4 mr-2" />
                  View all ({mockGallery.length})
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {mockGallery.slice(0, 6).map((image, index) => (
                  <div key={index} className="aspect-square rounded-2xl overflow-hidden cursor-pointer" onClick={() => setShowFullGallery(true)}>
                    <ImageWithFallback src={image} alt={`${chef.name}'s work ${index + 1}`} fill className="object-cover hover:scale-110 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            {chef.reviewCount >= 5 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg">Recent reviews</h3>
                  <Button variant="outline" size="sm" className="rounded-2xl bg-white text-black hover:bg-white/90" onClick={() => setShowAllReviews(true)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View all reviews
                  </Button>
                </div>

                {showAllReviews && (
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select value={reviewSortOrder} onValueChange={(value: any) => setReviewSortOrder(value)}>
                      <SelectTrigger className="w-48 rounded-2xl bg-white text-black">
                        <SelectValue placeholder="Sort reviews" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="newest" className="rounded-xl">Newest First</SelectItem>
                        <SelectItem value="oldest" className="rounded-xl">Oldest First</SelectItem>
                        <SelectItem value="highest" className="rounded-xl">Highest Rated</SelectItem>
                        <SelectItem value="lowest" className="rounded-xl">Lowest Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-4">
                  {sortedReviews.slice(0, showAllReviews ? sortedReviews.length : 2).map((review) => (
                    <Card key={review.id} className="p-4 rounded-2xl">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-white">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            {[...Array(5 - review.rating)].map((_, i) => (
                              <Star key={i + review.rating} className="w-3 h-3 text-gray-300" />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-white/70">{review.date}</span>
                      </div>
                      <p className="text-sm text-white">{review.comment}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

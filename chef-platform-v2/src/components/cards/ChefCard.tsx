"use client";
import { useState, useEffect } from 'react';
import { Star, MapPin, Heart, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';

interface ChefCardProps {
  chef: {
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
  };
  onLike: (chefId: string) => void;
  onPass: (chefId: string) => void;
  onContact?: (chefId: string) => void;
  onViewReviews?: (chefId: string) => void;
  onOpenDetail?: (chefId: string) => void;
}

export function ChefCard({ chef, onLike, onPass, onContact, onViewReviews, onOpenDetail }: ChefCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  const [thumbApi, setThumbApi] = useState<CarouselApi | null>(null);

  const handleAction = (action: 'like' | 'pass') => {
    setIsAnimating(true);
    setAnimationDirection(action === 'like' ? 'right' : 'left');
    setTimeout(() => {
      if (action === 'like') onLike(chef.id); else onPass(chef.id);
    }, 300);
  };

  useEffect(() => {
    if (!thumbApi || !chef.gallery || chef.gallery.length === 0) return;
    const id = setInterval(() => {
      if (!thumbApi) return;
      if (thumbApi.canScrollNext()) thumbApi.scrollNext();
      else thumbApi.scrollTo(0);
    }, 2200);
    return () => clearInterval(id);
  }, [thumbApi, chef.gallery, chef.id]);

  return (
    <div
      className={`relative w-full max-w-sm mx-auto bg-[#0a0a0a] rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-sm border border-white/10 transition-all duration-500 ${
        isAnimating
          ? animationDirection === 'right'
            ? 'transform rotate-12 translate-x-full opacity-0'
            : 'transform -rotate-12 -translate-x-full opacity-0'
          : 'transform rotate-0 translate-x-0 opacity-100 hover:shadow-[0_25px_70px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1'
      }`}
    >
      {/* Chef Image */}
      <div className="relative h-80 sm:h-96 overflow-hidden">
        <ImageWithFallback
          src={chef.image}
          alt={`Chef ${chef.name} ${chef.surname}`}
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-rose-500/10" />
        {/* Top-right highlight like button */}
        <button
          type="button"
          onClick={() => handleAction('like')}
          className="absolute top-4 right-4 h-10 px-4 rounded-2xl bg-black/50 backdrop-blur-sm border border-pink-400/40 text-pink-400 hover:bg-black/60 shadow-[0_0_18px_rgba(236,72,153,0.45)] transition"
          disabled={isAnimating}
          aria-label="Like chef"
        >
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <span className="hidden sm:inline">Like</span>
          </div>
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="cursor-pointer select-none" onClick={() => onOpenDetail?.(chef.id)}>
                <h3 className="text-3xl mb-2">{chef.name} {chef.surname}</h3>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span>{chef.location}</span>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white">{chef.rating.toFixed(1)}</span>
                  <span className="text-white/70">({chef.reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {chef.specialties.slice(0, 3).map((s, i) => (
                    <span key={i} className="rounded-md px-2 py-0.5 bg-white/5 text-white/90">{s}</span>
                  ))}
                </div>
                {onContact && (
                  <Button size="sm" variant="outline" className="rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" /> Contact
                  </Button>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      {/* Chef Details */}
      <div className="p-6 space-y-3">
        {chef.reviewCount >= 5 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white">{chef.rating.toFixed(1)}</span>
            </div>
            {onViewReviews && (
              <button onClick={() => onViewReviews(chef.id)} className="text-sm text-white/80 hover:text-white transition-colors hover:underline">
                {chef.reviewCount} reviews
              </button>
            )}
          </div>
        )}

        <p className="text-white/70 leading-relaxed line-clamp-2">{chef.bio}</p>

        <div className="py-2">
          {onContact ? (
            <Button
              variant="outline"
              onClick={() => onContact(chef.id)}
              className="w-full rounded-2xl border-2 border-pink-500/30 bg-gradient-to-r from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 hover:border-pink-500/50 transition-all duration-300 hover:scale-[1.02] text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Chef
            </Button>
          ) : chef.qualifications && chef.qualifications.length > 0 ? (
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/90">Qualifications:</span>
              </div>
              <p className="line-clamp-2">{chef.qualifications.join(' • ')}</p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {chef.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} className="rounded-xl px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors duration-200 text-white border-transparent">
              {specialty}
            </Badge>
          ))}
          {chef.specialties.length > 3 && (
            <Badge className="rounded-xl px-3 py-1 border-white/20 text-white bg-transparent">
              +{chef.specialties.length - 3} more
            </Badge>
          )}
        </div>

        <div className="pt-2">
          <span className="text-xl text-white">
            {chef.priceRange.replace('pp', 'per person').replace(/R(\d+)-(\d+)/, 'R$1 - R$2')}
          </span>
        </div>

        {chef.gallery && chef.gallery.length > 0 && (
          <div className="pt-2">
            <Carousel
              setApi={setThumbApi}
              opts={{ loop: true, align: 'start', dragFree: false, containScroll: 'trimSnaps' }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {chef.gallery.map((image, index) => (
                  <CarouselItem key={index} className="pl-2 basis-auto">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10 shadow-md hover:scale-[1.02] transition-transform duration-300">
                      <ImageWithFallback
                        src={image}
                        alt={`${chef.name}'s dish ${index + 1}`}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>

      <div className="flex gap-4 p-6 pt-0">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 rounded-2xl border-2 border-destructive/50 bg-transparent hover:bg-destructive/10 hover:border-destructive transition-all duration-300 shadow-lg"
          onClick={() => handleAction('pass')}
          disabled={isAnimating}
        >
          <X className="w-5 h-5 text-destructive" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 rounded-2xl border-2 border-white/15 bg-transparent hover:bg-white/5 transition-all duration-300 shadow-lg"
          onClick={() => handleAction('like')}
          disabled={isAnimating}
        >
          <Heart className="w-5 h-5 text-white/80" />
        </Button>
      </div>
    </div>
  );
}

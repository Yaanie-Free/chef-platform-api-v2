'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  chefName: string;
  service: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Thompson',
    location: 'Cape Town',
    rating: 5,
    date: 'October 2024',
    comment: 'Chef Sarah Johnson made our anniversary dinner absolutely unforgettable. The food was restaurant-quality, and having it in our own home made it so intimate and special. Highly recommend!',
    chefName: 'Chef Sarah Johnson',
    service: 'Private Dinner for 2'
  },
  {
    id: '2',
    name: 'David Ngubane',
    location: 'Johannesburg',
    rating: 5,
    date: 'September 2024',
    comment: 'We hired Chef Michael for a corporate event and he exceeded all expectations. The Asian fusion menu was incredible and our clients were blown away. Professional, punctual, and talented!',
    chefName: 'Chef Michael Chen',
    service: 'Corporate Event'
  },
  {
    id: '3',
    name: 'Lisa van der Merwe',
    location: 'Durban',
    rating: 5,
    date: 'October 2024',
    comment: 'Chef Amara brought authentic South African flavors to our family gathering. The braai was perfect, and she even taught us some traditional cooking techniques. Amazing experience!',
    chefName: 'Chef Amara Nkosi',
    service: 'Family Braai'
  },
  {
    id: '4',
    name: 'James Rodriguez',
    location: 'Pretoria',
    rating: 5,
    date: 'September 2024',
    comment: 'Booked Chef Marco for my wife\'s birthday and it was the best decision. The Italian menu was authentic and delicious. He handled everything from prep to cleanup. Worth every rand!',
    chefName: 'Chef Marco Rossi',
    service: 'Birthday Celebration'
  },
  {
    id: '5',
    name: 'Thandiwe Moyo',
    location: 'Cape Town',
    rating: 5,
    date: 'August 2024',
    comment: 'I have specific dietary requirements and Chef Sarah accommodated everything perfectly. The vegan menu was creative and absolutely delicious. Finally, fine dining that works for me!',
    chefName: 'Chef Sarah Johnson',
    service: 'Vegan Dinner'
  },
  {
    id: '6',
    name: 'Michael O\'Brien',
    location: 'Johannesburg',
    rating: 5,
    date: 'August 2024',
    comment: 'Used ChefConnect for a romantic dinner proposal. Chef Michael created the perfect ambiance with an incredible 5-course meal. She said yes! Thank you for making it so special.',
    chefName: 'Chef Michael Chen',
    service: 'Proposal Dinner'
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + testimonialsPerPage >= testimonials.length ? 0 : prev + testimonialsPerPage
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - testimonialsPerPage < 0 
        ? Math.max(0, testimonials.length - testimonialsPerPage)
        : prev - testimonialsPerPage
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + testimonialsPerPage
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from customers who've experienced exceptional private chef services
          </p>
        </div>

        {/* Overall Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">4.9</div>
            <div className="flex items-center justify-center mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-gray-600">Would Book Again</div>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-xl p-6 relative hover:shadow-lg transition-shadow duration-300"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/10">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* Service Info */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm text-primary font-semibold">
                    {testimonial.chefName}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.service}</p>
                </div>

                {/* Customer Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  <div className="text-xs text-gray-500">{testimonial.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > testimonialsPerPage && (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full bg-white border border-gray-300 hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {Array.from({ 
                  length: Math.ceil(testimonials.length / testimonialsPerPage) 
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index * testimonialsPerPage)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      Math.floor(currentIndex / testimonialsPerPage) === index
                        ? 'w-8 bg-primary'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="p-3 rounded-full bg-white border border-gray-300 hover:border-primary hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentIndex + testimonialsPerPage >= testimonials.length}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Trusted by over 2,500 customers across South Africa
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center opacity-60">
            <span className="text-sm text-gray-500">Featured in:</span>
            <span className="text-sm font-semibold text-gray-700">TimesLive</span>
            <span className="text-sm font-semibold text-gray-700">BusinessTech</span>
            <span className="text-sm font-semibold text-gray-700">IOL Lifestyle</span>
            <span className="text-sm font-semibold text-gray-700">Cape Town Magazine</span>
          </div>
        </div>
      </div>
    </section>
  );
}

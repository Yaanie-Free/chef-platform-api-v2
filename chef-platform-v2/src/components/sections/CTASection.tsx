'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ChefHat, Calendar, Shield } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Experience World-Class Dining at Home?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Book a private chef today and transform your next event into an unforgettable culinary experience.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                  <ChefHat className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Professional Chefs</h4>
                  <p className="text-white/80 text-sm">
                    Verified, experienced chefs with excellent reviews
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Flexible Booking</h4>
                  <p className="text-white/80 text-sm">
                    Book instantly or request custom menus for your event
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Secure & Protected</h4>
                  <p className="text-white/80 text-sm">
                    Safe payments and satisfaction guaranteed
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/discover">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 font-semibold group w-full sm:w-auto"
                >
                  Find Your Chef
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Stat Card 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">2,500+</div>
              <div className="text-white/90 text-sm">Happy Customers</div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">531</div>
              <div className="text-white/90 text-sm">Professional Chefs</div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-white/90 text-sm">Average Rating</div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-white/90 text-sm">Satisfaction Rate</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="text-white/90 text-sm font-medium">Trusted by:</div>
              <div className="flex flex-wrap justify-center gap-6">
                {['Corporate Clients', 'Event Planners', 'Private Families', 'Restaurants'].map((badge) => (
                  <div
                    key={badge}
                    className="px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium backdrop-blur-sm"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

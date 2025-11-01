'use client';

import React from 'react';
import { Shield, Award, Clock, HeadphonesIcon, BadgeCheck, Lock } from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: 'Verified Chefs',
    description: 'Background checked & certified'
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'PCI-compliant transactions'
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'Satisfaction or money back'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Always here to help'
  },
  {
    icon: BadgeCheck,
    title: 'Insured Services',
    description: 'Fully covered events'
  },
  {
    icon: HeadphonesIcon,
    title: 'Customer First',
    description: '98% satisfaction rate'
  }
];

export default function TrustBadges() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black border-y border-amber-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Optional Title - can be removed for cleaner look */}
        <div className="text-center mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Why Choose ChefConnect
          </h3>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Text */}
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  {badge.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-blue-600" />
              <span>PCI Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>ISO Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-600" />
              <span>POPIA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

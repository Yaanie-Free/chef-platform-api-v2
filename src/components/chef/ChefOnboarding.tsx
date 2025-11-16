'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  ChefHat,
  MapPin,
  DollarSign,
  Award,
  Briefcase,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ChefOnboardingData {
  // Step 1: Basic Info
  fullName: string;
  email: string;
  phone: string;
  city: string;
  profilePhoto?: File | null;

  // Step 2: Professional Details
  specialty: string[];
  cuisines: string[];
  experienceYears: number;
  certifications: string[];

  // Step 3: Business Details
  priceRange: string;
  bio: string;
  availability: string[];

  // Step 4: Portfolio
  portfolioImages: File[];
}

const SPECIALTIES = [
  'Fine Dining',
  'Casual Dining',
  'Catering',
  'Personal Chef',
  'Cooking Classes',
  'Meal Prep'
];

const CUISINES = [
  'French',
  'Italian',
  'Asian Fusion',
  'South African',
  'Mediterranean',
  'Indian',
  'Japanese',
  'Mexican',
  'Thai',
  'American'
];

const CITIES = [
  'Cape Town',
  'Johannesburg',
  'Durban',
  'Pretoria',
  'Port Elizabeth',
  'Bloemfontein'
];

export default function ChefOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ChefOnboardingData>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    profilePhoto: null,
    specialty: [],
    cuisines: [],
    experienceYears: 0,
    certifications: [],
    priceRange: '',
    bio: '',
    availability: [],
    portfolioImages: [],
  });

  const totalSteps = 4;

  const handleInputChange = (field: keyof ChefOnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof ChefOnboardingData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would submit to your API
      const response = await fetch('/api/chefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specialty: formData.specialty,
          bio: formData.bio,
          experience_years: formData.experienceYears,
          cuisines: formData.cuisines,
          certifications: formData.certifications,
          price_range: formData.priceRange,
          location: formData.city,
        }),
      });

      if (response.ok) {
        window.location.href = '/chef-dashboard';
      }
    } catch (error) {
      console.error('Failed to submit chef profile:', error);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4 xs:space-y-5">
      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">Full Name *</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">Email *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">Phone Number *</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="+27 12 345 6789"
        />
      </div>

      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">City *</label>
        <select
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Select a city</option>
          {CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">Profile Photo</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 xs:w-24 xs:h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <ChefHat className="w-10 h-10 xs:w-12 xs:h-12 text-gray-400" />
          </div>
          <Button variant="outline" size="sm" className="touch-target">
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4 xs:space-y-5">
      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-3">Specialty * (Select all that apply)</label>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3">
          {SPECIALTIES.map(specialty => (
            <button
              key={specialty}
              type="button"
              onClick={() => handleArrayToggle('specialty', specialty)}
              className={cn(
                "px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base rounded-lg border-2 transition-colors touch-target text-left flex items-center justify-between",
                formData.specialty.includes(specialty)
                  ? "border-amber-500 bg-amber-50 text-amber-900"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              {specialty}
              {formData.specialty.includes(specialty) && (
                <Check className="w-4 h-4 text-amber-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-3">Cuisines * (Select all that apply)</label>
        <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 xs:gap-3">
          {CUISINES.map(cuisine => (
            <button
              key={cuisine}
              type="button"
              onClick={() => handleArrayToggle('cuisines', cuisine)}
              className={cn(
                "px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base rounded-lg border-2 transition-colors touch-target text-left flex items-center justify-between",
                formData.cuisines.includes(cuisine)
                  ? "border-amber-500 bg-amber-50 text-amber-900"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <span className="line-clamp-1">{cuisine}</span>
              {formData.cuisines.includes(cuisine) && (
                <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">Years of Experience *</label>
        <input
          type="number"
          value={formData.experienceYears || ''}
          onChange={(e) => handleInputChange('experienceYears', parseInt(e.target.value) || 0)}
          className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="5"
          min="0"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4 xs:space-y-5">
      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">Price Range *</label>
        <select
          value={formData.priceRange}
          onChange={(e) => handleInputChange('priceRange', e.target.value)}
          className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="">Select price range</option>
          <option value="R1,000 - R2,500">R1,000 - R2,500</option>
          <option value="R2,500 - R5,000">R2,500 - R5,000</option>
          <option value="R5,000 - R10,000">R5,000 - R10,000</option>
          <option value="R10,000+">R10,000+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">Bio * (Tell us about yourself)</label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          rows={5}
          className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
          placeholder="Share your culinary journey, specialties, and what makes you unique..."
        />
        <p className="text-xs xs:text-sm text-gray-500 mt-1">{formData.bio.length} / 500 characters</p>
      </div>

      <div>
        <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">Certifications (Optional)</label>
        <input
          type="text"
          className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="e.g., Culinary Arts Diploma, Food Safety Certificate"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4 xs:space-y-5">
      <div className="text-center">
        <div className="w-20 h-20 xs:w-24 xs:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 xs:w-12 xs:h-12 text-green-600" />
        </div>
        <h3 className="text-xl xs:text-2xl font-bold text-gray-900 mb-2">You're Almost Done!</h3>
        <p className="text-sm xs:text-base text-gray-600 mb-6">Review your information and submit your application.</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 xs:p-5 md:p-6 space-y-3 xs:space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg">
            <ChefHat className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs xs:text-sm text-gray-500">Name</p>
            <p className="text-sm xs:text-base font-medium text-gray-900">{formData.fullName || 'Not provided'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg">
            <MapPin className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs xs:text-sm text-gray-500">Location</p>
            <p className="text-sm xs:text-base font-medium text-gray-900">{formData.city || 'Not provided'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg">
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs xs:text-sm text-gray-500">Specialty</p>
            <p className="text-sm xs:text-base font-medium text-gray-900">{formData.specialty.join(', ') || 'Not provided'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg">
            <Briefcase className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs xs:text-sm text-gray-500">Experience</p>
            <p className="text-sm xs:text-base font-medium text-gray-900">{formData.experienceYears} years</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-white rounded-lg">
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs xs:text-sm text-gray-500">Price Range</p>
            <p className="text-sm xs:text-base font-medium text-gray-900">{formData.priceRange || 'Not provided'}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 xs:p-5">
        <p className="text-xs xs:text-sm text-amber-900">
          <strong>Note:</strong> Your profile will be reviewed by our team within 2-3 business days. You'll receive an email once approved.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-responsive px-responsive">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 xs:mb-8 md:mb-10">
          <div className="w-16 h-16 xs:w-20 xs:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-8 h-8 xs:w-10 xs:h-10 text-amber-600" />
          </div>
          <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Become a Chef</h1>
          <p className="text-sm xs:text-base text-gray-600">Join our platform and connect with clients</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 xs:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs xs:text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-xs xs:text-sm font-medium text-amber-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-6 md:p-8 mb-6">
          <h2 className="text-lg xs:text-xl md:text-2xl font-bold text-gray-900 mb-4 xs:mb-6">
            {currentStep === 1 && 'Basic Information'}
            {currentStep === 2 && 'Professional Details'}
            {currentStep === 3 && 'Business Details'}
            {currentStep === 4 && 'Review & Submit'}
          </h2>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex-1 touch-target"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          )}

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-black touch-target"
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white touch-target"
            >
              Submit Application
              <Check className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

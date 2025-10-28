'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, User, Camera, Check } from 'lucide-react';
import Image from 'next/image';

interface CustomerData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  profilePhoto?: File | null;
  
  // Step 2
  dietaryRequirements: string[];
  cuisinePreferences: string[];
  allergies: string[];
  specialRequests: string;
}

const DIETARY_OPTIONS = [
  'Halal',
  'Kosher',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Nut-Free',
  'Low-Carb',
  'Keto',
  'Paleo',
  'Mediterranean',
  'No Restrictions'
];

const CUISINE_OPTIONS = [
  'South African',
  'Italian',
  'French',
  'Asian',
  'Indian',
  'Mediterranean',
  'Mexican',
  'Japanese',
  'Thai',
  'Chinese',
  'Middle Eastern',
  'American',
  'Other'
];

const ALLERGY_OPTIONS = [
  'Nuts',
  'Shellfish',
  'Dairy',
  'Eggs',
  'Soy',
  'Wheat',
  'Sesame',
  'None'
];

export default function CustomerSignupFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    city: '',
    profilePhoto: null,
    dietaryRequirements: [],
    cuisinePreferences: [],
    allergies: [],
    specialRequests: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerData>>({});

  const validateStep1 = () => {
    const newErrors: Partial<CustomerData> = {};
    
    if (!customerData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customerData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!customerData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!customerData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+27[0-9]{9}$/.test(customerData.mobile)) {
      newErrors.mobile = 'Please enter a valid SA mobile number (+27XXXXXXXXX)';
    }
    if (!customerData.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profilePhoto: 'Image must be less than 5MB' });
        return;
      }
      setCustomerData({ ...customerData, profilePhoto: file });
      setErrors({ ...errors, profilePhoto: undefined });
    }
  };

  const handleDietaryToggle = (option: string) => {
    setCustomerData({
      ...customerData,
      dietaryRequirements: customerData.dietaryRequirements.includes(option)
        ? customerData.dietaryRequirements.filter(item => item !== option)
        : [...customerData.dietaryRequirements, option]
    });
  };

  const handleCuisineToggle = (option: string) => {
    setCustomerData({
      ...customerData,
      cuisinePreferences: customerData.cuisinePreferences.includes(option)
        ? customerData.cuisinePreferences.filter(item => item !== option)
        : [...customerData.cuisinePreferences, option]
    });
  };

  const handleAllergyToggle = (option: string) => {
    setCustomerData({
      ...customerData,
      allergies: customerData.allergies.includes(option)
        ? customerData.allergies.filter(item => item !== option)
        : [...customerData.allergies, option]
    });
  };

  const handleNext = () => {
    if (currentStep === 0 && validateStep1()) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = () => {
    console.log('Customer data:', customerData);
    // Here you would typically send the data to your API
    alert('Account created successfully!');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600">Tell us a bit about yourself</p>
      </div>

      {/* Profile Photo Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            {customerData.profilePhoto ? (
              <Image
                src={URL.createObjectURL(customerData.profilePhoto)}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <label className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-sm text-gray-500">Profile photo (optional, max 5MB)</p>
        {errors.profilePhoto && (
          <p className="text-sm text-red-500">{errors.profilePhoto}</p>
        )}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            value={customerData.firstName}
            onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
            className={cn(
              "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
              errors.firstName ? "border-red-500" : "border-gray-300"
            )}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            value={customerData.lastName}
            onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
            className={cn(
              "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
              errors.lastName ? "border-red-500" : "border-gray-300"
            )}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          value={customerData.email}
          onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
          className={cn(
            "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
            errors.email ? "border-red-500" : "border-gray-300"
          )}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number *
        </label>
        <input
          type="tel"
          value={customerData.mobile}
          onChange={(e) => setCustomerData({ ...customerData, mobile: e.target.value })}
          className={cn(
            "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
            errors.mobile ? "border-red-500" : "border-gray-300"
          )}
          placeholder="+27XXXXXXXXX"
        />
        {errors.mobile && (
          <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City *
        </label>
        <select
          value={customerData.city}
          onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
          className={cn(
            "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
            errors.city ? "border-red-500" : "border-gray-300"
          )}
        >
          <option value="">Select your city</option>
          <option value="Cape Town">Cape Town</option>
          <option value="Johannesburg">Johannesburg</option>
          <option value="Durban">Durban</option>
          <option value="Pretoria">Pretoria</option>
          <option value="Port Elizabeth">Port Elizabeth</option>
          <option value="Bloemfontein">Bloemfontein</option>
          <option value="Other">Other</option>
        </select>
        {errors.city && (
          <p className="text-sm text-red-500 mt-1">{errors.city}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cuisine Preferences</h2>
        <p className="text-gray-600">Help us match you with the perfect chef</p>
      </div>

      {/* Dietary Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Dietary Requirements
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {DIETARY_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleDietaryToggle(option)}
              className={cn(
                "px-3 py-2 text-sm rounded-lg border transition-colors",
                customerData.dietaryRequirements.includes(option)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary"
              )}
            >
              {customerData.dietaryRequirements.includes(option) && (
                <Check className="w-4 h-4 inline mr-1" />
              )}
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Cuisine Preferences
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {CUISINE_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleCuisineToggle(option)}
              className={cn(
                "px-3 py-2 text-sm rounded-lg border transition-colors",
                customerData.cuisinePreferences.includes(option)
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:border-primary"
              )}
            >
              {customerData.cuisinePreferences.includes(option) && (
                <Check className="w-4 h-4 inline mr-1" />
              )}
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Allergies
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {ALLERGY_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleAllergyToggle(option)}
              className={cn(
                "px-3 py-2 text-sm rounded-lg border transition-colors",
                customerData.allergies.includes(option)
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-white text-gray-700 border-gray-300 hover:border-red-300"
              )}
            >
              {customerData.allergies.includes(option) && (
                <Check className="w-4 h-4 inline mr-1" />
              )}
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Special Requests or Notes
        </label>
        <textarea
          value={customerData.specialRequests}
          onChange={(e) => setCustomerData({ ...customerData, specialRequests: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          rows={3}
          placeholder="Any specific dietary needs, cooking preferences, or special requests..."
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep + 1} of 2</span>
            <span className="text-sm text-gray-500">Customer Signup</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 0 ? renderStep1() : renderStep2()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 1 ? (
              <Button onClick={handleNext} className="flex items-center">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="flex items-center">
                Create Account
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

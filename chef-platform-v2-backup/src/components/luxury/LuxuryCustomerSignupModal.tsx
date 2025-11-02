'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { X, Upload, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface CustomerSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LuxuryCustomerSignupModal({ isOpen, onClose }: CustomerSignupModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    city: '',
    profilePhoto: null as File | null,
  });

  if (!isOpen) return null;

  const handleNext = () => {
    // Add validation here
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    console.log('Signup data:', formData);
    // Add API call here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - Blurred Black Background */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-900/30 rounded-none shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-amber-400 transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="p-8 border-b border-amber-900/20">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <h2 className="text-2xl font-serif text-white">Join Table & Plate</h2>
            </div>
            <p className="text-center text-gray-400 font-light">
              Step {currentStep} of 2 - Customer Account
            </p>
            
            {/* Progress Bar */}
            <div className="mt-6 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${(currentStep / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl text-white font-light text-center mb-6">
                  Create Your Account
                </h3>

                {/* Profile Photo Upload */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-amber-400/30 flex items-center justify-center mb-4 cursor-pointer hover:border-amber-400 transition-colors group">
                    <Upload className="w-8 h-8 text-gray-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-400">Profile photo (optional, max 5MB)</p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-light">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors font-normal"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300 mb-2 font-light">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors font-normal"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2 font-light">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors font-normal"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2 font-light">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors font-normal"
                    placeholder="+27 XX XXX XXXX"
                  />
                  <p className="text-xs text-gray-500 mt-1">Please enter a valid SA mobile number (+27XXXXXXXXX)</p>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2 font-light">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-black focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors font-normal"
                  >
                    <option value="" className="text-black">Select your city</option>
                    <option value="Cape Town" className="text-black">Cape Town</option>
                    <option value="Johannesburg" className="text-black">Johannesburg</option>
                    <option value="Durban" className="text-black">Durban</option>
                    <option value="Pretoria" className="text-black">Pretoria</option>
                    <option value="Port Elizabeth" className="text-black">Port Elizabeth</option>
                    <option value="Other" className="text-black">Other</option>
                  </select>
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-none mt-8"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl text-white font-light text-center mb-6">
                  Cuisine Preferences
                </h3>

                <p className="text-gray-400 text-center mb-8">
                  Help us match you with the perfect chef for your taste
                </p>

                {/* Preferences would go here - simplified for now */}
                <div className="text-center py-12">
                  <Check className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                  <p className="text-gray-300">Almost there! Complete your preferences</p>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <Button
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black rounded-none"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-none"
                  >
                    Create Account
                    <Check className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-amber-900/20 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <a href="/signin" className="text-amber-400 hover:text-amber-300 font-light">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
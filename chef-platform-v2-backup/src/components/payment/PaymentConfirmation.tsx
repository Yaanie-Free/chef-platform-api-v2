'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, Calendar, MapPin, CreditCard, Download, Share2, Star } from 'lucide-react';
import Link from 'next/link';

interface BookingDetails {
  id: string;
  chefName: string;
  chefImage: string;
  chefRating: number;
  service: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  totalAmount: number;
  paymentMethod: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function PaymentConfirmation() {
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get booking details
    setTimeout(() => {
      setBooking({
        id: 'BK-2024-001',
        chefName: 'Chef Sarah Johnson',
        chefImage: '/api/placeholder/100/100',
        chefRating: 4.9,
        service: 'Private Dinner for 4',
        date: 'March 15, 2024',
        time: '7:00 PM',
        duration: '3 hours',
        location: 'Cape Town, South Africa',
        totalAmount: 2500,
        paymentMethod: 'Credit Card ending in 4242',
        status: 'confirmed'
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleDownloadReceipt = () => {
    // Implement receipt download
    console.log('Downloading receipt...');
  };

  const handleShareBooking = () => {
    // Implement sharing functionality
    if (navigator.share) {
      navigator.share({
        title: 'ChefConnect Booking Confirmation',
        text: `I've booked ${booking?.chefName} for ${booking?.service} on ${booking?.date}`,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Booking link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find your booking details.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Confirmed!</h1>
          <p className="text-lg text-gray-600">
            Your booking with {booking.chefName} has been confirmed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chef Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Chef Details</h2>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">
                    {booking.chefName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{booking.chefName}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{booking.chefRating}</span>
                    <span className="text-sm text-gray-500">(127 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Details</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">{booking.service}</p>
                    <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Duration</p>
                    <p className="text-sm text-gray-600">{booking.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">{booking.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">What's Next?</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>You'll receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Your chef will contact you 24 hours before the service</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>You can manage your booking in your dashboard</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="space-y-6">
            {/* Payment Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">R{booking.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Fee</span>
                  <span className="font-medium">R{(booking.totalAmount * 0.1).toFixed(0)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Paid</span>
                    <span>R{(booking.totalAmount * 1.1).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="w-4 h-4" />
                  <span>{booking.paymentMethod}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Payment processed securely via Stripe
                </p>
              </div>
            </div>

            {/* Booking ID */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium text-gray-900 mb-2">Booking Reference</h3>
              <p className="text-sm text-gray-600 font-mono">{booking.id}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleDownloadReceipt}
                variant="outline" 
                className="w-full flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
              
              <Button 
                onClick={handleShareBooking}
                variant="outline" 
                className="w-full flex items-center justify-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Booking
              </Button>
              
              <Link href="/dashboard" className="block">
                <Button className="w-full">
                  View Dashboard
                </Button>
              </Link>
              
              <Link href="/" className="block">
                <Button variant="ghost" className="w-full">
                  Browse More Chefs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  MessageCircle, 
  Settings, 
  Plus,
  Filter,
  Search,
  Bell,
  User
} from 'lucide-react';

interface Booking {
  id: string;
  chefName: string;
  chefImage: string;
  chefRating: number;
  service: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalAmount: number;
}

const mockBookings: Booking[] = [
  {
    id: 'BK-001',
    chefName: 'Chef Sarah Johnson',
    chefImage: '/api/placeholder/60/60',
    chefRating: 4.9,
    service: 'Private Dinner for 4',
    date: 'March 15, 2024',
    time: '7:00 PM',
    location: 'Cape Town',
    status: 'upcoming',
    totalAmount: 2500
  },
  {
    id: 'BK-002',
    chefName: 'Chef Michael Chen',
    chefImage: '/api/placeholder/60/60',
    chefRating: 4.8,
    service: 'Cooking Class',
    date: 'March 10, 2024',
    time: '2:00 PM',
    location: 'Johannesburg',
    status: 'completed',
    totalAmount: 1200
  }
];

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'messages'>('bookings');
  const [bookings] = useState<Booking[]>(mockBookings);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderBookings = () => (
    <div className="space-y-4 xs:space-y-5 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">My Bookings</h2>
          <p className="text-sm xs:text-base text-gray-600">Manage your chef services</p>
        </div>
        <div className="flex flex-wrap gap-2 xs:gap-3">
          <Button variant="outline" size="sm" className="touch-target text-xs xs:text-sm">
            <Filter className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
            Filter
          </Button>
          <Button size="sm" className="touch-target text-xs xs:text-sm">
            <Plus className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 xs:w-4 xs:h-4" />
        <input
          type="text"
          placeholder="Search bookings..."
          className="w-full pl-8 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Bookings List */}
      <div className="space-y-3 xs:space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-3 xs:p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-3 xs:gap-4">
                <div className="w-12 h-12 xs:w-14 xs:h-14 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm xs:text-base md:text-lg font-bold text-gray-600">
                    {booking.chefName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base xs:text-lg md:text-xl font-semibold text-gray-900 line-clamp-1">{booking.chefName}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-400 fill-current" />
                      <span className="text-xs xs:text-sm text-gray-600">{booking.chefRating}</span>
                    </div>
                  </div>
                  <p className="text-sm xs:text-base text-gray-600 mb-2 line-clamp-1">{booking.service}</p>
                  <div className="flex flex-wrap items-center gap-2 xs:gap-3 md:gap-4 text-xs xs:text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{booking.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 xs:gap-4 lg:flex-shrink-0">
                <div className="flex items-center justify-between sm:justify-start sm:flex-col sm:items-end w-full sm:w-auto gap-3 sm:gap-1">
                  <p className="text-base xs:text-lg md:text-xl font-semibold text-gray-900">R{booking.totalAmount.toLocaleString()}</p>
                  <span className={cn(
                    "inline-flex px-2 xs:px-2.5 py-0.5 xs:py-1 text-xs font-medium rounded-full whitespace-nowrap",
                    getStatusColor(booking.status)
                  )}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="touch-target text-xs xs:text-sm flex-1 sm:flex-initial">
                    <MessageCircle className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
                    <span className="hidden xs:inline">Message</span>
                    <span className="xs:hidden">Msg</span>
                  </Button>
                  <Button variant="outline" size="sm" className="touch-target text-xs xs:text-sm flex-1 sm:flex-initial whitespace-nowrap">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-4 xs:space-y-5 md:space-y-6">
      <div>
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-sm xs:text-base text-gray-600">Manage your account information</p>
      </div>

      <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-5 md:p-6">
        <div className="text-center">
          <div className="w-20 h-20 xs:w-24 xs:h-24 bg-gray-200 rounded-full mx-auto mb-3 xs:mb-4 flex items-center justify-center">
            <User className="w-7 h-7 xs:w-8 xs:h-8 text-gray-400" />
          </div>
          <h3 className="text-base xs:text-lg md:text-xl font-semibold text-gray-900">John Doe</h3>
          <p className="text-sm xs:text-base text-gray-600">john.doe@example.com</p>
        </div>

        <div className="mt-5 xs:mt-6 space-y-3 xs:space-y-4">
          <div>
            <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-3 xs:px-4 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full px-3 xs:px-4 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">Mobile</label>
            <input
              type="tel"
              defaultValue="+27123456789"
              className="w-full px-3 xs:px-4 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1">City</label>
            <select className="w-full px-3 xs:px-4 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Cape Town</option>
              <option>Johannesburg</option>
              <option>Durban</option>
            </select>
          </div>
        </div>

        <div className="mt-5 xs:mt-6">
          <Button className="w-full sm:w-auto touch-target text-sm xs:text-base">Save Changes</Button>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-4 xs:space-y-5 md:space-y-6">
      <div>
        <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">Messages</h2>
        <p className="text-sm xs:text-base text-gray-600">Chat with your chefs</p>
      </div>

      <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-5 md:p-6">
        <div className="text-center py-8 xs:py-10 md:py-12">
          <MessageCircle className="w-10 h-10 xs:w-12 xs:h-12 text-gray-400 mx-auto mb-3 xs:mb-4" />
          <h3 className="text-base xs:text-lg md:text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
          <p className="text-sm xs:text-base text-gray-600 mb-3 xs:mb-4 px-4">Start a conversation with your chef after booking</p>
          <Button className="touch-target text-sm xs:text-base">Browse Chefs</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl desktop:max-w-desktop-lg ultrawide:max-w-ultrawide mx-auto px-responsive">
          <div className="flex items-center justify-between h-14 xs:h-16 md:h-18">
            <div className="flex items-center gap-3 xs:gap-4">
              <h1 className="text-lg xs:text-xl md:text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 xs:gap-3">
              <Button variant="ghost" size="sm" className="touch-target p-1.5 xs:p-2">
                <Bell className="w-4 h-4 xs:w-5 xs:h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="touch-target p-1.5 xs:p-2">
                <Settings className="w-4 h-4 xs:w-5 xs:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl desktop:max-w-desktop-lg ultrawide:max-w-ultrawide mx-auto px-responsive py-responsive">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 xs:mb-8 overflow-x-auto mobile-scroll-smooth">
          <nav className="-mb-px flex gap-4 xs:gap-6 md:gap-8 min-w-max xs:min-w-0">
            {[
              { id: 'bookings', label: 'Bookings', count: bookings.length },
              { id: 'profile', label: 'Profile', count: null },
              { id: 'messages', label: 'Messages', count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "py-2 xs:py-2.5 px-1 border-b-2 font-medium text-xs xs:text-sm md:text-base whitespace-nowrap touch-target transition-colors",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={cn(
                    "ml-1.5 xs:ml-2 py-0.5 px-1.5 xs:px-2 rounded-full text-xs",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "bg-gray-100 text-gray-600"
                  )}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'messages' && renderMessages()}
      </div>
    </div>
  );
}

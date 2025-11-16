'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  MessageCircle,
  Settings,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChefHat,
  Award,
  BarChart3
} from 'lucide-react';

type TabType = 'overview' | 'bookings' | 'earnings' | 'profile' | 'reviews';

interface Booking {
  id: string;
  customerName: string;
  customerImage?: string;
  serviceType: string;
  date: string;
  time: string;
  location: string;
  guestsCount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  specialRequests?: string;
}

interface Stats {
  totalBookings: number;
  upcomingBookings: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
  completionRate: number;
}

export default function ChefDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    upcomingBookings: 0,
    totalEarnings: 0,
    averageRating: 0,
    totalReviews: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch bookings
      const bookingsRes = await fetch('/api/bookings?role=chef');
      const bookingsData = await bookingsRes.json();

      if (bookingsData.bookings) {
        setBookings(bookingsData.bookings);

        // Calculate stats
        const upcoming = bookingsData.bookings.filter(
          (b: Booking) => b.status === 'pending' || b.status === 'confirmed'
        ).length;

        const completed = bookingsData.bookings.filter(
          (b: Booking) => b.status === 'completed'
        ).length;

        const totalEarnings = bookingsData.bookings
          .filter((b: Booking) => b.status === 'completed')
          .reduce((sum: number, b: Booking) => sum + b.totalAmount, 0);

        setStats({
          totalBookings: bookingsData.bookings.length,
          upcomingBookings: upcoming,
          totalEarnings,
          averageRating: 4.8, // This would come from reviews API
          totalReviews: 127, // This would come from reviews API
          completionRate: bookingsData.bookings.length > 0
            ? (completed / bookingsData.bookings.length) * 100
            : 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId: string, action: 'confirm' | 'complete' | 'cancel') => {
    try {
      const statusMap = {
        confirm: 'confirmed',
        complete: 'completed',
        cancel: 'cancelled',
      };

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusMap[action] }),
      });

      if (res.ok) {
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const renderOverview = () => (
    <div className="space-y-4 xs:space-y-5 md:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xs:gap-4 md:gap-6">
        {/* Total Bookings */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 xs:p-2.5 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 xs:w-6 xs:h-6 text-blue-600" />
            </div>
            <span className="text-xs xs:text-sm text-gray-500">Total</span>
          </div>
          <h3 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-1">{stats.totalBookings}</h3>
          <p className="text-xs xs:text-sm text-gray-600">Total Bookings</p>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 xs:p-2.5 bg-amber-100 rounded-lg">
              <Clock className="w-5 h-5 xs:w-6 xs:h-6 text-amber-600" />
            </div>
            <span className="text-xs xs:text-sm text-gray-500">Upcoming</span>
          </div>
          <h3 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-1">{stats.upcomingBookings}</h3>
          <p className="text-xs xs:text-sm text-gray-600">Upcoming Events</p>
        </div>

        {/* Total Earnings */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 xs:p-2.5 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 xs:w-6 xs:h-6 text-green-600" />
            </div>
            <span className="text-xs xs:text-sm text-gray-500">Earnings</span>
          </div>
          <h3 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-1">R{stats.totalEarnings.toLocaleString()}</h3>
          <p className="text-xs xs:text-sm text-gray-600">Total Earned</p>
        </div>

        {/* Average Rating */}
        <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-5 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 xs:p-2.5 bg-yellow-100 rounded-lg">
              <Star className="w-5 h-5 xs:w-6 xs:h-6 text-yellow-600" />
            </div>
            <span className="text-xs xs:text-sm text-gray-500">Rating</span>
          </div>
          <h3 className="text-2xl xs:text-3xl font-bold text-gray-900 mb-1">{stats.averageRating.toFixed(1)}</h3>
          <p className="text-xs xs:text-sm text-gray-600">{stats.totalReviews} Reviews</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-4 xs:p-5 md:p-6">
        <div className="flex items-center justify-between mb-4 xs:mb-5 md:mb-6">
          <h3 className="text-lg xs:text-xl font-bold text-gray-900">Recent Bookings</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('bookings')}
            className="text-xs xs:text-sm"
          >
            View All
          </Button>
        </div>

        <div className="space-y-3 xs:space-y-4">
          {bookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-3 xs:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3 xs:gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 xs:w-6 xs:h-6 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm xs:text-base font-semibold text-gray-900 line-clamp-1">{booking.customerName}</h4>
                  <p className="text-xs xs:text-sm text-gray-600 line-clamp-1">{booking.serviceType}</p>
                  <div className="flex items-center gap-2 xs:gap-3 text-xs text-gray-500 mt-1">
                    <span className="whitespace-nowrap">{booking.date}</span>
                    <span className="whitespace-nowrap">{booking.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 xs:gap-3 flex-shrink-0 ml-2">
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 xs:px-2.5 py-0.5 xs:py-1 text-xs font-medium rounded-full whitespace-nowrap",
                  getStatusColor(booking.status)
                )}>
                  {getStatusIcon(booking.status)}
                  <span className="hidden xs:inline">{booking.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-4 xs:space-y-5 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">Booking Requests</h2>
          <p className="text-sm xs:text-base text-gray-600">Manage your client bookings</p>
        </div>
      </div>

      <div className="space-y-3 xs:space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg xs:rounded-xl shadow-sm border border-gray-200 p-3 xs:p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-start gap-3 xs:gap-4 flex-1">
                <div className="w-12 h-12 xs:w-14 xs:h-14 md:w-16 md:h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 xs:w-7 xs:h-7 md:w-8 md:h-8 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base xs:text-lg md:text-xl font-semibold text-gray-900">{booking.customerName}</h3>
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 xs:px-2.5 py-0.5 xs:py-1 text-xs font-medium rounded-full",
                      getStatusColor(booking.status)
                    )}>
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm xs:text-base text-gray-600 mb-2">{booking.serviceType}</p>
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
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 xs:w-4 xs:h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{booking.guestsCount} guests</span>
                    </div>
                  </div>
                  {booking.specialRequests && (
                    <p className="text-xs xs:text-sm text-gray-600 mt-2 p-2 bg-gray-50 rounded line-clamp-2">
                      <strong>Special Requests:</strong> {booking.specialRequests}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 xs:gap-4 lg:flex-shrink-0">
                <div className="flex items-center justify-between sm:justify-start lg:justify-end w-full sm:w-auto gap-3">
                  <p className="text-base xs:text-lg md:text-xl font-semibold text-gray-900">R{booking.totalAmount.toLocaleString()}</p>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  {booking.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleBookingAction(booking.id, 'confirm')}
                        className="flex-1 sm:flex-initial bg-green-600 hover:bg-green-700 touch-target text-xs xs:text-sm"
                      >
                        <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBookingAction(booking.id, 'cancel')}
                        className="flex-1 sm:flex-initial touch-target text-xs xs:text-sm"
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <Button
                      size="sm"
                      onClick={() => handleBookingAction(booking.id, 'complete')}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 touch-target text-xs xs:text-sm"
                    >
                      Mark Complete
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto touch-target text-xs xs:text-sm"
                  >
                    <MessageCircle className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl desktop:max-w-desktop-lg ultrawide:max-w-ultrawide mx-auto px-responsive">
          <div className="flex items-center justify-between h-14 xs:h-16 md:h-18">
            <div className="flex items-center gap-3 xs:gap-4">
              <div className="p-2 xs:p-2.5 bg-amber-100 rounded-lg">
                <ChefHat className="w-5 h-5 xs:w-6 xs:h-6 text-amber-600" />
              </div>
              <div>
                <h1 className="text-lg xs:text-xl md:text-2xl font-semibold text-gray-900">Chef Dashboard</h1>
                <p className="text-xs xs:text-sm text-gray-600 hidden xs:block">Welcome back!</p>
              </div>
            </div>
            <div className="flex items-center gap-2 xs:gap-3">
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
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'bookings', label: 'Bookings', icon: Calendar, count: stats.upcomingBookings },
              { id: 'earnings', label: 'Earnings', icon: DollarSign },
              { id: 'profile', label: 'Profile', icon: ChefHat },
              { id: 'reviews', label: 'Reviews', icon: Star }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={cn(
                    "py-2 xs:py-2.5 px-1 border-b-2 font-medium text-xs xs:text-sm md:text-base whitespace-nowrap touch-target transition-colors flex items-center gap-2",
                    activeTab === tab.id
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={cn(
                      "ml-1 xs:ml-1.5 py-0.5 px-1.5 xs:px-2 rounded-full text-xs",
                      activeTab === tab.id
                        ? "bg-amber-100 text-amber-600"
                        : "bg-gray-100 text-gray-600"
                    )}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'bookings' && renderBookings()}
            {activeTab === 'earnings' && (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Earnings Analytics</h3>
                <p className="text-gray-600">Detailed earnings view coming soon</p>
              </div>
            )}
            {activeTab === 'profile' && (
              <div className="text-center py-12">
                <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Management</h3>
                <p className="text-gray-600">Profile editor coming soon</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Reviews</h3>
                <p className="text-gray-600">Reviews management coming soon</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

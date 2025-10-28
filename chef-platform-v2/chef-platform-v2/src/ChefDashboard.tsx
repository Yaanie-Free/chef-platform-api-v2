import { useState } from 'react';
import { Heart, Star, MessageSquare, Calendar, Image, Settings, LogOut, TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DashboardStats } from './chef-dashboard/DashboardStats';
import { BookingsManager } from './chef-dashboard/BookingsManager';
import { ReviewsManager } from './chef-dashboard/ReviewsManager';
import { MessagesPanel } from './chef-dashboard/MessagesPanel';
import { PostsManager } from './chef-dashboard/PostsManager';
import { ProfileSettings } from './chef-dashboard/ProfileSettings';

interface ChefDashboardProps {
  chefData: any;
  onLogout: () => void;
}

export function ChefDashboard({ chefData, onLogout }: ChefDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const dashboardData = {
    totalLikes: 234,
    totalReviews: 45,
    averageRating: 4.8,
    totalBookings: 78,
    upcomingBookings: 12,
    completedBookings: 66,
    totalRevenue: 45780,
    monthlyRevenue: 8950,
    totalPosts: 23,
    profileViews: 1250
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white">
                <span className="text-black font-semibold text-xl">T&P</span>
              </div>
              <div>
                <h1 className="text-xl">Chef Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {chefData.firstName}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={onLogout}
              className="rounded-2xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="inline-flex h-auto gap-2 bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="rounded-2xl data-[state=active]:bg-white data-[state=active]:text-black"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="bookings"
              className="rounded-2xl data-[state=active]:bg-white data-[state=active]:text-black"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
              {dashboardData.upcomingBookings > 0 && (
                <Badge className="ml-2 bg-gradient-to-br from-pink-500 to-rose-500 text-white border-none">
                  {dashboardData.upcomingBookings}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-2xl data-[state=active]:bg-white data-[state=active]:text-black"
            >
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="rounded-2xl data-[state=active]:bg-white data-[state=active]:text-black"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="posts"
              className="rounded-2xl data-[state=active]:bg-white data-[state=active]:text-black"
            >
              <Image className="w-4 h-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-2xl data-[state=active]:bg-white data-[state=active]:text-black"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <DashboardStats data={dashboardData} />
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <BookingsManager chefData={chefData} />
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <ReviewsManager chefData={chefData} totalLikes={dashboardData.totalLikes} />
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <MessagesPanel chefData={chefData} />
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts">
            <PostsManager chefData={chefData} />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <ProfileSettings chefData={chefData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

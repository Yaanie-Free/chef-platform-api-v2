'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Camera, 
  Save, 
  Edit, 
  Eye, 
  EyeOff,
  Shield,
  Bell,
  Globe,
  Lock,
  CreditCard,
  Heart,
  Star,
  Settings,
  Trash2,
  Upload,
  Check,
  X,
  AlertTriangle
} from 'lucide-react';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  bio: string;
  location: string;
  dateOfBirth: string;
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
      marketing: boolean;
    };
    privacy: {
      profileVisibility: 'public' | 'private' | 'friends';
      showEmail: boolean;
      showPhone: boolean;
      showLocation: boolean;
    };
    dietary: string[];
    cuisinePreferences: string[];
    budgetRange: [number, number];
    eventTypes: string[];
  };
  stats: {
    totalBookings: number;
    totalSpent: number;
    favoriteChefs: number;
    reviewsGiven: number;
    memberSince: string;
  };
  paymentMethods: PaymentMethod[];
  addresses: Address[];
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
}

export default function ProfileManagement() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+27 82 123 4567',
    bio: 'Food enthusiast and cooking lover. Always looking for new culinary experiences!',
    location: 'Cape Town, South Africa',
    dateOfBirth: '1990-05-15',
    preferences: {
      notifications: {
        email: true,
        sms: true,
        push: true,
        marketing: false
      },
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        showLocation: true
      },
      dietary: ['Vegetarian', 'Gluten-free'],
      cuisinePreferences: ['Italian', 'Mediterranean', 'Asian'],
      budgetRange: [500, 2000],
      eventTypes: ['Dinner Party', 'Date Night', 'Family Gathering']
    },
    stats: {
      totalBookings: 12,
      totalSpent: 15600,
      favoriteChefs: 3,
      reviewsGiven: 8,
      memberSince: '2023-01-15'
    },
    paymentMethods: [
      {
        id: '1',
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true
      }
    ],
    addresses: [
      {
        id: '1',
        label: 'Home',
        street: '123 Main Street',
        city: 'Cape Town',
        province: 'Western Cape',
        postalCode: '8001',
        isDefault: true
      }
    ]
  });

  const [formData, setFormData] = useState(profile);
  const [newPassword, setNewPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (category: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: {
          ...prev.preferences[category as keyof typeof prev.preferences],
          [field]: value
        }
      }
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    // In a real app, this would save to the backend
    console.log('Profile saved:', formData);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          avatar: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (newPassword.new !== newPassword.confirm) {
      alert('New passwords do not match');
      return;
    }
    // In a real app, this would validate and update the password
    console.log('Password changed');
    setNewPassword({ current: '', new: '', confirm: '' });
    setIsChangingPassword(false);
  };

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-free', 'Dairy-free', 'Nut-free',
    'Keto', 'Paleo', 'Halal', 'Kosher', 'Low-carb', 'Mediterranean'
  ];

  const cuisineOptions = [
    'Italian', 'French', 'Japanese', 'Chinese', 'Indian', 'Thai',
    'Mexican', 'Mediterranean', 'American', 'African', 'Asian', 'European'
  ];

  const eventTypeOptions = [
    'Dinner Party', 'Date Night', 'Family Gathering', 'Business Dinner',
    'Birthday Party', 'Anniversary', 'Holiday Celebration', 'Cooking Class'
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile Management</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      {formData.avatar ? (
                        <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-semibold">
                          {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                        </div>
                      )}
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {formData.firstName} {formData.lastName}
                    </h3>
                    <p className="text-muted-foreground">Member since {new Date(formData.stats.memberSince).toLocaleDateString()}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span>{formData.stats.totalBookings} bookings</span>
                      <span>R{formData.stats.totalSpent.toLocaleString()} spent</span>
                    </div>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Preferences</h2>
              
              <div className="space-y-6">
                {/* Dietary Requirements */}
                <div>
                  <Label className="text-base font-medium">Dietary Requirements</Label>
                  <p className="text-sm text-muted-foreground mb-3">Select your dietary preferences</p>
                  <div className="flex flex-wrap gap-2">
                    {dietaryOptions.map((option) => (
                      <Badge
                        key={option}
                        variant={formData.preferences.dietary.includes(option) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const newDietary = formData.preferences.dietary.includes(option)
                            ? formData.preferences.dietary.filter(d => d !== option)
                            : [...formData.preferences.dietary, option];
                          handlePreferenceChange('dietary', 'dietary', newDietary);
                        }}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Cuisine Preferences */}
                <div>
                  <Label className="text-base font-medium">Cuisine Preferences</Label>
                  <p className="text-sm text-muted-foreground mb-3">What cuisines do you enjoy?</p>
                  <div className="flex flex-wrap gap-2">
                    {cuisineOptions.map((option) => (
                      <Badge
                        key={option}
                        variant={formData.preferences.cuisinePreferences.includes(option) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const newCuisines = formData.preferences.cuisinePreferences.includes(option)
                            ? formData.preferences.cuisinePreferences.filter(c => c !== option)
                            : [...formData.preferences.cuisinePreferences, option];
                          handlePreferenceChange('cuisinePreferences', 'cuisinePreferences', newCuisines);
                        }}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Event Types */}
                <div>
                  <Label className="text-base font-medium">Event Types</Label>
                  <p className="text-sm text-muted-foreground mb-3">What types of events do you book chefs for?</p>
                  <div className="flex flex-wrap gap-2">
                    {eventTypeOptions.map((option) => (
                      <Badge
                        key={option}
                        variant={formData.preferences.eventTypes.includes(option) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const newEventTypes = formData.preferences.eventTypes.includes(option)
                            ? formData.preferences.eventTypes.filter(e => e !== option)
                            : [...formData.preferences.eventTypes, option];
                          handlePreferenceChange('eventTypes', 'eventTypes', newEventTypes);
                        }}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <Label className="text-base font-medium">Budget Range (per event)</Label>
                  <p className="text-sm text-muted-foreground mb-3">R{formData.preferences.budgetRange[0]} - R{formData.preferences.budgetRange[1]}</p>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="200"
                      max="5000"
                      step="100"
                      value={formData.preferences.budgetRange[0]}
                      onChange={(e) => {
                        const newRange = [parseInt(e.target.value), formData.preferences.budgetRange[1]] as [number, number];
                        handlePreferenceChange('budgetRange', 'budgetRange', newRange);
                      }}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="200"
                      max="5000"
                      step="100"
                      value={formData.preferences.budgetRange[1]}
                      onChange={(e) => {
                        const newRange = [formData.preferences.budgetRange[0], parseInt(e.target.value)] as [number, number];
                        handlePreferenceChange('budgetRange', 'budgetRange', newRange);
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Privacy Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground mb-3">Who can see your profile?</p>
                  <div className="space-y-2">
                    {[
                      { value: 'public', label: 'Everyone' },
                      { value: 'private', label: 'Only me' },
                      { value: 'friends', label: 'Chefs I\'ve booked with' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={option.value}
                          checked={formData.preferences.privacy.profileVisibility === option.value}
                          onChange={(e) => handlePreferenceChange('privacy', 'profileVisibility', e.target.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show email address</Label>
                        <p className="text-sm text-muted-foreground">Allow chefs to see your email</p>
                      </div>
                      <Switch
                        checked={formData.preferences.privacy.showEmail}
                        onCheckedChange={(checked) => handlePreferenceChange('privacy', 'showEmail', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show phone number</Label>
                        <p className="text-sm text-muted-foreground">Allow chefs to see your phone number</p>
                      </div>
                      <Switch
                        checked={formData.preferences.privacy.showPhone}
                        onCheckedChange={(checked) => handlePreferenceChange('privacy', 'showPhone', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show location</Label>
                        <p className="text-sm text-muted-foreground">Allow chefs to see your general location</p>
                      </div>
                      <Switch
                        checked={formData.preferences.privacy.showLocation}
                        onCheckedChange={(checked) => handlePreferenceChange('privacy', 'showLocation', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Payment Methods</h2>
                <Button>Add Payment Method</Button>
              </div>
              
              <div className="space-y-4">
                {formData.paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-6 h-6 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {method.brand} •••• {method.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Addresses</h2>
                <Button>Add Address</Button>
              </div>
              
              <div className="space-y-4">
                {formData.addresses.map((address) => (
                  <div key={address.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{address.label}</h3>
                          {address.isDefault && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          {address.street}<br />
                          {address.city}, {address.province} {address.postalCode}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                {/* Change Password */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">Password</h3>
                      <p className="text-sm text-muted-foreground">Change your account password</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsChangingPassword(!isChangingPassword)}
                    >
                      {isChangingPassword ? 'Cancel' : 'Change Password'}
                    </Button>
                  </div>
                  
                  {isChangingPassword && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? "text" : "password"}
                            value={newPassword.current}
                            onChange={(e) => setNewPassword(prev => ({ ...prev, current: e.target.value }))}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword.new}
                          onChange={(e) => setNewPassword(prev => ({ ...prev, new: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={newPassword.confirm}
                          onChange={(e) => setNewPassword(prev => ({ ...prev, confirm: e.target.value }))}
                        />
                      </div>
                      <Button onClick={handlePasswordChange}>
                        Update Password
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <Separator />

                {/* Login Sessions */}
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Windows • Chrome • Cape Town, South Africa</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-muted-foreground">iOS • Safari • Last active 2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

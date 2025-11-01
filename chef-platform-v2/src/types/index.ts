export type UserRole = 'customer' | 'chef' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  city: string;
  role: UserRole;
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  isActive: boolean;
}

export interface Customer extends User {
  role: 'customer';
  preferences: CuisinePreferences;
  dietaryRequirements: DietaryRequirement[];
  favoriteChefs: string[]; // Chef IDs
  bookingHistory: string[]; // Booking IDs
}

export interface Chef extends User {
  role: 'chef';
  bio: string;
  specialties: string[];
  cuisineTypes: string[];
  yearsExperience: number;
  certifications: Certification[];
  priceRange: PriceRange;
  location: Location;
  rating: number;
  reviewCount: number;
  portfolioImages: string[];
  availability: Availability[];
  featured: boolean;
  verified: boolean;
}

/**
 * Booking Types
 */
export interface Booking {
  id: string;
  customerId: string;
  chefId: string;
  date: Date;
  time: string;
  guests: number;
  serviceType: ServiceType;
  status: BookingStatus;
  totalPrice: number;
  specialRequests?: string;
  dietaryRequirements?: DietaryRequirement[];
  address: Address;
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in_progress' 
  | 'completed' 
  | 'cancelled' 
  | 'refunded';

export type ServiceType = 
  | 'private_dining' 
  | 'meal_prep' 
  | 'cooking_class' 
  | 'event_catering';

/**
 * Review Types
 */
export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  chefId: string;
  rating: number; // 1-5
  comment: string;
  photos?: string[];
  categories: ReviewCategory;
  response?: ChefResponse;
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean; // Only customers who actually booked can review
}

export interface ReviewCategory {
  foodQuality: number;
  professionalism: number;
  communication: number;
  valueForMoney: number;
}

export interface ChefResponse {
  comment: string;
  createdAt: Date;
}

/**
 * Cuisine & Dietary Types
 */
export interface CuisinePreferences {
  preferred: string[];
  disliked: string[];
}

export type DietaryRequirement = 
  | 'vegetarian' 
  | 'vegan' 
  | 'gluten_free' 
  | 'dairy_free' 
  | 'halal' 
  | 'kosher' 
  | 'keto' 
  | 'paleo' 
  | 'nut_allergy'
  | 'seafood_allergy'
  | 'other';

/**
 * Location Types
 */
export interface Location {
  city: string;
  province: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Address extends Location {
  streetAddress: string;
  suburb?: string;
  postalCode: string;
}

/**
 * Payment Types
 */
export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  stripePaymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PaymentStatus = 
  | 'pending' 
  | 'processing' 
  | 'succeeded' 
  | 'failed' 
  | 'refunded';

export type PaymentMethod = 
  | 'card' 
  | 'bank_transfer' 
  | 'wallet';

/**
 * Chef-specific Types
 */
export interface Certification {
  name: string;
  issuer: string;
  dateObtained: Date;
  expiryDate?: Date;
  verificationUrl?: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
  unit: 'per_person' | 'per_event';
}

export interface Availability {
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  startTime: string; // HH:mm format
  endTime: string;
  isAvailable: boolean;
}

/**
 * API Response Types
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  stack?: string; // Only in development
}

/**
 * Form Types
 */
export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  password: string;
  profilePhoto?: File;
  role: UserRole;
}

export interface ChefSignupFormData extends SignupFormData {
  role: 'chef';
  bio: string;
  specialties: string[];
  yearsExperience: number;
  certifications: Certification[];
  portfolioImages: File[];
  priceRange: PriceRange;
}

/**
 * Search & Filter Types
 */
export interface SearchParams {
  query?: string;
  city?: string;
  cuisineType?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  availability?: Date;
  dietaryRequirements?: DietaryRequirement[];
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}

export type SortOption = 
  | 'rating_desc' 
  | 'rating_asc' 
  | 'price_desc' 
  | 'price_asc' 
  | 'reviews_desc' 
  | 'newest';

/**
 * UI State Types
 */
export interface ModalState {
  isOpen: boolean;
  type?: 'signup' | 'signin' | 'booking' | 'review' | 'confirmation';
  data?: any;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

/**
 * Validation Types
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * Analytics Types
 */
export interface AnalyticsEvent {
  eventName: string;
  userId?: string;
  properties?: Record<string, any>;
  timestamp: Date;
}

export type EventName = 
  | 'page_view'
  | 'chef_profile_view'
  | 'booking_initiated'
  | 'booking_completed'
  | 'search_performed'
  | 'signup_completed'
  | 'review_submitted';
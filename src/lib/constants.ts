export const APP_CONFIG = {
  name: 'Table & Plate',
  tagline: 'Luxury made personal',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'hello@tableandplate.co.za',
  supportPhone: '+27 12 345 6789',
} as const;

/**
 * Breakpoints (matching Tailwind defaults)
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Animation Durations (milliseconds)
 */
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * API Configuration
 */
export const API = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

/**
 * File Upload Limits
 */
export const UPLOAD_LIMITS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  maxImages: 10,
  acceptedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  acceptedImageExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 48],
} as const;

/**
 * South African Cities
 */
export const SA_CITIES = [
  'Cape Town',
  'Johannesburg',
  'Durban',
  'Pretoria',
  'Port Elizabeth',
  'Bloemfontein',
  'East London',
  'Polokwane',
  'Mbombela',
  'Kimberley',
  'Stellenbosch',
  'Pietermaritzburg',
  'Other',
] as const;

/**
 * Cuisine Types
 */
export const CUISINE_TYPES = [
  'African',
  'Asian Fusion',
  'BBQ & Grill',
  'Chinese',
  'French',
  'Indian',
  'Italian',
  'Japanese',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Modern SA',
  'Seafood',
  'Thai',
  'Traditional SA',
  'Vegan & Vegetarian',
  'Vietnamese',
] as const;

/**
 * Dietary Requirements
 */
export const DIETARY_REQUIREMENTS = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten_free', label: 'Gluten-free' },
  { value: 'dairy_free', label: 'Dairy-free' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' },
  { value: 'keto', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'nut_allergy', label: 'Nut allergy' },
  { value: 'seafood_allergy', label: 'Seafood allergy' },
] as const;

/**
 * Service Types
 */
export const SERVICE_TYPES = [
  { value: 'private_dining', label: 'Private dining', icon: '🍽️' },
  { value: 'meal_prep', label: 'Meal prep', icon: '📦' },
  { value: 'cooking_class', label: 'Cooking class', icon: '👨‍🍳' },
  { value: 'event_catering', label: 'Event catering', icon: '🎉' },
] as const;

/**
 * Sort Options
 */
export const SORT_OPTIONS = [
  { value: 'rating_desc', label: 'Highest rated' },
  { value: 'rating_asc', label: 'Lowest rated' },
  { value: 'price_desc', label: 'Price: High to low' },
  { value: 'price_asc', label: 'Price: Low to high' },
  { value: 'reviews_desc', label: 'Most reviewed' },
  { value: 'newest', label: 'Newest chefs' },
] as const;

/**
 * Booking Status
 */
export const BOOKING_STATUS = {
  pending: { label: 'Pending', color: 'yellow' },
  confirmed: { label: 'Confirmed', color: 'blue' },
  in_progress: { label: 'In progress', color: 'purple' },
  completed: { label: 'Completed', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
  refunded: { label: 'Refunded', color: 'gray' },
} as const;

/**
 * Rating Categories
 */
export const RATING_CATEGORIES = [
  { key: 'foodQuality', label: 'Food quality' },
  { key: 'professionalism', label: 'Professionalism' },
  { key: 'communication', label: 'Communication' },
  { key: 'valueForMoney', label: 'Value for money' },
] as const;

/**
 * Default Price Range
 */
export const DEFAULT_PRICE_RANGE = {
  min: 0,
  max: 10000,
  currency: 'ZAR',
} as const;

/**
 * Image Gallery Settings
 */
export const GALLERY = {
  autoScrollInterval: 3000, // 3 seconds
  transitionDuration: 500, // 0.5 seconds
  thumbnailSize: 64, // 64px
} as const;

/**
 * Search Debounce
 */
export const SEARCH_DEBOUNCE_MS = 500;

/**
 * Toast Duration
 */
export const TOAST_DURATION = 5000; // 5 seconds

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  user: 'table_plate_user',
  token: 'table_plate_token',
  cart: 'table_plate_cart',
  preferences: 'table_plate_preferences',
} as const;

/**
 * Routes
 */
export const ROUTES = {
  home: '/',
  discover: '/discover',
  chef: (id: string) => `/chef/${id}`,
  booking: (id: string) => `/booking/${id}`,
  profile: '/profile',
  messages: '/messages',
  support: '/support',
  faq: '/faq',
  howItWorks: '/how-it-works',
  signin: '/signin',
  signup: '/signup',
  chefSignup: '/signup?type=chef',
  dashboard: '/dashboard',
  chefDashboard: '/chef-dashboard',
} as const;

/**
 * Z-Index Layers
 */
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

/**
 * Feature Flags
 */
export const FEATURES = {
  enableReviews: true,
  enableChat: true,
  enableNotifications: true,
  enableAnalytics: process.env.NODE_ENV === 'production',
} as const;

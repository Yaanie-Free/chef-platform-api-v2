// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==========================================
// DATABASE TYPES
// ==========================================
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  user_type: 'customer' | 'chef' | 'admin';
  city: string | null;
  created_at: string;
  updated_at: string;
};

export type Chef = {
  id: string;
  user_id: string;
  specialty: string[];
  bio: string | null;
  experience_years: number | null;
  rating: number;
  total_reviews: number;
  price_range: string | null;
  location: string | null;
  is_verified: boolean;
  is_featured: boolean;
  cuisines: string[];
  certifications: string[];
  created_at: string;
  updated_at: string;
};

export type Booking = {
  id: string;
  customer_id: string;
  chef_id: string;
  service_type: string | null;
  event_date: string;
  event_time: string;
  duration_hours: number | null;
  guest_count: number | null;
  location: string | null;
  special_requests: string | null;
  dietary_requirements: string[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_intent_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: string;
  booking_id: string;
  chef_id: string;
  customer_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
};

export type Message = {
  id: string;
  booking_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
};

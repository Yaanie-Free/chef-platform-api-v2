import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

/**
 * GET /api/bookings
 * Fetch bookings for current user (customer or chef)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role'); // 'customer' or 'chef'
    const status = searchParams.get('status'); // 'pending', 'confirmed', 'completed', 'cancelled'

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query = supabase
      .from('bookings')
      .select(`
        *,
        chef:chefs(*),
        customer:profiles(*)
      `);

    // Filter by role
    if (role === 'chef') {
      query = query.eq('chef_id', user.id);
    } else {
      query = query.eq('customer_id', user.id);
    }

    // Filter by status
    if (status) {
      query = query.eq('status', status);
    }

    query = query.order('booking_date', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ bookings: data || [] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Create a new booking
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate required fields
    const {
      chef_id,
      service_type,
      booking_date,
      booking_time,
      guests_count,
      special_requests,
      total_amount,
    } = body;

    if (!chef_id || !service_type || !booking_date || !booking_time || !guests_count) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_id: user.id,
          chef_id,
          service_type,
          booking_date,
          booking_time,
          guests_count,
          special_requests: special_requests || '',
          total_amount: total_amount || 0,
          status: 'pending',
        },
      ])
      .select(`
        *,
        chef:chefs(*),
        customer:profiles(*)
      `)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ booking: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

/**
 * GET /api/bookings/[id]
 * Fetch a specific booking
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        chef:chefs(*),
        customer:profiles(*)
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    // Verify user has access to this booking
    if (data.customer_id !== user.id && data.chef_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ booking: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/bookings/[id]
 * Update booking status or details
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch booking to verify ownership
    const { data: booking } = await supabase
      .from('bookings')
      .select('customer_id, chef_id, status')
      .eq('id', params.id)
      .single();

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Verify user has access to this booking
    if (booking.customer_id !== user.id && booking.chef_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Build update object based on user role
    const updates: any = {};

    if (body.status) {
      // Chefs can confirm/complete bookings, customers can cancel
      if (booking.chef_id === user.id) {
        if (['confirmed', 'completed'].includes(body.status)) {
          updates.status = body.status;
        }
      } else if (booking.customer_id === user.id) {
        if (body.status === 'cancelled') {
          updates.status = body.status;
        }
      }
    }

    // Only customers can update booking details
    if (booking.customer_id === user.id) {
      if (body.booking_date) updates.booking_date = body.booking_date;
      if (body.booking_time) updates.booking_time = body.booking_time;
      if (body.guests_count) updates.guests_count = body.guests_count;
      if (body.special_requests !== undefined) updates.special_requests = body.special_requests;
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', params.id)
      .select(`
        *,
        chef:chefs(*),
        customer:profiles(*)
      `)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ booking: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bookings/[id]
 * Cancel/Delete a booking
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch booking to verify ownership
    const { data: booking } = await supabase
      .from('bookings')
      .select('customer_id')
      .eq('id', params.id)
      .single();

    if (!booking || booking.customer_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

/**
 * GET /api/chefs
 * Fetch all chefs or filter by query params
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const cuisine = searchParams.get('cuisine');
    const location = searchParams.get('location');
    const minRating = searchParams.get('minRating');

    const supabase = createClient();
    let query = supabase
      .from('chefs')
      .select('*')
      .eq('is_verified', true);

    // Apply filters
    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    if (cuisine) {
      query = query.contains('cuisines', [cuisine]);
    }

    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (minRating) {
      query = query.gte('rating', parseFloat(minRating));
    }

    // Order by rating and review count
    query = query.order('rating', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ chefs: data || [] });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch chefs' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/chefs
 * Create a new chef profile
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create chef profile
    const { data, error } = await supabase
      .from('chefs')
      .insert([
        {
          user_id: user.id,
          specialty: body.specialty || [],
          bio: body.bio || '',
          experience_years: body.experience_years || 0,
          cuisines: body.cuisines || [],
          certifications: body.certifications || [],
          price_range: body.price_range || '',
          location: body.location || '',
          is_verified: false,
          is_featured: false,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ chef: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create chef profile' },
      { status: 500 }
    );
  }
}

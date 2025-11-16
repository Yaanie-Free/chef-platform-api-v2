import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

/**
 * GET /api/chefs/[id]
 * Fetch a specific chef by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('chefs')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ chef: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch chef' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/chefs/[id]
 * Update chef profile
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

    // Verify ownership
    const { data: chef } = await supabase
      .from('chefs')
      .select('user_id')
      .eq('id', params.id)
      .single();

    if (!chef || chef.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update chef profile
    const { data, error } = await supabase
      .from('chefs')
      .update({
        specialty: body.specialty,
        bio: body.bio,
        experience_years: body.experience_years,
        cuisines: body.cuisines,
        certifications: body.certifications,
        price_range: body.price_range,
        location: body.location,
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ chef: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update chef profile' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/chefs/[id]
 * Delete chef profile
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

    // Verify ownership
    const { data: chef } = await supabase
      .from('chefs')
      .select('user_id')
      .eq('id', params.id)
      .single();

    if (!chef || chef.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { error } = await supabase
      .from('chefs')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Chef profile deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete chef profile' },
      { status: 500 }
    );
  }
}

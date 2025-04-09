import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface SaveMessageRequest {
  role: 'assistant'; // We only expect assistant messages here
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { role, content }: SaveMessageRequest = await req.json();

    if (role !== 'assistant' || !content) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // Get user session
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          // Edge runtime doesn't need set/remove here
          set(name: string, value: string, options: any) {},
          remove(name: string, options: any) {},
        },
      }
    );

    // Use getUser() for stronger authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Save the assistant message
    const messageToSave = {
      user_id: user.id, // Use user ID from getUser()
      role: role,
      content: content,
    };

    const { error: insertError } = await supabase
      .from('messages')
      .insert(messageToSave);

    if (insertError) {
      console.error('Supabase insert error (save-message):', insertError);
      return NextResponse.json({ error: 'Failed to save assistant message' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Save message error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 
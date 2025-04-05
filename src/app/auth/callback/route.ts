import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value ?? ''
          },
          set(name, value, options) {
            try {
              cookieStore.set(name, value, { ...options, path: '/' })
            } catch (error) {
              // Handle cookie error
            }
          },
          remove(name) {
            try {
              cookieStore.delete(name)
            } catch (error) {
              // Handle cookie error
            }
          }
        }
      }
    );
    
    try {
      // Exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(new URL('/auth/signin?error=auth', requestUrl.origin));
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/onboarding/1', requestUrl.origin));
} 
'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [supabase] = useState(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.refresh();
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome to Sage</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to start your journey of self-discovery
        </p>
      </div>
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-100 rounded">
          {error}
        </div>
      )}
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'rgb(var(--color-primary))',
                brandAccent: 'rgb(var(--color-primary-dark))',
              },
            },
          },
          className: {
            container: 'w-full',
            button: 'w-full',
            input: 'w-full',
          },
        }}
        providers={['google']}
        redirectTo={`${window.location.origin}/auth/callback`}
        view="sign_in"
        showLinks={false}
        theme="dark"
        socialLayout="vertical"
      />
    </div>
  );
} 
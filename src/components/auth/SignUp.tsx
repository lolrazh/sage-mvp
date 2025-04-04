'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Noise } from '@/components/ui/noise';
import Link from 'next/link';

export function SignUp() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string>('');

  // Ensure Supabase client is only created once
  const [supabase] = useState(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  // Set redirect URL only on the client
  useEffect(() => {
    setRedirectUrl(`${window.location.origin}/auth/callback`);
  }, []);

  // Listen for sign-up (which triggers SIGNED_IN) and redirect
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        router.refresh(); // Refresh server components
        router.push('/home'); // Redirect to home after sign up
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  return (
    <main className="min-h-screen relative">
      <Noise />
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-[40px] font-serif font-medium tracking-[-0.03em] leading-tight">
              sage
            </h1>
            <p className="text-sm text-foreground/70">
              begin your journey
            </p>
          </div>
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-full lowercase">
              {error}
            </div>
          )}
          {/* Render Auth UI only when redirectUrl is set */}
          {redirectUrl && (
            <Auth
              supabaseClient={supabase}
              view="sign_up" // Default view is sign_up
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(var(--foreground))',
                      brandAccent: 'rgb(var(--foreground))',
                      brandButtonText: 'rgb(var(--background))',
                      defaultButtonBackground: 'rgb(var(--foreground))',
                      defaultButtonBackgroundHover: 'rgba(var(--foreground-rgb), 0.9)',
                      defaultButtonBorder: 'rgb(var(--foreground))',
                      defaultButtonText: 'rgb(var(--background))',
                      dividerBackground: 'rgb(var(--foreground) / 0.1)',
                      inputBackground: 'transparent',
                      inputBorder: 'rgb(var(--foreground) / 0.1)',
                      inputBorderFocus: 'rgb(var(--foreground) / 0.5)',
                      inputBorderHover: 'rgb(var(--foreground) / 0.2)',
                      inputPlaceholder: 'rgb(var(--foreground) / 0.3)',
                      inputText: 'rgb(var(--foreground))',
                      anchorTextColor: 'rgb(var(--foreground) / 0.7)',
                      anchorTextHoverColor: 'rgb(var(--foreground))',
                    },
                    space: {
                      buttonPadding: '12px 24px',
                      inputPadding: '12px 16px',
                      socialAuthSpacing: '8px',
                      labelBottomMargin: '8px',
                      anchorBottomMargin: '16px',
                      emailInputSpacing: '8px',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '9999px',
                      buttonBorderRadius: '9999px',
                      inputBorderRadius: '9999px',
                    },
                    fonts: { // Explicitly set fonts
                      bodyFontFamily: `var(--font-sans)`,
                      buttonFontFamily: `var(--font-sans)`,
                      inputFontFamily: `var(--font-sans)`,
                      labelFontFamily: `var(--font-sans)`,
                    },
                    fontSizes: { // Consistent font sizes
                       baseBodySize: '14px',
                       baseInputSize: '14px',
                       baseLabelSize: '12px',
                       baseButtonSize: '14px',
                    }
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'font-medium text-sm h-12 transition-opacity hover:opacity-90',
                  label: 'text-xs text-foreground/70 lowercase',
                  input: 'h-12 text-base bg-transparent border-foreground/10 focus-visible:border-foreground/50 transition-colors placeholder:text-foreground/30 lowercase',
                  loader: 'text-foreground/70',
                  anchor: 'text-sm text-foreground/70 hover:text-foreground transition-colors lowercase',
                  divider: 'bg-foreground/10',
                  message: 'text-sm text-foreground/90 bg-foreground/5 p-3 rounded-full text-center lowercase'
                },
              }}
              localization={{
                variables: {
                  sign_up: {
                    email_label: 'email',
                    password_label: 'password',
                    button_label: 'sign up',
                    loading_button_label: 'signing up...',
                    social_provider_text: 'sign up with {{provider}}',
                    link_text: 'already have an account? sign in', // Link back to sign in
                  },
                  // Only include sign_up variables
                },
              }}
              providers={['google']}
              redirectTo={redirectUrl}
              showLinks={true} // Show the link back to sign in
              theme={resolvedTheme === 'dark' ? 'dark' : 'default'}
              socialLayout="vertical"
            />
          )}
          {/* Explicit link to Sign In page is handled by Auth UI's link_text above */}
        </div>
      </div>
    </main>
  );
} 
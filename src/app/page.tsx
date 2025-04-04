'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // If logged in, redirect to the home page
      router.replace('/home');
    }
  }, [user, loading, router]);

  if (loading) {
    // Show a loading state while checking auth
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    // User is logged in but redirect hasn't happened yet, render null or loading
    return null; 
  }

  // If not loading and not logged in, show the landing page
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-muted via-background to-muted p-24">
      <div className="flex flex-col items-center space-y-8 text-center">
        <h1 className="text-5xl font-serif font-medium lowercase tracking-tight text-foreground">
          sage
        </h1>
        <p className="text-muted-foreground max-w-sm">
          your companion for uncovering the patterns within. reflect, understand,
          and grow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
          <Button asChild className="w-full lowercase" size="lg">
            {/* New users typically start onboarding */}
            <Link href="/onboarding/1">new user</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full lowercase"
            size="lg"
          >
            {/* Direct returning users to sign in */}
            <Link href="/auth/signin">returning user</Link>
          </Button>
        </div>
      </div>
    </main>
  );
} 
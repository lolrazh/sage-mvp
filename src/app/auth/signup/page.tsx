"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chrome } from 'lucide-react';

// TODO: Implement actual sign-up logic (e.g., using Supabase auth helpers)

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg bg-card text-card-foreground">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            create your account
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            start your journey with us
          </p>
        </div>

        {/* Google Sign Up */}
        <Button variant="outline" className="w-full">
          <Chrome className="mr-2 h-4 w-4" /> 
          sign up with google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form className="space-y-6">
          <div className="grid gap-2">
            <Input
              id="email"
              placeholder="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="bg-transparent border border-foreground/30 rounded-full px-6 h-12 text-base focus-visible:ring-1 focus-visible:ring-foreground/50 placeholder:text-foreground/50"
            />
          </div>
          <div className="grid gap-2">
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              autoCorrect="off"
              className="bg-transparent border border-foreground/30 rounded-full px-6 h-12 text-base focus-visible:ring-1 focus-visible:ring-foreground/50 placeholder:text-foreground/50"
            />
          </div>
          {/* Optional: Add Confirm Password field here */}
          <Button type="submit" className="w-full">
            sign up
          </Button>
        </form>

        {/* Links */}
        <div className="flex justify-center items-center text-sm">
          <Link href="/auth/signin" className="text-muted-foreground transition-opacity hover:opacity-70">
            already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
} 
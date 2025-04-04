"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label"; // Removed as placeholder might be enough
import { Chrome } from 'lucide-react';

// TODO: Implement actual sign-in logic (e.g., using Supabase auth helpers)

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg bg-card text-card-foreground">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            welcome back
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            sign in to continue your journey
          </p>
        </div>

        {/* Google Sign In */}
        <Button variant="outline" className="w-full">
          <Chrome className="mr-2 h-4 w-4" /> 
          sign in with google
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
            {/* <Label htmlFor="email" className="sr-only">Email</Label> */}
            <Input
              id="email"
              placeholder="email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              // disabled={isLoading} // Add loading state handling
              className="bg-transparent border border-foreground/30 rounded-full px-6 h-12 text-base focus-visible:ring-1 focus-visible:ring-foreground/50 placeholder:text-foreground/50"
            />
          </div>
          <div className="grid gap-2">
            {/* <Label htmlFor="password" className="sr-only">Password</Label> */}
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              // disabled={isLoading} // Add loading state handling
              className="bg-transparent border border-foreground/30 rounded-full px-6 h-12 text-base focus-visible:ring-1 focus-visible:ring-foreground/50 placeholder:text-foreground/50"
            />
          </div>
          <Button type="submit" className="w-full" >
            {/* Add loading spinner support */}
            sign in
          </Button>
        </form>

        {/* Links */}
        <div className="flex justify-between items-center text-sm">
           <Link href="/auth/forgot-password" className="text-muted-foreground transition-opacity hover:opacity-70">
            forgot password?
          </Link> {/* TODO: Create forgot password page */}
           <Link href="/auth/signup" className="text-muted-foreground transition-opacity hover:opacity-70">
            don't have an account?
          </Link> {/* Updated link */}
        </div>
      </div>
    </div>
  );
} 
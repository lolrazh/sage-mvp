"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Noise } from "@/components/ui/noise";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

// TODO: Implement actual sign-up logic (e.g., using Supabase auth helpers)

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implement actual sign-up logic here
      console.log("Signing up with:", email, password);
      router.push("/onboarding");
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // TODO: Implement Google sign-up logic
      router.push("/onboarding");
    } catch (error) {
      console.error("Google sign up error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Noise />
      <div className="flex items-center justify-center min-h-screen p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="relative border border-foreground/10 bg-foreground/[0.02] rounded-[32px] p-8 space-y-8 hover:bg-foreground/[0.03] transition-all">
            {/* Logo/Icon */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-foreground/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground/70" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
                <path d="M12 7v4l2 2" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              </svg>
            </div>

            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                create your account
              </h1>
              <p className="text-sm text-muted-foreground">
                start your journey with sage
              </p>
            </div>

            {/* Google Sign Up */}
            <div>
              <Button variant="outline" className="w-full" onClick={handleGoogleSignUp} type="button">
                <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                sign up with google
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-foreground/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="relative px-2 text-muted-foreground" style={{ backgroundColor: 'var(--card-solid)' }}>
                    or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Input
                  id="email"
                  placeholder="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                  className="bg-transparent border border-foreground/30 rounded-full px-6 h-12 text-base focus-visible:ring-1 focus-visible:ring-foreground/50 placeholder:text-foreground/50"
                />
                <Input
                  id="password"
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoCapitalize="none"
                  autoComplete="new-password"
                  required
                  className="bg-transparent border border-foreground/30 rounded-full px-6 h-12 text-base focus-visible:ring-1 focus-visible:ring-foreground/50 placeholder:text-foreground/50"
                />
              </div>
              <Button type="submit" className="w-full">
                sign up
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="pt-4 text-center">
              <Link 
                href="/auth/signin" 
                className="text-sm text-muted-foreground transition-opacity hover:opacity-70"
              >
                already have an account?
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 
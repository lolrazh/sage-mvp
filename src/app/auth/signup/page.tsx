"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Noise } from "@/components/ui/noise";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Chrome } from "lucide-react";

// TODO: Implement actual sign-up logic (e.g., using Supabase auth helpers)

export default function SignUpPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign-up logic
    router.push('/onboarding');
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
              <Button variant="outline" className="w-full" onClick={() => {}}>
                <Chrome className="mr-2 h-4 w-4" />
                sign up with google
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-foreground/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
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
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  className="bg-transparent border border-foreground/30 rounded-full px-6 h-12 text-base focus-visible:ring-1 focus-visible:ring-foreground/50 placeholder:text-foreground/50"
                />
                <Input
                  id="password"
                  placeholder="password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
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
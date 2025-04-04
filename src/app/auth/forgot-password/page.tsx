"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Noise } from "@/components/ui/noise";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    // Show success message and redirect to sign-in
    router.push('/auth/signin');
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
                reset your password
              </h1>
              <p className="text-sm text-muted-foreground">
                we'll send you instructions via email
              </p>
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
              </div>
              <Button type="submit" className="w-full">
                send reset link
              </Button>
            </form>

            {/* Back to sign in */}
            <div className="pt-4 text-center">
              <Link 
                href="/auth/signin" 
                className="text-sm text-muted-foreground transition-opacity hover:opacity-70"
              >
                back to sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 
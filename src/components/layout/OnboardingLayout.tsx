"use client";

import { Progress } from "@/components/ui/progress";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step: number;
  title: string;
  subtitle: string;
}

const TOTAL_STEPS = 6;

export function OnboardingLayout({
  children,
  step,
  title,
  subtitle,
}: OnboardingLayoutProps) {
  return (
    <main className="min-h-screen relative">
      {/* Fixed progress bar */}
      <div className="fixed top-24 left-0 right-0 px-6">
        <div className="max-w-md mx-auto">
          <Progress value={(step / TOTAL_STEPS) * 100} className="h-[2px] bg-[#333333]/10" />
        </div>
      </div>

      {/* Content container */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-1">
              <h1 className="text-[32px] font-serif font-medium tracking-[-0.03em]">{title}</h1>
              <p className="text-sm text-[#333333]/80">{subtitle}</p>
            </div>

            {/* Content */}
            {children}
          </div>
        </div>
      </div>
    </main>
  );
} 
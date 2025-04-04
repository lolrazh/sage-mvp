"use client";

import { Progress } from "@/components/ui/progress";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step: number;
  title: string;
  subtitle: string;
}

const TOTAL_STEPS = 7;

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
          <div className="flex flex-col items-center space-y-4">
            <Progress value={(step / TOTAL_STEPS) * 100} className="h-1 bg-foreground/10" />
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-serif lowercase tracking-tight">{title}</h1>
              <p className="text-sm text-foreground/80">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content container */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-1">
              <h1 className="text-[40px] font-serif font-medium tracking-[-0.03em] leading-tight">{title}</h1>
              <p className="text-sm text-[#333333]/80">{subtitle}</p>
            </div>

            {/* Content */}
            <div className="min-h-[300px] flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
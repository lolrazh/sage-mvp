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
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto h-[70vh] flex flex-col">
        {/* Progress */}
        <div className="mb-16">
          <Progress value={(step / TOTAL_STEPS) * 100} className="h-[1px] bg-[#1C1B1F]/10" />
        </div>

        {/* Header */}
        <div className="space-y-1 mb-12 text-center">
          <h1 className="text-[28px] font-serif tracking-[-0.03em]">{title}</h1>
          <p className="text-sm text-[#1C1B1F]/60">{subtitle}</p>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </main>
  );
} 
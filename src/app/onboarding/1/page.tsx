"use client";

import { Button } from "@/components/ui/button";
import { AnimatedInput } from "@/components/ui/AnimatedInput";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingName() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();

  const handleNext = () => {
    completeStep("name");
    router.push("/onboarding/2");
  };

  return (
    <OnboardingLayout
      step={1}
      title="what can i call you?"
      subtitle="this is the start of something meaningful"
    >
      {/* Input */}
      <div className="space-y-10">
        <AnimatedInput
          type="text"
          value={stepData.name}
          onChange={(e) => setStepData("name", e.target.value)}
          placeholder="your name"
          className="text-center text-2xl py-8 tracking-wide"
          autoFocus
        />

        {/* Navigation */}
        <div className="flex justify-center gap-6">
          <Button 
            asChild 
            variant="ghost" 
            size="lg" 
            className="w-32 transition-opacity hover:opacity-70"
          >
            <Link href="/">back</Link>
          </Button>
          <Button 
            size="lg" 
            className="w-32 transition-all duration-300"
            disabled={!stepData.name.trim()}
            onClick={handleNext}
          >
            next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
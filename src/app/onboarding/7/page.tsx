"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";

export default function OnboardingReflection() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();
  const [reflection, setReflection] = useState(stepData.reflection || "");

  const handleNext = () => {
    setStepData("reflection", reflection);
    completeStep("reflection");
    router.push("/chat");
  };

  return (
    <OnboardingLayout
      step={7}
      title="one last thing"
      subtitle="what's something you've recently wished you could understand better about yourself?"
    >
      <div className="space-y-10">
        <div className="relative">
          <Textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="take your time with this one..."
            className="min-h-[200px] resize-none bg-background/50 backdrop-blur-sm border-foreground/10 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all rounded-lg"
            autoFocus
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6">
          <Button 
            asChild 
            variant="ghost" 
            size="lg" 
            className="w-32 transition-opacity hover:opacity-70"
          >
            <Link href="/onboarding/6">back</Link>
          </Button>
          <Button 
            size="lg"
            className="w-32 transition-all duration-300"
            disabled={!reflection.trim()}
            onClick={handleNext}
          >
            begin
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
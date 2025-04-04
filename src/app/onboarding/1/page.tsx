"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function OnboardingName() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();
  const [name, setName] = useState(stepData.name || "");

  const handleNext = () => {
    setStepData("name", name);
    completeStep("name");
    router.push("/onboarding/2");
  };

  return (
    <OnboardingLayout
      step={1}
      title="what can i call you?"
      subtitle="this is the start of something meaningful"
    >
      <div className="space-y-12">
        <div className="w-full max-w-[280px] mx-auto">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) {
                handleNext();
              }
            }}
            className="bg-transparent border border-foreground/50 rounded-full px-4 h-12 text-base focus-visible:ring-0 placeholder:text-foreground/30 text-center"
            placeholder="type your name"
            autoFocus
          />
        </div>

        <div className="flex justify-center gap-6 pt-4">
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
            disabled={!name.trim()}
            onClick={handleNext}
          >
            next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
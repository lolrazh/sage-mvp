"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
            className="bg-transparent border rounded-full px-4 h-12 text-base focus-visible:ring-0 placeholder:text-[#333333]/30 text-center"
            placeholder="type your name"
            autoFocus
          />
        </div>

        <div className="flex justify-center gap-3">
          <Button 
            variant="ghost" 
            size="default"
            onClick={() => router.push("/")}
            className="font-medium min-w-[80px]"
          >
            <span>back</span>
          </Button>
          <Button 
            size="default"
            disabled={!name.trim()}
            onClick={handleNext}
            className="font-medium min-w-[80px] bg-[#333333] hover:bg-[#333333]/90"
          >
            next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
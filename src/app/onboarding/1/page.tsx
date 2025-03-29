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
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center -mt-12">
          <div className="w-full max-w-[280px]">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent border-b border-t-0 border-x-0 rounded-none px-0 h-12 text-base focus-visible:ring-0 placeholder:text-foreground/30 text-center"
              placeholder="type your name"
              autoFocus
            />
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => router.push("/")}
            className="text-xs font-normal"
          >
            back
          </Button>
          <Button 
            size="sm"
            disabled={!name.trim()}
            onClick={handleNext}
            className="text-xs font-normal bg-[#1C1B1F] text-white hover:opacity-90"
          >
            next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
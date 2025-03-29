"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function OnboardingFirstEntry() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();
  const [entry, setEntry] = useState(stepData.firstEntry || "");

  const handleNext = () => {
    setStepData("firstEntry", entry);
    completeStep("firstEntry");
    router.push("/journal");
  };

  return (
    <OnboardingLayout
      step={6}
      title="let's write your first entry"
      subtitle="start your journey with a simple reflection"
    >
      <div className="space-y-10">
        <div className="relative">
          <Textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="type anything that comes to mind..."
            className="min-h-[200px] resize-none bg-background/50 backdrop-blur-sm border-foreground/10 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all rounded-lg"
            autoFocus
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {entry.length} characters
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6 pt-4">
          <Button 
            asChild 
            variant="ghost" 
            size="lg" 
            className="w-32 transition-opacity hover:opacity-70"
          >
            <Link href="/onboarding/5">back</Link>
          </Button>
          <Button 
            size="lg"
            className="w-32 transition-all duration-300"
            disabled={!entry.trim()}
            onClick={handleNext}
          >
            begin
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
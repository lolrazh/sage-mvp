"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

  const prompts = [
    "what's on your mind right now?",
    "how are you feeling in this moment?",
    "what brought you to start journaling today?",
  ];

  const [currentPrompt, setCurrentPrompt] = useState(0);

  const cyclePrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % prompts.length);
  };

  return (
    <OnboardingLayout
      step={6}
      title="let's write your first entry"
      subtitle="start your journey with a simple reflection"
    >
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <motion.p
            key={currentPrompt}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-muted-foreground text-sm cursor-pointer"
            onClick={cyclePrompt}
          >
            {prompts[currentPrompt]}
          </motion.p>
          <div className="relative">
            <Textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="type anything that comes to mind..."
              className="min-h-[200px] resize-none bg-background/50 backdrop-blur-sm border-foreground/10 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all rounded-lg"
              autoFocus
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: entry.length > 0 ? 1 : 0 }}
              className="absolute bottom-3 right-3 text-xs text-muted-foreground"
            >
              {entry.length} characters
            </motion.div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 pt-6">
          <Button 
            asChild 
            variant="ghost" 
            size="sm"
          >
            <Link href="/onboarding/5">back</Link>
          </Button>
          <Button 
            size="sm"
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
"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Sparkles, Repeat, Heart } from "lucide-react";

const aspirations = [
  {
    id: "meaning",
    label: "discovering deeper meaning",
    description: "understanding your place in the bigger picture",
    icon: Search,
    gradient: "from-violet-500/5 to-purple-500/5"
  },
  {
    id: "clarity",
    label: "gaining clarity",
    description: "seeing through the noise to what truly matters",
    icon: Sparkles,
    gradient: "from-blue-500/5 to-cyan-500/5"
  },
  {
    id: "patterns",
    label: "breaking old patterns",
    description: "transforming habits that no longer serve you",
    icon: Repeat,
    gradient: "from-amber-500/5 to-orange-500/5"
  },
  {
    id: "wellbeing",
    label: "improving emotional well-being",
    description: "cultivating inner peace and resilience",
    icon: Heart,
    gradient: "from-rose-500/5 to-pink-500/5"
  }
];

export default function OnboardingAspirations() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();
  const selectedAspirations = stepData.aspirations as string[] || [];

  const handleSelect = (id: string) => {
    const newSelection = selectedAspirations.includes(id)
      ? selectedAspirations.filter(item => item !== id)
      : [...selectedAspirations, id];
    setStepData("aspirations", newSelection);
  };

  const handleNext = () => {
    completeStep("aspirations");
    router.push("/onboarding/6");
  };

  return (
    <OnboardingLayout
      step={5}
      title="what's most important to you right now?"
      subtitle="select all that resonate with your current journey"
    >
      <div className="flex-1 flex flex-col justify-between">
        {/* Aspiration cards */}
        <div className="grid grid-cols-1 gap-3">
          {aspirations.map(({ id, label, description, icon: Icon }) => {
            const isSelected = selectedAspirations.includes(id);
            return (
              <Button
                key={id}
                onClick={() => handleSelect(id)}
                variant={isSelected ? "selected" : "outline"}
                className="flex items-start gap-4 h-auto p-4 text-left"
              >
                <div className={`
                  p-2 rounded-lg 
                  ${isSelected 
                    ? "bg-background/10" 
                    : "bg-foreground/5"}
                `}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{label}</div>
                  <div className={`text-xs ${
                    isSelected 
                      ? "text-background/70" 
                      : "text-muted-foreground"
                  }`}>
                    {description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4 pt-6">
          <Button 
            asChild 
            variant="ghost" 
            size="sm"
          >
            <Link href="/onboarding/4">back</Link>
          </Button>
          <Button 
            size="sm"
            disabled={selectedAspirations.length === 0}
            onClick={handleNext}
          >
            next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
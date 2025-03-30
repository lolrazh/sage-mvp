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
    color: "bg-violet-500/10"
  },
  {
    id: "clarity",
    label: "gaining clarity",
    description: "seeing through the noise to what truly matters",
    icon: Sparkles,
    color: "bg-blue-500/10"
  },
  {
    id: "patterns",
    label: "breaking old patterns",
    description: "transforming habits that no longer serve you",
    icon: Repeat,
    color: "bg-amber-500/10"
  },
  {
    id: "wellbeing",
    label: "improving emotional well-being",
    description: "cultivating inner peace and resilience",
    icon: Heart,
    color: "bg-rose-500/10"
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
      {/* Aspiration cards */}
      <div className="flex-1 grid grid-cols-1 gap-3 mb-6">
        {aspirations.map(({ id, label, description, icon: Icon, color }) => {
          const isSelected = selectedAspirations.includes(id);
          return (
            <motion.button
              key={id}
              onClick={() => handleSelect(id)}
              className={`
                relative p-4 rounded-full text-left transition-colors ${color}
                ${isSelected ? "border border-[#333333]/50" : ""}
                hover:scale-[1.01] active:scale-[0.99]
                cursor-pointer
              `}
              initial={false}
            >
              <div className="flex items-center gap-4 pl-2">
                <Icon className="w-4 h-4 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm truncate">{label}</div>
                  <div className="text-xs text-[#333333]/70 truncate">{description}</div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-6">
        <Button 
          asChild 
          variant="ghost" 
          size="lg" 
          className="w-32 transition-opacity hover:opacity-70"
        >
          <Link href="/onboarding/4">back</Link>
        </Button>
        <Button 
          size="lg" 
          className="w-32 transition-all duration-300"
          disabled={selectedAspirations.length === 0}
          onClick={handleNext}
        >
          next
        </Button>
      </div>
    </OnboardingLayout>
  );
} 
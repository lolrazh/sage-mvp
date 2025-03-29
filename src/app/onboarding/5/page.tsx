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
      <div className="space-y-10">
        {/* Aspiration cards */}
        <div className="grid grid-cols-1 gap-3">
          {aspirations.map(({ id, label, description, icon: Icon, color }) => {
            const isSelected = selectedAspirations.includes(id);
            return (
              <motion.button
                key={id}
                onClick={() => handleSelect(id)}
                className={`
                  relative p-4 rounded-full text-left transition-all ${color}
                  ${isSelected ? "border border-[#333333]/50" : "hover:scale-105"}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  y: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-base truncate">{label}</div>
                    <div className="text-sm text-[#333333]/70 truncate">{description}</div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6 pt-4">
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
      </div>
    </OnboardingLayout>
  );
} 
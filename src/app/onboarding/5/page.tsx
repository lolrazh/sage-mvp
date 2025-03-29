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
      <div className="space-y-10">
        {/* Aspiration cards */}
        <div className="grid grid-cols-1 gap-4">
          {aspirations.map(({ id, label, description, icon: Icon, gradient }) => {
            const isSelected = selectedAspirations.includes(id);
            return (
              <motion.button
                key={id}
                onClick={() => handleSelect(id)}
                className={`
                  relative p-6 rounded-xl text-left transition-all
                  ${isSelected 
                    ? "bg-foreground text-background ring-2 ring-foreground" 
                    : `bg-gradient-to-br ${gradient} hover:ring-1 hover:ring-foreground/10`}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`
                    p-2 rounded-lg 
                    ${isSelected 
                      ? "bg-background/10" 
                      : "bg-foreground/5"}
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-base font-medium">{label}</div>
                    <div className={`text-sm ${
                      isSelected 
                        ? "text-background/70" 
                        : "text-muted-foreground"
                    }`}>
                      {description}
                    </div>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    layoutId={`aspiration-selection-${id}`}
                    className="absolute inset-0 rounded-xl bg-foreground -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
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
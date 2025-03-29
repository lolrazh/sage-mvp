"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const cultures = [
  { id: "american", label: "american" },
  { id: "indian", label: "indian" },
  { id: "european", label: "european" },
  { id: "east_asian", label: "east asian" },
  { id: "african", label: "african" },
  { id: "latin", label: "latin american" },
  { id: "middle_eastern", label: "middle eastern" },
  { id: "pacific", label: "pacific islander" },
  { id: "other", label: "other" },
];

export default function OnboardingCulture() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();

  const handleSelect = (id: string) => {
    setStepData("culture", id);
  };

  const handleNext = () => {
    completeStep("culture");
    router.push("/onboarding/3");
  };

  return (
    <OnboardingLayout
      step={2}
      title="which culture do you identify with?"
      subtitle="this helps me understand your perspective better"
    >
      <div className="space-y-10">
        {/* Culture grid */}
        <div className="grid grid-cols-2 gap-3">
          {cultures.map(({ id, label }) => (
            <motion.button
              key={id}
              onClick={() => handleSelect(id)}
              className={`
                relative p-6 rounded-lg text-left transition-colors
                ${stepData.culture === id 
                  ? "bg-foreground text-background" 
                  : "bg-muted/50 hover:bg-muted"}
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selection indicator */}
              {stepData.culture === id && (
                <motion.div
                  layoutId="culture-selection"
                  className="absolute inset-0 rounded-lg bg-foreground -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 text-base">{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6 pt-4">
          <Button 
            asChild 
            variant="ghost" 
            size="lg" 
            className="w-32 transition-opacity hover:opacity-70"
          >
            <Link href="/onboarding/1">back</Link>
          </Button>
          <Button 
            size="lg" 
            className="w-32 transition-all duration-300"
            disabled={!stepData.culture}
            onClick={handleNext}
          >
            next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
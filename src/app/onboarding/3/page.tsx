"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const moods = [
  { id: "calm", label: "calm", color: "bg-blue-500/10" },
  { id: "anxious", label: "anxious", color: "bg-yellow-500/10" },
  { id: "hopeful", label: "hopeful", color: "bg-green-500/10" },
  { id: "tired", label: "tired", color: "bg-purple-500/10" },
  { id: "excited", label: "excited", color: "bg-orange-500/10" },
  { id: "sad", label: "sad", color: "bg-indigo-500/10" },
  { id: "grateful", label: "grateful", color: "bg-pink-500/10" },
  { id: "overwhelmed", label: "overwhelmed", color: "bg-red-500/10" },
  { id: "content", label: "content", color: "bg-teal-500/10" },
  { id: "frustrated", label: "frustrated", color: "bg-rose-500/10" },
];

export default function OnboardingMood() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();
  const selectedMoods = Array.isArray(stepData.mood) ? stepData.mood : [];

  const handleSelect = (id: string) => {
    const newMoods = selectedMoods.includes(id)
      ? selectedMoods.filter(m => m !== id)
      : [...selectedMoods, id];
    setStepData("mood", newMoods);
  };

  const handleNext = () => {
    completeStep("mood");
    router.push("/onboarding/4");
  };

  return (
    <OnboardingLayout
      step={3}
      title="how are you feeling right now?"
      subtitle="choose the words that best describe your current state"
    >
      {/* Mood cloud */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {moods.map(({ id, label, color }) => (
          <motion.button
            key={id}
            onClick={() => handleSelect(id)}
            className={`
              relative p-4 rounded-full text-center transition-colors ${color}
              ${selectedMoods.includes(id) 
                ? "border border-foreground/50" 
                : ""}
              hover:scale-[1.01] active:scale-[0.99]
              cursor-pointer
            `}
            initial={false}
          >
            <span className="text-base block">
              {label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-6">
        <Button 
          asChild 
          variant="ghost" 
          size="lg" 
          className="w-32 transition-opacity hover:opacity-70"
        >
          <Link href="/onboarding/2">back</Link>
        </Button>
        <Button 
          size="lg" 
          className="w-32 transition-all duration-300"
          disabled={selectedMoods.length === 0}
          onClick={handleNext}
        >
          next
        </Button>
      </div>
    </OnboardingLayout>
  );
} 
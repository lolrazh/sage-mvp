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

  const handleSelect = (id: string) => {
    setStepData("mood", id);
  };

  const handleNext = () => {
    completeStep("mood");
    router.push("/onboarding/4");
  };

  return (
    <OnboardingLayout
      step={3}
      title="how are you feeling right now?"
      subtitle="choose one word that best describes your current state"
    >
      <div className="space-y-10">
        {/* Mood cloud */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {moods.map(({ id, label, color }) => (
            <motion.button
              key={id}
              onClick={() => handleSelect(id)}
              className={`
                relative p-4 rounded-full text-center transition-all ${color}
                ${stepData.mood === id 
                  ? "border border-[#333333]/50" 
                  : ""}
                transform hover:scale-[1.02] active:scale-[0.98]
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                y: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <span className="text-base block">
                {label}
              </span>
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
            <Link href="/onboarding/2">back</Link>
          </Button>
          <Button 
            size="lg" 
            className="w-32 transition-all duration-300"
            disabled={!stepData.mood}
            onClick={handleNext}
          >
            next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
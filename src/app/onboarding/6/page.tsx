"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Sparkles, Eye, Palette, Scale } from "lucide-react";

const personalities = [
  {
    id: "sensitive",
    label: "sensitive and thoughtful",
    description: "deeply feeling, introspective, empathetic",
    icon: Heart,
    color: "bg-rose-500/10"
  },
  {
    id: "energetic",
    label: "energetic and outgoing",
    description: "vibrant, social, enthusiastic",
    icon: Sparkles,
    color: "bg-amber-500/10"
  },
  {
    id: "quiet",
    label: "quiet and observant",
    description: "perceptive, mindful, contemplative",
    icon: Eye,
    color: "bg-indigo-500/10"
  },
  {
    id: "creative",
    label: "creative and passionate",
    description: "imaginative, expressive, inspired",
    icon: Palette,
    color: "bg-violet-500/10"
  },
  {
    id: "balanced",
    label: "balanced and practical",
    description: "grounded, rational, steady",
    icon: Scale,
    color: "bg-emerald-500/10"
  }
];

export default function OnboardingPersonality() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();

  const handleSelect = (id: string) => {
    setStepData("selfPerception", id);
  };

  const handleNext = () => {
    completeStep("selfPerception");
    router.push("/onboarding/7");
  };

  return (
    <OnboardingLayout
      step={6}
      title="how would your close friends describe you?"
      subtitle="choose what resonates most with your nature"
    >
      {/* Options Container */}
      <div className="flex-1 grid grid-cols-1 gap-3 mb-6">
        {personalities.map(({ id, label, description, icon: Icon, color }) => (
          <motion.button
            key={id}
            onClick={() => handleSelect(id)}
            className={`
              relative p-4 rounded-full text-left transition-colors ${color}
              ${stepData.selfPerception === id 
                ? "border border-foreground/50" 
                : ""}
              hover:scale-[1.01] active:scale-[0.99]
              cursor-pointer
            `}
            initial={false}
          >
            <div className="flex items-center gap-4 pl-2">
              <Icon className="w-4 h-4 shrink-0" />
              <div className="min-w-0">
                <div className="text-sm truncate">{label}</div>
                <div className="text-xs text-foreground/70 truncate">{description}</div>
              </div>
            </div>
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
          <Link href="/onboarding/5">back</Link>
        </Button>
        <Button 
          size="lg" 
          className="w-32 transition-all duration-300"
          disabled={!stepData.selfPerception}
          onClick={handleNext}
        >
          next
        </Button>
      </div>
    </OnboardingLayout>
  );
} 
"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Moon, Users, Compass, Trees } from "lucide-react";

const environments = [
  {
    id: "cozy",
    label: "cozy evening alone",
    description: "quiet reflection, soft lighting, peaceful solitude",
    icon: Moon,
    color: "bg-indigo-500/10"
  },
  {
    id: "social",
    label: "lively gathering with friends",
    description: "shared laughter, warm connections, social energy",
    icon: Users,
    color: "bg-orange-500/10"
  },
  {
    id: "exploring",
    label: "exploring something new alone",
    description: "curiosity-driven, independent discovery, learning",
    icon: Compass,
    color: "bg-cyan-500/10"
  },
  {
    id: "nature",
    label: "being in nature",
    description: "natural rhythms, open spaces, grounding presence",
    icon: Trees,
    color: "bg-green-500/10"
  }
];

export default function OnboardingEnvironment() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();

  const handleSelect = (id: string) => {
    setStepData("environment", id);
  };

  const handleNext = () => {
    completeStep("environment");
    router.push("/onboarding/5");
  };

  return (
    <OnboardingLayout
      step={4}
      title="where do you feel most like yourself?"
      subtitle="choose the environment that resonates most with you"
    >
      {/* Options Container */}
      <div className="flex-1 grid grid-cols-1 gap-3 mb-6">
        {environments.map(({ id, label, description, icon: Icon, color }) => (
          <motion.button
            key={id}
            onClick={() => handleSelect(id)}
            className={`
              relative p-4 rounded-full text-left transition-colors ${color}
              ${stepData.environment === id 
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
          <Link href="/onboarding/3">back</Link>
        </Button>
        <Button 
          size="lg" 
          className="w-32 transition-all duration-300"
          disabled={!stepData.environment}
          onClick={handleNext}
        >
          next
        </Button>
      </div>
    </OnboardingLayout>
  );
} 
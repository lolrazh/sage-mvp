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
      <div className="space-y-10">
        {/* Environment cards */}
        <div className="grid grid-cols-1 gap-3">
          {environments.map(({ id, label, description, icon: Icon, color }) => (
            <motion.button
              key={id}
              onClick={() => handleSelect(id)}
              className={`
                relative p-4 rounded-full text-left transition-all ${color}
                ${stepData.environment === id 
                  ? "border border-[#333333]/50" 
                  : "hover:scale-105"}
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
      </div>
    </OnboardingLayout>
  );
} 
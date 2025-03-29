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
    gradient: "from-indigo-500/5 to-purple-500/5"
  },
  {
    id: "social",
    label: "lively gathering with friends",
    description: "shared laughter, warm connections, social energy",
    icon: Users,
    gradient: "from-orange-500/5 to-pink-500/5"
  },
  {
    id: "exploring",
    label: "exploring something new alone",
    description: "curiosity-driven, independent discovery, learning",
    icon: Compass,
    gradient: "from-cyan-500/5 to-blue-500/5"
  },
  {
    id: "nature",
    label: "being in nature",
    description: "natural rhythms, open spaces, grounding presence",
    icon: Trees,
    gradient: "from-green-500/5 to-emerald-500/5"
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
        <div className="grid grid-cols-1 gap-4">
          {environments.map(({ id, label, description, icon: Icon, gradient }) => (
            <motion.button
              key={id}
              onClick={() => handleSelect(id)}
              className={`
                relative p-6 rounded-xl text-left transition-all
                ${stepData.environment === id 
                  ? "bg-foreground text-background" 
                  : `bg-gradient-to-br ${gradient} hover:ring-1 hover:ring-foreground/10`}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Selection indicator */}
              {stepData.environment === id && (
                <motion.div
                  layoutId="environment-selection"
                  className="absolute inset-0 rounded-xl bg-foreground -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative z-10 flex items-start gap-4">
                <div className={`
                  p-2 rounded-lg 
                  ${stepData.environment === id 
                    ? "bg-background/10" 
                    : "bg-foreground/5"}
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-medium">{label}</div>
                  <div className={`text-sm ${
                    stepData.environment === id 
                      ? "text-background/70" 
                      : "text-muted-foreground"
                  }`}>
                    {description}
                  </div>
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
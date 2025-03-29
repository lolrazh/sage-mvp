"use client";

import { Button } from "@/components/ui/button";
import { AnimatedInput } from "@/components/ui/AnimatedInput";
import { PageContainer } from "@/components/layout/PageContainer";
import { useOnboardingStore } from "@/lib/store";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function OnboardingName() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();

  const handleNext = () => {
    completeStep("name");
    router.push("/onboarding/2");
  };

  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-12"
        >
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-4xl sm:text-5xl font-serif lowercase">
              what can i call you?
            </h1>
            <p className="text-muted-foreground/70 text-lg">
              this is the start of something meaningful
            </p>
          </div>

          {/* Input */}
          <div className="space-y-8">
            <AnimatedInput
              type="text"
              value={stepData.name}
              onChange={(e) => setStepData("name", e.target.value)}
              placeholder="your name"
              className="text-center text-2xl py-6"
              autoFocus
            />

            {/* Navigation */}
            <div className="flex justify-center gap-4">
              <Button 
                asChild 
                variant="ghost" 
                size="lg" 
                className="w-32"
              >
                <Link href="/">back</Link>
              </Button>
              <Button 
                size="lg" 
                className="w-32"
                disabled={!stepData.name.trim()}
                onClick={handleNext}
              >
                next
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
} 
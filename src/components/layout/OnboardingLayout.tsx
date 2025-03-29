import { motion } from "framer-motion";
import { useOnboardingStore } from "@/lib/store";
import { PageContainer } from "./PageContainer";

const STEPS = ["name", "culture", "mood", "environment", "aspirations", "perception", "reflection"];

interface OnboardingLayoutProps {
  children: React.ReactNode;
  step: number;
  title: string;
  subtitle?: string;
}

export function OnboardingLayout({ 
  children, 
  step,
  title,
  subtitle 
}: OnboardingLayoutProps) {
  const progress = ((step) / (STEPS.length)) * 100;

  return (
    <PageContainer className="bg-gradient-to-b from-background via-background to-muted/20">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted/20">
        <motion.div 
          className="h-full bg-foreground/30 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ 
            scaleX: progress / 100,
            transition: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }
          }}
        />
      </div>

      {/* Step indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-0 right-0 text-center"
      >
        <span className="text-sm text-muted-foreground">
          step {step} of {STEPS.length} – {STEPS[step - 1]}
        </span>
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-[85vh] max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          className="w-full space-y-16"
        >
          {/* Header */}
          <div className="space-y-3 text-center">
            <h1 className="text-4xl sm:text-5xl font-serif tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground/70 text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="space-y-12">
            {children}
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
} 
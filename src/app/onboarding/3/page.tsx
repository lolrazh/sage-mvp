"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const moods = [
  "calm",
  "anxious",
  "hopeful",
  "tired",
  "excited",
  "sad",
  "grateful",
  "overwhelmed",
  "content",
  "frustrated",
];

export default function OnboardingMood() {
  const [selected, setSelected] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center space-y-8 w-full max-w-md"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-serif lowercase tracking-tight text-center"
        >
          how are you feeling right now?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center"
        >
          choose one word that best describes your current state
        </motion.p>
        <div className="w-full space-y-6">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {moods.map((mood) => (
              <motion.div key={mood} variants={item}>
                <Button
                  variant="outline"
                  className={`lowercase h-auto py-4 text-base w-full transition-all duration-200 ${
                    selected === mood 
                      ? "bg-foreground text-background border-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelected(mood)}
                >
                  {mood}
                </Button>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: selected ? 1 : 0 }}
            className="flex justify-center gap-4 w-full"
          >
            <Button asChild variant="ghost" size="lg" className="lowercase w-32">
              <Link href="/onboarding/2">back</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="lowercase w-32"
              disabled={!selected}
            >
              <Link href="/onboarding/4">next</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
} 
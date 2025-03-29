"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const environments = [
  {
    title: "cozy evening alone",
    description: "quiet reflection, soft lighting, peaceful solitude",
  },
  {
    title: "lively gathering with friends",
    description: "shared laughter, warm connections, social energy",
  },
  {
    title: "exploring something new alone",
    description: "curiosity-driven, independent discovery, learning",
  },
  {
    title: "being in nature",
    description: "natural rhythms, open spaces, grounding presence",
  },
];

export default function OnboardingPersonality() {
  const [selected, setSelected] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        className="flex flex-col items-center space-y-8 w-full max-w-2xl"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-serif lowercase tracking-tight text-center"
        >
          which environment makes you feel most like yourself?
        </motion.h1>
        <div className="w-full space-y-8">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {environments.map((env, index) => (
              <motion.div key={env.title} variants={item}>
                <Button
                  variant="outline"
                  className={`flex flex-col items-start w-full h-auto p-6 space-y-2 transition-all duration-200 ${
                    selected === index
                      ? "bg-foreground text-background border-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelected(index)}
                >
                  <span className="text-base lowercase">{env.title}</span>
                  <span className="text-sm opacity-80 text-left lowercase">
                    {env.description}
                  </span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: selected !== null ? 1 : 0 }}
            className="flex justify-center gap-4 w-full"
          >
            <Button asChild variant="ghost" size="lg" className="lowercase w-32">
              <Link href="/onboarding/3">back</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="lowercase w-32"
              disabled={selected === null}
            >
              <Link href="/onboarding/5">next</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
} 
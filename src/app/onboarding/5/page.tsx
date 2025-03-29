"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const aspirations = [
  {
    id: "meaning",
    title: "discovering deeper meaning",
    description: "understanding your place in the bigger picture",
  },
  {
    id: "clarity",
    title: "gaining clarity",
    description: "seeing through the noise to what truly matters",
  },
  {
    id: "patterns",
    title: "breaking old patterns",
    description: "transforming habits that no longer serve you",
  },
  {
    id: "wellbeing",
    title: "improving emotional well-being",
    description: "cultivating inner peace and resilience",
  },
];

export default function OnboardingAspirations() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

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

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
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
          what's most important to you right now?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center"
        >
          select all that resonate with you
        </motion.p>
        <div className="w-full space-y-8">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {aspirations.map((asp) => (
              <motion.div key={asp.id} variants={item}>
                <Button
                  variant="outline"
                  className={`flex flex-col items-start w-full h-auto p-6 space-y-2 transition-all duration-200 ${
                    selected.has(asp.id)
                      ? "bg-foreground text-background border-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => toggleSelection(asp.id)}
                >
                  <span className="text-base lowercase">{asp.title}</span>
                  <span className="text-sm opacity-80 text-left lowercase">
                    {asp.description}
                  </span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: selected.size > 0 ? 1 : 0 }}
            className="flex justify-center gap-4 w-full"
          >
            <Button asChild variant="ghost" size="lg" className="lowercase w-32">
              <Link href="/onboarding/4">back</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="lowercase w-32"
              disabled={selected.size === 0}
            >
              <Link href="/onboarding/6">next</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
} 
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const personalities = [
  {
    id: "sensitive",
    title: "sensitive and thoughtful",
    description: "deeply feeling, considerate of nuances",
  },
  {
    id: "energetic",
    title: "energetic and outgoing",
    description: "naturally enthusiastic, people-oriented",
  },
  {
    id: "quiet",
    title: "quiet and observant",
    description: "carefully watching, processing deeply",
  },
  {
    id: "creative",
    title: "creative and passionate",
    description: "imaginative, driven by inspiration",
  },
  {
    id: "balanced",
    title: "balanced and practical",
    description: "grounded, solution-focused thinking",
  },
];

export default function OnboardingSelfPerception() {
  const [selected, setSelected] = useState<string | null>(null);

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
          how would your close friends describe you?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center"
        >
          choose the description that fits you best
        </motion.p>
        <div className="w-full space-y-8">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-3"
          >
            {personalities.map((personality) => (
              <motion.div key={personality.id} variants={item}>
                <Button
                  variant="outline"
                  className={`flex flex-col items-start w-full h-auto p-6 space-y-2 transition-all duration-200 ${
                    selected === personality.id
                      ? "bg-foreground text-background border-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelected(personality.id)}
                >
                  <span className="text-base lowercase">{personality.title}</span>
                  <span className="text-sm opacity-80 text-left lowercase">
                    {personality.description}
                  </span>
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
              <Link href="/onboarding/5">back</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="lowercase w-32"
              disabled={!selected}
            >
              <Link href="/onboarding/7">next</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
} 
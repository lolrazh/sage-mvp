"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Sun } from "lucide-react";

const greetings = [
  "you're safe here",
  "let's slow down",
  "let it out",
  "take a breath",
  "welcome back",
];

export default function Home() {
  // In a real app, we'd get this from context/store
  const userName = "friend";
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

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
        className="flex flex-col items-center space-y-12 w-full max-w-md"
      >
        <div className="space-y-2 text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-serif lowercase tracking-tight"
          >
            good morning, {userName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground lowercase"
          >
            {greeting}
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full space-y-4"
        >
          <motion.div variants={item}>
            <Button
              asChild
              size="lg"
              className="w-full h-auto py-8 text-lg lowercase space-x-4 transition-all duration-200 hover:scale-[1.02]"
            >
              <Link href="/chat">
                <MessageSquare className="w-5 h-5 opacity-70" />
                <span>drop a thought</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div variants={item}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full h-auto py-8 text-lg lowercase space-x-4 transition-all duration-200 hover:scale-[1.02] hover:bg-muted"
            >
              <Link href="/insight">
                <Sun className="w-5 h-5 opacity-70" />
                <span>today's reflection</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-8"
        >
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground/70 lowercase hover:text-foreground"
          >
            view past reflections
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
} 
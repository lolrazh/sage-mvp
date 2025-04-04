"use client";

import { Button } from "@/components/ui/button";
import { Noise } from "@/components/ui/noise";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const greetings = [
  "you're safe here",
  "let's slow down",
  "let it out",
  "take a breath",
  "welcome back",
];

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const userName = "friend";

  useEffect(() => {
    // Set time-based greeting
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setTimeOfDay("morning");
    else if (hour >= 12 && hour < 17) setTimeOfDay("afternoon");
    else if (hour >= 17 && hour < 22) setTimeOfDay("evening");
    else setTimeOfDay("night");

    // Set random greeting
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <Noise />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center space-y-12 w-full max-w-md"
      >
        <div className="w-12 h-12 rounded-full bg-background border border-foreground/10 flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-foreground/70" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
            <path d="M12 7v4l2 2" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          </svg>
        </div>

        <div className="space-y-2 text-center">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-serif lowercase tracking-tight text-foreground"
          >
            good {timeOfDay}, {userName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-foreground/70 lowercase"
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
                <span>share your thoughts</span>
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
              <Link href="/insights">
                <Sun className="w-5 h-5 opacity-70" />
                <span>find clarity</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
} 
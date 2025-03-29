"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";

export default function OnboardingReflection() {
  const [reflection, setReflection] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReflection(e.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center space-y-8 w-full max-w-xl"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-serif lowercase tracking-tight text-center"
        >
          one last thing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-center max-w-md"
        >
          what's something you've recently wished you could understand better about yourself?
        </motion.p>
        <div className="w-full space-y-8">
          <div className="relative">
            <Textarea
              value={reflection}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isFocused ? "" : "take your time with this one..."}
              className="min-h-[120px] resize-none p-4 text-lg lowercase transition-all duration-200 bg-transparent border-none focus:ring-0 placeholder:text-muted-foreground/50"
            />
            {isFocused && (
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20"
              />
            )}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 w-full"
          >
            <Button asChild variant="ghost" size="lg" className="lowercase w-32">
              <Link href="/onboarding/6">back</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="lowercase w-32"
            >
              <Link href="/home">begin</Link>
            </Button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-muted-foreground/70 text-center italic"
          >
            this helps sage reflect something meaningful back to you tomorrow
          </motion.p>
        </div>
      </motion.div>
    </main>
  );
} 
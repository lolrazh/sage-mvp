"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function OnboardingName() {
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center space-y-8 w-full max-w-xs"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-serif lowercase tracking-tight text-center"
        >
          {!isFocused ? "what can i call you?" : ""}
        </motion.h1>
        <div className="w-full space-y-6">
          <div className="relative">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={isFocused ? "" : "your name"}
              className="text-center lowercase text-2xl py-6 transition-all duration-200 bg-transparent border-none focus:ring-0 placeholder:text-muted-foreground/50"
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
            animate={{ opacity: name.length > 0 ? 1 : 0 }}
            className="flex justify-center gap-4 w-full"
          >
            <Button asChild variant="ghost" size="lg" className="lowercase w-32">
              <Link href="/">back</Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              className="lowercase w-32 transition-opacity duration-200"
              disabled={name.length === 0}
            >
              <Link href="/onboarding/2">next</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
} 
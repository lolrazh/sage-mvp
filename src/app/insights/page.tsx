"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Noise } from "@/components/ui/noise";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// This would come from your backend, incorporating pattern analysis
const todayInsight = {
  pattern: {
    headline: "you tend to reach for control when things feel uncertain",
    context: "this shows up most in your evenings — especially around work and relationships"
  },
  truth: "control gives the illusion of safety — but often creates more anxiety when things don't go your way",
  invitation: "what if today, you trusted — even just a little — instead of trying to control?",
  tags: ["uncertainty", "control", "trust"],
  ctaLabel: "reflect with this insight",
};

const pastInsights = [
  {
    observation: "freedom emerges as a theme in moments of feeling trapped",
    context: "you've mentioned feeling restricted 7 times this week",
    relatedThemes: ["freedom", "constraints", "choice"],
    timestamp: new Date(Date.now() - 86400000),
  },
  {
    observation: "helping others connects to your healing journey",
    context: "your most positive reflections often involve supporting others",
    relatedThemes: ["growth", "connection", "healing"],
    timestamp: new Date(Date.now() - 86400000 * 2),
  },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-foreground">
      <Noise />
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 p-6">
        <Link href="/home" className="inline-flex items-center text-foreground/70 hover:text-foreground">
          <ChevronLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative border border-foreground/10 bg-foreground/[0.02] rounded-[32px] p-8 space-y-10 hover:bg-foreground/[0.03] transition-all"
        >
          {/* Eye Icon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background border border-foreground/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-foreground/70" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          {/* Pattern Reflection */}
          <div className="space-y-3">
            <h1 className="font-serif text-2xl leading-tight text-center">
              {todayInsight.pattern.headline}
            </h1>
            <p className="text-foreground/70 text-center text-sm">
              {todayInsight.pattern.context}
            </p>
          </div>

          {/* Core Truth */}
          <div>
            <div className="border border-foreground/20 bg-foreground/[0.03] rounded-2xl p-4">
              <p className="text-center leading-relaxed text-sm font-medium text-foreground/90">
                {todayInsight.truth}
              </p>
            </div>
          </div>

          {/* Invitation */}
          <div>
            <p className="font-serif text-lg text-center leading-relaxed">
              {todayInsight.invitation}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            {todayInsight.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-foreground/[0.05] rounded-full text-xs text-foreground/80 hover:bg-foreground/[0.08] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            asChild
            className="w-full"
          >
            <Link href="/chat">
              {todayInsight.ctaLabel} →
            </Link>
          </Button>
        </motion.div>

        {/* Divider */}
        <div className="mt-20 mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-foreground/10"></div>
          <h2 className="font-serif text-xl text-center text-foreground">
            past insights
          </h2>
          <div className="h-px flex-1 bg-foreground/10"></div>
        </div>

        {/* Past Insights */}
        <div className="space-y-4">
          {pastInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-foreground/10 bg-foreground/[0.02] rounded-2xl p-6 space-y-3 text-left hover:bg-foreground/[0.03] transition-colors"
            >
              <p className="text-foreground text-sm">
                {insight.observation}
              </p>
              <p className="text-foreground/70 text-sm">
                {insight.context}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {insight.relatedThemes.map((theme) => (
                  <span
                    key={theme}
                    className="px-2 py-0.5 bg-foreground/[0.05] rounded-full text-xs text-foreground/80 hover:bg-foreground/[0.08] transition-colors"
                  >
                    {theme}
                  </span>
                ))}
              </div>
              <p className="text-xs text-foreground/40">
                {insight.timestamp.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric'
                }).toLowerCase()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, ArrowUpRight, Clock } from "lucide-react";

// This would come from your backend, incorporating pattern analysis
const todayInsight = {
  observation: "seeking control appears when uncertainty rises",
  pattern: "this shows up most in your evening reflections, especially around work and relationships",
  reflection: "can you sit with uncertainty today? notice what happens when you don't reach for control",
  relatedThemes: ["uncertainty", "control", "acceptance"],
  timestamp: new Date(),
  strength: "strong", // pattern confidence
};

const pastInsights = [
  {
    observation: "freedom emerges as a theme in moments of feeling trapped",
    pattern: "you've mentioned feeling restricted 7 times this week, each time connecting back to a desire for freedom",
    reflection: "notice what freedom means to you in these moments. what are you truly seeking?",
    relatedThemes: ["freedom", "constraints", "choice"],
    timestamp: new Date(Date.now() - 86400000),
    strength: "strong",
  },
  {
    observation: "helping others connects to your healing journey",
    pattern: "your most positive reflections often involve supporting others through challenges you've overcome",
    reflection: "how has your own growth shaped the way you show up for others?",
    relatedThemes: ["growth", "connection", "healing"],
    timestamp: new Date(Date.now() - 86400000 * 2),
    strength: "emerging",
  },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen p-6 bg-[#F9F1E8]">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-serif font-medium lowercase tracking-tight">
            today's reflection
          </h1>
          <p className="text-sm text-muted-foreground lowercase">
            patterns uncovered from our conversations
          </p>
        </div>

        {/* Today's Insight Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#333333]/5 rounded-3xl p-8 space-y-8"
        >
          {/* Pattern Strength Indicator */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span className="lowercase">{todayInsight.strength} pattern detected</span>
          </div>

          {/* Main Insight Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-2xl font-serif text-center leading-relaxed lowercase">
                {todayInsight.observation}
              </p>
              <p className="text-base text-center text-muted-foreground lowercase leading-relaxed">
                {todayInsight.pattern}
              </p>
            </div>

            <div className="bg-[#333333]/[0.03] rounded-2xl p-6">
              <p className="font-serif text-lg text-center lowercase leading-relaxed">
                {todayInsight.reflection}
              </p>
            </div>

            {/* Related Themes */}
            <div className="flex flex-wrap justify-center gap-2">
              {todayInsight.relatedThemes.map((theme) => (
                <span
                  key={theme}
                  className="px-3 py-1 text-sm bg-[#333333]/[0.03] rounded-full lowercase"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="group lowercase"
            >
              <Link href="/chat" className="space-x-2">
                <span>reflect deeper</span>
                <ArrowRight className="inline-block w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Past Insights Timeline */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif text-center lowercase tracking-tight">
            your journey
          </h2>
          <div className="space-y-4">
            {pastInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#333333]/[0.03] rounded-2xl p-6 space-y-4 hover:bg-[#333333]/[0.05] transition-colors cursor-pointer"
              >
                {/* Pattern Strength */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
                  <span className="lowercase">{insight.strength}</span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <p className="font-serif text-lg lowercase leading-relaxed">
                    {insight.observation}
                  </p>
                  <p className="text-sm text-muted-foreground lowercase leading-relaxed">
                    {insight.pattern}
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="lowercase">
                      {insight.timestamp.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric'
                      }).toLowerCase()}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-70 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 
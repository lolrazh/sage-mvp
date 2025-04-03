"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
    <main className="min-h-screen bg-[#F9F1E8] text-[#333333] selection:bg-[#333333] selection:text-[#F9F1E8]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 p-6">
        <Link href="/chat" className="inline-flex items-center text-[#333333]/70 hover:text-[#333333]">
          <ChevronLeft className="w-5 h-5" />
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#333333]/[0.03] rounded-3xl p-8"
        >
          {/* Pattern Reflection */}
          <div className="space-y-4 mb-12">
            <h1 className="font-serif text-2xl leading-tight text-center">
              {todayInsight.pattern.headline}
            </h1>
            <p className="text-[#333333] font-medium text-center text-sm">
              {todayInsight.pattern.context}
            </p>
          </div>

          {/* Core Truth */}
          <div className="mb-12">
            <div className="bg-[#333333]/[0.02] rounded-2xl p-4">
              <p className="text-center leading-relaxed text-sm">
                {todayInsight.truth}
              </p>
            </div>
          </div>

          {/* Invitation */}
          <div className="mb-8">
            <p className="font-serif text-lg text-center leading-relaxed">
              {todayInsight.invitation}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {todayInsight.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#333333]/[0.03] rounded-full text-xs text-[#333333]/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            asChild
            className="w-full bg-[#333333] text-[#F9F1E8] hover:bg-[#444444]"
          >
            <Link href="/chat">
              {todayInsight.ctaLabel} →
            </Link>
          </Button>
        </motion.div>

        {/* Past Insights Timeline */}
        <section className="mt-20 space-y-8">
          <h2 className="font-serif text-xl text-center text-[#333333]/70">
            your journey
          </h2>
          <div className="space-y-4">
            {pastInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#333333]/[0.03] rounded-2xl p-6 space-y-3 text-left hover:bg-[#333333]/[0.05] transition-colors"
              >
                <p className="text-[#333333] text-sm">
                  {insight.observation}
                </p>
                <p className="text-[#333333]/70 text-sm">
                  {insight.context}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {insight.relatedThemes.map((theme) => (
                    <span
                      key={theme}
                      className="px-2 py-0.5 bg-[#333333]/[0.03] rounded-full text-xs text-[#333333]/70"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#333333]/40">
                  {insight.timestamp.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                  }).toLowerCase()}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 
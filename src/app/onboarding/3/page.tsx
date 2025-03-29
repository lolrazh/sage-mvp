import { Button } from "@/components/ui/button";
import Link from "next/link";

const moods = [
  "calm",
  "anxious",
  "hopeful",
  "tired",
  "excited",
  "sad",
  "grateful",
  "overwhelmed",
  "content",
  "frustrated",
];

export default function OnboardingMood() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center space-y-8 w-full max-w-md">
        <h1 className="text-3xl font-serif lowercase tracking-tight text-center">
          how are you feeling right now?
        </h1>
        <p className="text-muted-foreground text-center">
          choose one word that best describes your current state
        </p>
        <div className="w-full space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood}
                variant="outline"
                className="lowercase h-auto py-4 text-base"
              >
                {mood}
              </Button>
            ))}
          </div>
          <div className="flex justify-center gap-4 w-full">
            <Button asChild variant="ghost" size="lg" className="lowercase w-32">
              <Link href="/onboarding/2">back</Link>
            </Button>
            <Button asChild size="lg" className="lowercase w-32">
              <Link href="/onboarding/4">next</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 
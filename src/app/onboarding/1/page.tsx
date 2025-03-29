import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function OnboardingName() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center space-y-8 w-full max-w-xs">
        <h1 className="text-3xl font-serif lowercase tracking-tight">
          what can i call you?
        </h1>
        <div className="w-full space-y-6">
          <Input
            type="text"
            placeholder="your name"
            className="text-center lowercase"
          />
          <div className="flex justify-between w-full">
            <Button asChild variant="ghost" size="lg" className="lowercase">
              <Link href="/">back</Link>
            </Button>
            <Button asChild size="lg" className="lowercase">
              <Link href="/onboarding/2">next</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 
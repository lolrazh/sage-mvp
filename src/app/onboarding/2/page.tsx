import { Button } from "@/components/ui/button";
import Link from "next/link";

const cultures = [
  "american",
  "indian",
  "european",
  "east asian",
  "african",
  "latin american",
  "middle eastern",
  "pacific islander",
];

export default function OnboardingCulture() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center space-y-8 w-full max-w-md">
        <h1 className="text-3xl font-serif lowercase tracking-tight text-center">
          which culture do you identify with most?
        </h1>
        <div className="w-full space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {cultures.map((culture) => (
              <Button
                key={culture}
                variant="outline"
                className="lowercase h-auto py-4 text-base"
              >
                {culture}
              </Button>
            ))}
            <Button variant="outline" className="lowercase h-auto py-4 text-base">
              other
            </Button>
          </div>
          <div className="flex justify-center gap-4 w-full">
            <Button asChild variant="ghost" size="lg" className="lowercase w-32">
              <Link href="/onboarding/1">back</Link>
            </Button>
            <Button asChild size="lg" className="lowercase w-32">
              <Link href="/onboarding/3">next</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
} 
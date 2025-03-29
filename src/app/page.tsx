import { Button } from "@/components/ui/button"; // Assuming shadcn/ui setup
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-muted via-background to-muted p-24">
      <div className="flex flex-col items-center space-y-8 text-center">
        {/* Simple text logo for now, can be replaced with an SVG later */}
        <h1 className="text-5xl font-serif lowercase tracking-tight text-foreground">
          sage
        </h1>
        <p className="text-muted-foreground max-w-sm">
          your companion for uncovering the patterns within. reflect, understand,
          and grow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
          <Button asChild className="w-full lowercase" size="lg">
            <Link href="/onboarding/1">new user</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full lowercase"
            size="lg"
          >
            {/* Assuming returning users go to /home */}
            <Link href="/home">returning user</Link>
          </Button>
        </div>
      </div>
    </main>
  );
} 
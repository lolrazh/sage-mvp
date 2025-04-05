"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { createBrowserClient } from '@supabase/ssr';
import { useUserStore } from "@/lib/store/user";

export default function OnboardingReflection() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();
  const [reflection, setReflection] = useState(stepData.reflection || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setOnboarded = useUserStore(state => state.setOnboarded);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleNext = async () => {
    setError(null);
    setLoading(true);

    try {
      // Save reflection to store
      setStepData("reflection", reflection);
      completeStep("reflection");

      // Get current user
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (!session?.user) throw new Error('No user session found');

      // Save onboarding data to Supabase
      const { error: saveError } = await supabase
        .from('users')
        .upsert({
          id: session.user.id,
          onboarding_data: stepData
        });

      if (saveError) throw saveError;

      // Mark user as onboarded in local store
      setOnboarded(true);

      // Redirect to chat
      router.push("/chat");
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      setError(error instanceof Error ? error.message : 'Failed to save onboarding data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <OnboardingLayout
      step={7}
      title="one last thing"
      subtitle="what's something you've recently wished you could understand better about yourself?"
    >
      <div className="space-y-10">
        <div className="relative">
          <Textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="take your time with this one..."
            className="min-h-[200px] resize-none bg-background/50 backdrop-blur-sm border-foreground/10 focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all rounded-lg"
            autoFocus
          />
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6">
          <Button 
            asChild 
            variant="ghost" 
            size="lg" 
            className="w-32 transition-opacity hover:opacity-70"
          >
            <Link href="/onboarding/6">back</Link>
          </Button>
          <Button 
            size="lg"
            className="w-32 transition-all duration-300"
            disabled={!reflection.trim() || loading}
            onClick={handleNext}
          >
            {loading ? "saving..." : "begin"}
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
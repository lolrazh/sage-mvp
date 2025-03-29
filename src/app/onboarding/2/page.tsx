"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CountryDropdown, Country } from "@/components/ui/country-dropdown";

export default function OnboardingCulture() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();

  const handleSelect = (country: Country) => {
    setStepData("culture", country.alpha3);
  };

  const handleNext = () => {
    completeStep("culture");
    router.push("/onboarding/3");
  };

  return (
    <OnboardingLayout
      step={2}
      title="where are you from?"
      subtitle="this helps me understand your perspective better"
    >
      <div className="space-y-10">
        <div className="w-full max-w-md mx-auto">
          <CountryDropdown
            onChange={handleSelect}
            defaultValue={stepData.culture}
            placeholder="select your country"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6 pt-4">
          <Button 
            asChild 
            variant="ghost" 
            size="lg" 
            className="w-32 transition-opacity hover:opacity-70"
          >
            <Link href="/onboarding/1">back</Link>
          </Button>
          <Button 
            size="lg" 
            className="w-32 transition-all duration-300"
            disabled={!stepData.culture}
            onClick={handleNext}
          >
            next
          </Button>
        </div>
      </div>
    </OnboardingLayout>
  );
} 
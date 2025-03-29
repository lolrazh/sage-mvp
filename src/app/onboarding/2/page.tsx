"use client";

import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  { value: "us", label: "United States" },
  { value: "in", label: "India" },
  { value: "cn", label: "China" },
  { value: "jp", label: "Japan" },
  { value: "kr", label: "South Korea" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "br", label: "Brazil" },
  { value: "mx", label: "Mexico" },
  { value: "au", label: "Australia" },
  { value: "ca", label: "Canada" },
  { value: "ru", label: "Russia" },
  { value: "za", label: "South Africa" },
  { value: "ng", label: "Nigeria" },
  { value: "eg", label: "Egypt" },
  { value: "sa", label: "Saudi Arabia" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "other", label: "Other" },
];

export default function OnboardingCulture() {
  const router = useRouter();
  const { stepData, setStepData, completeStep } = useOnboardingStore();

  const handleSelect = (value: string) => {
    setStepData("culture", value);
  };

  const handleNext = () => {
    completeStep("culture");
    router.push("/onboarding/3");
  };

  return (
    <OnboardingLayout
      step={2}
      title="which country are you from?"
      subtitle="this helps me understand your perspective better"
    >
      <div className="space-y-10">
        <div className="w-full max-w-md mx-auto">
          <Select onValueChange={handleSelect} value={stepData.culture}>
            <SelectTrigger className="w-full h-14 text-lg">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(({ value, label }) => (
                <SelectItem key={value} value={value} className="text-base">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
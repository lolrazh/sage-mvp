import { create } from "zustand";

export type OnboardingStep = 
  | "name"
  | "culture"
  | "mood"
  | "environment"
  | "aspirations"
  | "firstEntry";

interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  stepData: Record<OnboardingStep, any>;
  setCurrentStep: (step: OnboardingStep) => void;
  completeStep: (step: OnboardingStep) => void;
  setStepData: (step: OnboardingStep, data: any) => void;
  canProceed: (step: OnboardingStep) => boolean;
  reset: () => void;
}

const initialState = {
  currentStep: "name" as OnboardingStep,
  completedSteps: [],
  stepData: {
    name: "",
    culture: "",
    mood: "",
    environment: "",
    aspirations: [],
    firstEntry: "",
  },
};

export const useOnboardingStore = create<OnboardingState>()((set, get) => ({
  ...initialState,

  setCurrentStep: (step) => set({ currentStep: step }),

  completeStep: (step) =>
    set((state) => ({
      completedSteps: [...new Set([...state.completedSteps, step])],
    })),

  setStepData: (step, data) =>
    set((state) => ({
      stepData: {
        ...state.stepData,
        [step]: data,
      },
    })),

  canProceed: (step) => {
    const { stepData } = get();
    switch (step) {
      case "name":
        return Boolean(stepData.name.trim());
      case "culture":
        return Boolean(stepData.culture);
      case "mood":
        return Boolean(stepData.mood);
      case "environment":
        return Boolean(stepData.environment);
      case "aspirations":
        return stepData.aspirations.length > 0;
      case "firstEntry":
        return Boolean(stepData.firstEntry.trim());
      default:
        return false;
    }
  },

  reset: () => set(initialState),
})); 
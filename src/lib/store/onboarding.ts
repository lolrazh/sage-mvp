import { create } from "zustand";

export type OnboardingStep = 
  | "name"
  | "culture"
  | "mood"
  | "environment"
  | "aspirations"
  | "selfPerception"
  | "reflection";

// Define a specific type for the step data
export type OnboardingStepData = {
  name: string;
  culture: string;
  mood: string[];
  environment: string;
  aspirations: string[]; // Use string array based on initialState and usage
  selfPerception: string;
  reflection: string;
};

interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  stepData: OnboardingStepData; // Use the specific type
  setCurrentStep: (step: OnboardingStep) => void;
  completeStep: (step: OnboardingStep) => void;
  // Use a more specific type for data based on possible values
  setStepData: (step: OnboardingStep, data: string | string[]) => void; 
  canProceed: (step: OnboardingStep) => boolean;
  reset: () => void;
}

const initialState: { 
  currentStep: OnboardingStep; 
  completedSteps: OnboardingStep[]; 
  stepData: OnboardingStepData 
} = {
  currentStep: "name",
  completedSteps: [],
  stepData: {
    name: "",
    culture: "",
    mood: [],
    environment: "",
    aspirations: [],
    selfPerception: "",
    reflection: "",
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
        return stepData.mood.length > 0;
      case "environment":
        return Boolean(stepData.environment);
      case "aspirations":
        return stepData.aspirations.length > 0;
      case "selfPerception":
        return Boolean(stepData.selfPerception);
      case "reflection":
        return Boolean(stepData.reflection.trim());
      default:
        return false;
    }
  },

  reset: () => set(initialState),
})); 
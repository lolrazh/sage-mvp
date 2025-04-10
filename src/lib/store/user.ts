import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  name: string;
  culturalBackground: string;
  currentMood: string;
  environment: string;
  aspirations: string[];
  selfPerception: string;
  reflection: string;
}

interface UserState {
  profile: Partial<UserProfile>;
  isOnboarded: boolean;
  preferences: {
    tonePreference: "gentle" | "direct";
    notificationTime: "morning" | "evening" | "none";
    insightFrequency: "daily" | "threeDay" | "weekly";
  };
  setProfile: (profile: Partial<UserProfile>) => void;
  updateProfile: (update: Partial<UserProfile>) => void;
  setOnboarded: (status: boolean) => void;
  updatePreferences: (preferences: Partial<UserState["preferences"]>) => void;
  reset: () => void;
}

const initialState: Pick<UserState, 'profile' | 'isOnboarded' | 'preferences'> = {
  profile: {},
  isOnboarded: false,
  preferences: {
    tonePreference: "gentle",
    notificationTime: "morning",
    insightFrequency: "daily",
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setProfile: (profile) => set({ profile }),
      updateProfile: (update) =>
        set((state) => ({
          profile: { ...state.profile, ...update },
        })),
      setOnboarded: (status) => set({ isOnboarded: status }),
      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),
      reset: () => set(initialState),
    }),
    {
      name: "sage-user-storage",
    }
  )
); 
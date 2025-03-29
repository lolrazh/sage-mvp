import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JournalEntry {
  id: string;
  content: string;
  timestamp: number;
  mood?: string;
  tags?: string[];
}

export interface Insight {
  id: string;
  content: string;
  timestamp: number;
  relatedEntryIds?: string[];
  type: "daily" | "weekly" | "pattern";
  status: "unread" | "read" | "reflected";
}

interface JournalState {
  entries: JournalEntry[];
  insights: Insight[];
  addEntry: (entry: Omit<JournalEntry, "id" | "timestamp">) => void;
  addInsight: (insight: Omit<Insight, "id" | "timestamp">) => void;
  updateEntry: (id: string, update: Partial<JournalEntry>) => void;
  updateInsight: (id: string, update: Partial<Insight>) => void;
  deleteEntry: (id: string) => void;
  deleteInsight: (id: string) => void;
  getEntriesByDateRange: (start: number, end: number) => JournalEntry[];
  getUnreadInsights: () => Insight[];
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],
      insights: [],
      
      addEntry: (entry) => set((state) => ({
        entries: [
          ...state.entries,
          {
            ...entry,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          },
        ],
      })),

      addInsight: (insight) => set((state) => ({
        insights: [
          ...state.insights,
          {
            ...insight,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          },
        ],
      })),

      updateEntry: (id, update) => set((state) => ({
        entries: state.entries.map((entry) =>
          entry.id === id ? { ...entry, ...update } : entry
        ),
      })),

      updateInsight: (id, update) => set((state) => ({
        insights: state.insights.map((insight) =>
          insight.id === id ? { ...insight, ...update } : insight
        ),
      })),

      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id),
      })),

      deleteInsight: (id) => set((state) => ({
        insights: state.insights.filter((insight) => insight.id !== id),
      })),

      getEntriesByDateRange: (start, end) => {
        const state = get();
        return state.entries.filter(
          (entry) => entry.timestamp >= start && entry.timestamp <= end
        );
      },

      getUnreadInsights: () => {
        const state = get();
        return state.insights.filter((insight) => insight.status === "unread");
      },
    }),
    {
      name: "sage-journal-storage",
    }
  )
); 
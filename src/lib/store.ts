import { create } from "zustand";

export type TabMode = "training" | "evaluation" | "ablation" | "compute" | "contamination" | "data";

interface TransparentStore {
  tab: TabMode;
  setTab: (t: TabMode) => void;
  selectedModel: string;
  setSelectedModel: (m: string) => void;
}

export const useTransparentStore = create<TransparentStore>((set) => ({
  tab: "training",
  setTab: (t) => set({ tab: t }),
  selectedModel: "llm-7b",
  setSelectedModel: (m) => set({ selectedModel: m }),
}));

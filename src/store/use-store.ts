import { BACKGROUNDS } from "@/data/backgrounds";
import type { Background } from "@/types/background";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Store {
  selectedBackgroundId: number;
  setSelectedBackgroundId: (id: number) => void;
  getSelectedBackground: (id: number) => Background;
}

export const useStore = create(
  persist<Store>(
    (set) => ({
      selectedBackgroundId: BACKGROUNDS[0].id,
      setSelectedBackgroundId: (id) =>
        set({
          selectedBackgroundId: id,
        }),
      getSelectedBackground: (id) =>
        BACKGROUNDS.find((background) => background.id === id) ||
        BACKGROUNDS[0],
    }),
    {
      name: "retrospective-storage",
    }
  )
);

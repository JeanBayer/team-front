import { BACKGROUNDS } from "@/data/backgrounds";
import type { Background } from "@/types/background";
import { create } from "zustand";

interface Store {
  selectedBackground: Background | undefined;
  setSelectedBackground: (id: number) => void;
}

export const useStore = create<Store>((set) => ({
  selectedBackground: BACKGROUNDS[0],
  setSelectedBackground: (id) =>
    set({
      selectedBackground: BACKGROUNDS.find(
        (background) => background.id === id
      ),
    }),
}));

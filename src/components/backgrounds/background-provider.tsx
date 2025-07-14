import { BACKGROUNDS } from "@/data/backgrounds";
import { useStore } from "@/store/use-store";
import type { PropsWithChildren } from "react";

export const BackgroundProvider = ({ children }: PropsWithChildren) => {
  const selectedBackground = useStore((state) => state.selectedBackground);
  const SelectedBackgroundComponent =
    selectedBackground?.component || BACKGROUNDS[0].component;

  return (
    <>
      <SelectedBackgroundComponent />
      {children}
    </>
  );
};

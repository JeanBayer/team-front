import { useStore } from "@/store/use-store";
import type { PropsWithChildren } from "react";

export const BackgroundProvider = ({ children }: PropsWithChildren) => {
  const getSelectedBackground = useStore(
    (state) => state.getSelectedBackground
  );
  const selectedBackgroundId = useStore((state) => state.selectedBackgroundId);
  const SelectedBackgroundComponent =
    getSelectedBackground(selectedBackgroundId).component;

  return (
    <>
      <SelectedBackgroundComponent />
      {children}
    </>
  );
};

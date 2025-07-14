import type { JSX } from "react";

export type Background = {
  id: number;
  name: string;
  component: () => JSX.Element;
};

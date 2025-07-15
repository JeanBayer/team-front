import { BottomFadeGrid } from "@/components/backgrounds/bottom-fade-grid";
import { MagentaOrbGridLight } from "@/components/backgrounds/magenta-orb-grid-light";
import { PurpleGlowTop } from "@/components/backgrounds/purple-glow-top";
import { TopGradientRadial } from "@/components/backgrounds/top-gradient-radial";
import type { Background } from "@/types/background";

export const BACKGROUNDS: Background[] = [
  {
    id: 1,
    name: "Purple glow top",
    component: PurpleGlowTop,
  },
  {
    id: 2,
    name: "Bottom fade grid",
    component: BottomFadeGrid,
  },
  {
    id: 3,
    name: "Top Gradient Radial",
    component: TopGradientRadial,
  },
  {
    id: 4,
    name: "Magenta orb grid light",
    component: MagentaOrbGridLight,
  },
];

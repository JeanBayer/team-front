import type { IconType } from "@/data/icon-enum";

export interface MenuItem {
  label: string;
  to: string;
  isDisabled?: boolean;
  type?: IconType;
  onClick?: () => void;
}

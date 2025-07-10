export interface MenuItem {
  label: string;
  to: string;
  isDisabled?: boolean;
  type?: "link" | "out";
  onClick?: () => void;
}

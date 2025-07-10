import { Link2, LogOut } from "lucide-react";

type FlexibleIconProps = {
  size?: string | number;
  color?: string;
  className?: string;
  type: "link" | "out";
};

const ICONS = {
  link: Link2,
  out: LogOut,
};

export const FlexibleIcon = ({
  type,
  size,
  color,
  className,
}: FlexibleIconProps) => {
  const SelectedIcon = ICONS[type];
  if (!SelectedIcon) return null;
  return <SelectedIcon size={size} color={color} className={className} />;
};

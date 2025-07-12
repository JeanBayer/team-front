import { ICONS, type IconType } from "@/data/icon-enum";

type FlexibleIconProps = {
  size?: string | number;
  color?: string;
  className?: string;
  type: IconType;
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

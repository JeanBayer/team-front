import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { PropsWithChildren } from "react";

type CustomTooltipProps = {
  label: string;
};

export const CustomTooltip = ({
  children,
  label,
}: PropsWithChildren<CustomTooltipProps>) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

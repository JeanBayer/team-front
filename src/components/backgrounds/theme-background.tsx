import { BACKGROUNDS } from "@/data/backgrounds";
import { useStore } from "@/store/use-store";
import clsx from "clsx";
import { Palette } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ThemeBackground = () => {
  const selectedBackground = useStore((state) => state.selectedBackground);
  const setSelectedBackground = useStore(
    (state) => state.setSelectedBackground
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="relative z-10">
        <Palette size={16} className="cursor-pointer shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        {BACKGROUNDS?.map((background, index) => (
          <React.Fragment key={background.id}>
            <DropdownMenuItem
              className={clsx(
                selectedBackground?.id === background.id &&
                  "border-2 border-blue-200 bg-blue-200"
              )}
            >
              <div
                className="flex justify-between items-center w-full"
                onClick={() => setSelectedBackground(background.id)}
              >
                {background.name}
              </div>
            </DropdownMenuItem>
            {BACKGROUNDS.length - 1 === index ? null : (
              <DropdownMenuSeparator />
            )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

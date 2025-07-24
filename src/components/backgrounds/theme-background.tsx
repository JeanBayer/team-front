import { BACKGROUNDS } from "@/data/backgrounds";
import { useStore } from "@/store/use-store";
import clsx from "clsx";
import { Palette } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ThemeBackground = () => {
  const selectedBackgroundId = useStore((state) => state.selectedBackgroundId);
  const setSelectedBackgroundId = useStore(
    (state) => state.setSelectedBackgroundId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="relative z-10">
        <Button variant="ghost" className="cursor-pointer">
          <Palette size={16} className="cursor-pointer shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        {BACKGROUNDS?.map((background, index) => (
          <React.Fragment key={background.id}>
            <DropdownMenuItem
              className={clsx(
                selectedBackgroundId === background.id &&
                  "border-2 border-blue-200 bg-blue-200"
              )}
            >
              <div
                className="flex justify-between items-center w-full"
                onClick={() => setSelectedBackgroundId(background.id)}
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

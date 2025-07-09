import type { MenuItem } from "@/types/header";
import { EllipsisVertical, Link2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type DropdownMenuProps = {
  menuItems: MenuItem[];
};

export function DropdownMenuHeader({ menuItems }: DropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical size={16} className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        {menuItems?.map((item, index) => (
          <React.Fragment key={item.label}>
            <DropdownMenuItem disabled={item.isDisabled}>
              <Link
                to={item.to}
                className="flex justify-between items-center w-full"
              >
                {item.label}
                <Link2 size={16} />
              </Link>
            </DropdownMenuItem>
            {menuItems.length - 1 === index ? null : <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

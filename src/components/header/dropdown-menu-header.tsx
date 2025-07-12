import type { MenuItem } from "@/types/header";
import { EllipsisVertical } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { FlexibleIcon } from "../icon/flexible-icon";
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
        <EllipsisVertical size={16} className="cursor-pointer shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        {menuItems?.map((item, index) => (
          <React.Fragment key={item.label}>
            <DropdownMenuItem disabled={item.isDisabled}>
              <Link
                to={item.to}
                className="flex justify-between items-center w-full"
                onClick={item?.onClick}
              >
                {item.label}
                <FlexibleIcon size={16} type={item.type || "link"} />
              </Link>
            </DropdownMenuItem>
            {menuItems.length - 1 === index ? null : <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

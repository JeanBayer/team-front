import type { BreadcrumbItemList } from "@/types/breadcrumb";
import { Link } from "react-router";
import {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type CustomBreadCrumbItemProps = {
  breadcrumbList: BreadcrumbItemList;
};

export const CustomBreadCrumbItem = ({
  breadcrumbList,
}: CustomBreadCrumbItemProps) => {
  if (breadcrumbList.type === "item" || !breadcrumbList.type) {
    return (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={breadcrumbList.to}>{breadcrumbList.label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />
      </>
    );
  }

  if (breadcrumbList.type === "dropdown") {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            <BreadcrumbEllipsis className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {breadcrumbList.dropdownItems?.map((item) => (
              <DropdownMenuItem>
                <BreadcrumbLink asChild>
                  <Link to={item.to}>{item.label}</Link>
                </BreadcrumbLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <BreadcrumbSeparator />
      </>
    );
  }

  return null;
};

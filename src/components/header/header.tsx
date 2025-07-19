import type { BreadcrumbItemList } from "@/types/breadcrumb";
import type { MenuItem } from "@/types/header";
import { Fallback } from "../loaders/fallback";
import { Skeleton } from "../ui/skeleton";
import { BreadcrumbHeader } from "./breadcrumb-header";
import { DropdownMenuHeader } from "./dropdown-menu-header";

type HeaderProps = {
  title: string;
  menuItems?: MenuItem[];
  breadcrumbList?: BreadcrumbItemList[];
  breadcrumbPage: string;
  children?: React.ReactNode;
};

export const Header = ({
  title,
  menuItems = [],
  breadcrumbList = [],
  breadcrumbPage,
  children,
}: HeaderProps) => {
  return (
    <header>
      <BreadcrumbHeader
        breadcrumbPage={breadcrumbPage}
        breadcrumbList={breadcrumbList}
      />
      <div className="flex items-center justify-center my-4 gap-4">
        <Fallback
          isLoading={!title}
          loadingComponent={<Skeleton className="w-3xs h-9 rounded-none" />}
        >
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            {title}
          </h1>
        </Fallback>
        {menuItems.length > 0 ? (
          <DropdownMenuHeader menuItems={menuItems} />
        ) : null}
        {children}
      </div>
    </header>
  );
};

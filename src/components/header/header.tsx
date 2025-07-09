import type { BreadcrumbItemList } from "@/types/breadcrumb";
import type { MenuItem } from "@/types/header";
import { BreadcrumbHeader } from "./breadcrumb-header";
import { DropdownMenuHeader } from "./dropdown-menu-header";

type HeaderProps = {
  title: string;
  menuItems?: MenuItem[];
  breadcrumbList?: BreadcrumbItemList[];
  breadcrumbPage: string;
};

export const Header = ({
  title,
  menuItems = [],
  breadcrumbList = [],
  breadcrumbPage,
}: HeaderProps) => {
  return (
    <header className="pt-4">
      <BreadcrumbHeader
        breadcrumbPage={breadcrumbPage}
        breadcrumbList={breadcrumbList}
      />
      <div className="flex items-center justify-center my-4 gap-4">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          {title}
        </h1>
        {menuItems.length > 0 ? (
          <DropdownMenuHeader menuItems={menuItems} />
        ) : null}
      </div>
    </header>
  );
};

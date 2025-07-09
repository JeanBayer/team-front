import type { MenuItem } from "@/types/header";
import { DropdownMenuHeader } from "./dropdown-menu-header";

type HeaderProps = {
  title: string;
  menuItems?: MenuItem[];
};

export const Header = ({ title, menuItems = [] }: HeaderProps) => {
  return (
    <header className="flex items-center justify-center mb-4 gap-4">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        {title}
      </h1>
      {menuItems.length > 0 ? (
        <DropdownMenuHeader menuItems={menuItems} />
      ) : null}
    </header>
  );
};

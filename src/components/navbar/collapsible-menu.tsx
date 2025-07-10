import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { Link, NavLink } from "react-router";

type ListNav = {
  title: {
    to: string;
    text: string;
  };
  options: {
    to: string;
    text: string;
  }[];
};

type CollapsibleMenuProps = {
  listNav: ListNav;
};

export const CollapsibleMenu = ({ listNav }: CollapsibleMenuProps) => {
  const classNameElement =
    "inline-block text-sm w-full p-1 pl-2 rounded-sm border-2 transition-all duration-500";

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem className="list-none">
        <CollapsibleMenuButton
          classNameElement={classNameElement}
          to={listNav.title.to}
          text={listNav.title.text}
        />
        <CollapsibleContent>
          <SidebarMenuSub>
            {listNav?.options?.map((option, index) => (
              <CollapsibleMenuSubItem
                key={index}
                classNameElement={classNameElement}
                to={option.to}
                text={option.text}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

type CollapsibleMenuButtonProps = {
  classNameElement: string;
  to: string;
  text: string;
};

const CollapsibleMenuButton = ({
  classNameElement,
  to,
  text,
}: CollapsibleMenuButtonProps) => {
  return (
    <CollapsibleTrigger asChild>
      <SidebarMenuButton>
        <Link
          to={to}
          className={`${classNameElement} text-lg border-transparent hover:border-blue-200`}
        >
          {text}
        </Link>
        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
      </SidebarMenuButton>
    </CollapsibleTrigger>
  );
};

interface CollapsibleMenuSubItemProps extends CollapsibleMenuButtonProps {}
const CollapsibleMenuSubItem = ({
  classNameElement,
  to,
  text,
}: CollapsibleMenuSubItemProps) => {
  return (
    <SidebarMenuSubItem>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${classNameElement} border-blue-200`
            : `${classNameElement} border-transparent hover:border-blue-200`
        }
        end
      >
        {text}
      </NavLink>
    </SidebarMenuSubItem>
  );
};

import {
  FooterMenu,
  HomeMenu,
  SelectedTeamMenu,
  TeamsMenu,
  ThankYouMenu,
} from "@/components/navbar/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";
import { ShieldUser } from "lucide-react";
import { Link } from "react-router";
import { Fallback } from "../loaders/fallback";
import { AdminConditional } from "../membership/admin-conditional";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export const AppSidebar = () => {
  const { user } = useUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center">
          <Fallback
            isLoading={user.isLoading}
            loadingComponent={<Skeleton className="w-full h-8" />}
          >
            <Link
              to="/user"
              className="flex-1 p-2 hover:underline cursor-pointer transition-all duration-300"
            >
              <h3 className="text-center">{user.data?.name}</h3>
            </Link>
          </Fallback>
          <AdminConditional>
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white dark:bg-blue-600"
            >
              <ShieldUser size={16} />
              Admin
            </Badge>
          </AdminConditional>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <HomeMenu />
        {/* <UsersMenu /> */}
        <TeamsMenu />
        <ThankYouMenu />
        <SelectedTeamMenu />
      </SidebarContent>
      <FooterMenu />
    </Sidebar>
  );
};

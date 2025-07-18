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
import { Fallback } from "../loaders/fallback";
import { AdminConditional } from "../membership/admin-conditional";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export const AppSidebar = () => {
  const userData = useUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center">
          <Fallback
            isLoading={userData.isLoading}
            loadingComponent={<Skeleton className="w-full h-8" />}
          >
            <h3 className="flex-1 text-center p-2">{userData.data?.name}</h3>
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

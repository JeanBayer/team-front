import {
  FooterMenu,
  HomeMenu,
  SelectedTeamMenu,
  TeamsMenu,
  ThankYouMenu,
  UsersMenu,
} from "@/components/navbar/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";

export const AppSidebar = () => {
  const userData = useUser();

  return (
    <Sidebar>
      <SidebarHeader>
        <h3 className="text-center p-2">{userData.data?.name}</h3>
      </SidebarHeader>
      <SidebarContent>
        <HomeMenu />
        <UsersMenu />
        <TeamsMenu />
        <ThankYouMenu />
        <SelectedTeamMenu />
      </SidebarContent>
      <FooterMenu />
    </Sidebar>
  );
};

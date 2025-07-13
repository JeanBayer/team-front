import { CollapsibleMenu } from "@/components/navbar/collapsible-menu";
import {
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  getSelectedTeamNavList,
  getTeamNavList,
  getUserNavList,
} from "@/data/nav-data";
import { deleteAuthData } from "@/helper/extract-data";
import { useTeam } from "@/teams/hooks/use-team";
import { LogOut } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router";

export const HomeMenu = () => {
  const classNameElement =
    "inline-block text-sm w-full p-1 pl-2 rounded-sm border-2 transition-all duration-500";

  return (
    <SidebarMenuItem className="list-none">
      <SidebarMenuButton>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${classNameElement} text-lg border-blue-200 bg-blue-200`
              : `${classNameElement} text-lg border-transparent hover:border-blue-200`
          }
        >
          Home
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const UsersMenu = () => {
  const userNavList = getUserNavList();
  return <CollapsibleMenu listNav={userNavList} />;
};

export const TeamsMenu = () => {
  const teamNavList = getTeamNavList();
  return <CollapsibleMenu listNav={teamNavList} />;
};

export const ThankYouMenu = () => {
  const classNameElement =
    "inline-block text-sm w-full p-1 pl-2 rounded-sm border-2 transition-all duration-500";

  return (
    <SidebarMenuItem className="list-none">
      <SidebarMenuButton>
        <NavLink
          to="/thank-you"
          className={({ isActive }) =>
            isActive
              ? `${classNameElement} text-lg border-blue-200 bg-blue-200`
              : `${classNameElement} text-lg border-transparent hover:border-blue-200`
          }
        >
          Agradecimientos
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const SelectedTeamMenu = () => {
  const { teamId } = useParams();
  const { teamData } = useTeam(teamId);

  if (!teamId || !teamData.data) return null;

  const selectedTeamList = getSelectedTeamNavList(teamId, teamData.data.name);
  return <CollapsibleMenu listNav={selectedTeamList} />;
};

export const FooterMenu = () => {
  const navigate = useNavigate();

  function handleLogout() {
    deleteAuthData();
    navigate("/landing");
  }

  return (
    <SidebarFooter>
      <SidebarMenuItem className="list-none">
        <SidebarMenuButton
          onClick={handleLogout}
          className="flex cursor-pointer text-sm w-full p-2 text-center rounded-sm border-2 border-transparent hover:border-blue-300 bg-blue-300 transition-all duration-500"
        >
          <span className="flex-1">Cerrar sesión</span>
          <LogOut />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarFooter>
  );
};

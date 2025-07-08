import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { deleteAuthData } from "@/helper/extract-data";
import { useUser } from "@/hooks/use-user";
import { ChevronDown, LogOut } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { useTeam } from "./teams/hooks/use-team";

export const HomeLayout = () => {
  return (
    // <div>
    //   <nav>
    //     <Link to="/user">Usuario</Link>
    //     <Link to="/teams">Teams</Link>
    //     <Link to="/thank-you">Agradecimientos</Link>

    //     <button onClick={handleLogout}>Logout</button>
    //   </nav>
    //   <main>

    //   </main>
    // </div>

    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const userData = useUser();
  const navigate = useNavigate();

  function handleLogout() {
    deleteAuthData();
    navigate("/landing");
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <h3 className="text-center p-2">{userData.data?.name}</h3>
      </SidebarHeader>
      <SidebarContent>
        <CollapsibleUsersMenu />
        <CollapsibleTeamsMenu />
        <ThankYouMenu />
      </SidebarContent>
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
    </Sidebar>
  );
};

const CollapsibleTeamsMenu = () => {
  const { teamsData } = useTeam();
  const classNameElement =
    "inline-block text-sm w-full p-1 pl-2 rounded-sm border-2 transition-all duration-500";

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem className="list-none">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                isActive
                  ? `${classNameElement} text-lg border-blue-200 bg-blue-200`
                  : `${classNameElement} text-lg border-transparent hover:border-blue-200`
              }
            >
              Equipos
            </NavLink>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <NavLink
                to="/teams/create"
                className={({ isActive }) =>
                  isActive
                    ? `${classNameElement} border-blue-200`
                    : `${classNameElement} border-transparent hover:border-blue-200`
                }
                end
              >
                Crear equipo
              </NavLink>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <NavLink
                to="/teams/join"
                className={({ isActive }) =>
                  isActive
                    ? `${classNameElement} border-blue-200`
                    : `${classNameElement} border-transparent hover:border-blue-200`
                }
                end
              >
                Unirme a un equipo
              </NavLink>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <NavLink
                to="/teams"
                className={({ isActive }) =>
                  isActive
                    ? `${classNameElement} border-blue-200`
                    : `${classNameElement} border-transparent hover:border-blue-200`
                }
                end
              >
                Listar equipos
              </NavLink>
              {teamsData.data?.map((team) => (
                <SidebarMenuSubItem key={team.id}>
                  <NavLink
                    to={`/teams/${team.id}`}
                    className={({ isActive }) =>
                      isActive
                        ? `${classNameElement} border-blue-200`
                        : `${classNameElement} border-transparent hover:border-blue-200`
                    }
                  >
                    {team.name}
                  </NavLink>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const CollapsibleUsersMenu = () => {
  const classNameElement =
    "inline-block text-sm w-full p-1 pl-2 rounded-sm border-2 transition-all duration-500";

  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem className="list-none">
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <NavLink
              to="/user"
              className={({ isActive }) =>
                isActive
                  ? `${classNameElement} text-lg border-blue-200 bg-blue-200`
                  : `${classNameElement} text-lg border-transparent hover:border-blue-200`
              }
            >
              Usuario
            </NavLink>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <NavLink
                to="/teams/create"
                className={({ isActive }) =>
                  isActive
                    ? `${classNameElement} border-blue-200`
                    : `${classNameElement} border-transparent hover:border-blue-200`
                }
                end
              >
                Crear equipo
              </NavLink>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <NavLink
                to="/teams/join"
                className={({ isActive }) =>
                  isActive
                    ? `${classNameElement} border-blue-200`
                    : `${classNameElement} border-transparent hover:border-blue-200`
                }
                end
              >
                Unirme a un equipo
              </NavLink>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <NavLink
                to="/teams"
                className={({ isActive }) =>
                  isActive
                    ? `${classNameElement} border-blue-200`
                    : `${classNameElement} border-transparent hover:border-blue-200`
                }
                end
              >
                Listar equipos
              </NavLink>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const ThankYouMenu = () => {
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

import { DropdownMenuHeader } from "@/components/header/dropdown-menu-header";
import { Header } from "@/components/header/header";
import { Fallback } from "@/components/loaders/fallback";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICONS_KEYS } from "@/data/icon-enum";
import { useMembershipList } from "@/hooks/use-membership-list";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useMembership } from "@/members/hooks/use-membership";
import { useTeam } from "@/teams/hooks/use-team";
import { ShieldUser, User } from "lucide-react";
import { useParams } from "react-router";
import { TableBodyLoader } from "./components/loaders/table-body-loader";

export const MembersPage = () => {
  const { teamId } = useParams();
  const { memberships } = useMembershipList(teamId);
  const { isAdmin } = useUserIsAdmin(teamId);
  const { teamData } = useTeam(teamId);
  const { promoteToAdmin, demoteToAdmin, memberLeaveUser } =
    useMembership(teamId);

  return (
    <div>
      <Header
        title="Miembros del equipo"
        breadcrumbList={[
          {
            to: "/",
            label: "Home",
          },
          {
            to: "/teams",
            label: "Mis equipos",
          },
          {
            to: `/teams/${teamId}`,
            label: teamData.data?.name || "",
          },
        ]}
        breadcrumbPage="Miembros del equipo"
      />
      <div className="mt-10 p-4 bg-card rounded-xl max-w-2xl mx-auto">
        <Table className="max-w-xl mx-auto bg-card">
          <TableCaption>Lista de miembros</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Sprint winner</TableHead>
              <TableHead className="text-right">Opcion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Fallback
              isLoading={memberships.isLoading}
              loadingComponent={<TableBodyLoader />}
            >
              {memberships.data?.map((membership) => (
                <TableRow key={membership.userId}>
                  <TableCell className="font-medium">
                    {membership.user.name}
                  </TableCell>
                  <TableCell>{membership.user.email}</TableCell>
                  <TableCell className="text-center">
                    {membership.isAdmin ? (
                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600 w-full"
                      >
                        <ShieldUser size={16} />
                        Admin
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-black w-full">
                        <User size={16} />
                        User
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {membership.user.sprintWins}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <DropdownMenuHeader
                        menuItems={[
                          {
                            to: "",
                            label: "Sacar del equipo",
                            type: ICONS_KEYS.DELETE,
                            isDisabled: !isAdmin || memberLeaveUser.isPending,
                            onClick: () =>
                              memberLeaveUser.mutate(membership.userId),
                          },
                          {
                            to: "",
                            label: "Promover a admin",
                            type: ICONS_KEYS.ADMIN,
                            isDisabled:
                              !isAdmin ||
                              membership.isAdmin ||
                              promoteToAdmin.isPending,
                            onClick: () =>
                              promoteToAdmin.mutate(membership.userId),
                          },
                          {
                            to: "",
                            label: "Retirar admin",
                            type: ICONS_KEYS.DEMOTE,
                            isDisabled:
                              !isAdmin ||
                              !membership.isAdmin ||
                              demoteToAdmin.isPending,
                            onClick: () =>
                              demoteToAdmin.mutate(membership.userId),
                          },
                        ]}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </Fallback>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

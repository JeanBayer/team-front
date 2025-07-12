import { Header } from "@/components/header/header";
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
import { useMembershipList } from "@/hooks/use-membership-list";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { ShieldUser, User } from "lucide-react";
import { useParams } from "react-router";
import { useTeam } from "../../hooks/use-team";

export const MembersPage = () => {
  const { teamId } = useParams();
  const { memberships } = useMembershipList(teamId);
  const { isAdmin } = useUserIsAdmin(teamId);
  const { teamData } = useTeam(teamId);

  console.log({ isAdmin });
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
      <div className="py-8">
        <Table className="max-w-xl mx-auto">
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
                      className="bg-blue-500 text-white dark:bg-blue-600"
                    >
                      <ShieldUser size={16} />
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-white">
                      <User size={16} />
                      User
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {membership.user.sprintWins}
                </TableCell>
                <TableCell className="text-right">menu</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

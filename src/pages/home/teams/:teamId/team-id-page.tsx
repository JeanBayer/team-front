import { Header } from "@/components/header/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { Link, useParams } from "react-router";
import { useTeam } from "../hooks/use-team";
import { useLeaveTeam } from "./hooks/use-leave-team";

export const TeamIdPage = () => {
  const { teamId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { handleLeave } = useLeaveTeam();
  const { teamRanking, teamData } = useTeam(teamId);

  if (!teamId) return <div>sin id</div>;

  return (
    <div>
      <Header
        title={teamData.data?.name || ""}
        menuItems={[
          {
            to: "edit",
            label: "Editar",
            isDisabled: !isAdmin,
          },
          {
            to: "",
            label: "Salirse",
            type: "out",
            onClick: () => handleLeave(teamId),
          },
          {
            to: "retrospectives",
            label: "Retros",
          },
          {
            to: "counters",
            label: "Contadores",
          },
          {
            to: "members",
            label: "Miembros",
          },
        ]}
        breadcrumbList={[
          {
            to: "/",
            label: "Home",
          },
          {
            to: "/teams",
            label: "Mis equipos",
          },
        ]}
        breadcrumbPage={teamData.data?.name || ""}
      />

      <div className="flex gap-8 flex-wrap justify-center p-8 max-w-3xl mx-auto">
        <section className="flex flex-wrap gap-4 max-w-sm">
          <Link to="retrospectives" className="inline-block cursor-pointer">
            <Card className="w-32 h-32 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center">
              <CardContent className="">
                <h4 className="text-center text-lg font-semibold text-blue-500">
                  Retros
                </h4>
              </CardContent>
            </Card>
          </Link>

          <Link to="counters" className="inline-block cursor-pointer">
            <Card className="w-32 h-32 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center">
              <CardContent className="">
                <h4 className="text-center text-lg font-semibold text-blue-500">
                  Counters
                </h4>
              </CardContent>
            </Card>
          </Link>

          <Link to="miembros" className="inline-block cursor-pointer">
            <Card className="w-32 h-32 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center">
              <CardContent className="">
                <h4 className="text-center text-lg font-semibold text-blue-500">
                  Miembros
                </h4>
              </CardContent>
            </Card>
          </Link>
        </section>

        <section className="w-2xs">
          <Card className="w-full p-4">
            <CardHeader>
              <CardTitle>Ranking elegido del sprint</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-4">
                {teamRanking.data?.map((user) => (
                  <li key={user.id} className="flex">
                    <span className="flex-1">{user.name}</span>
                    <span>{user.teamSprintWinner}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

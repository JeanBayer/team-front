import { Header } from "@/components/header/header";
import { Card, CardContent } from "@/components/ui/card";
import { ICONS_KEYS } from "@/data/icon-enum";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useLeaveTeam } from "@/teams/:teamId/hooks/use-leave-team";
import { useTeam } from "@/teams/hooks/use-team";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { RankingWinner } from "../components/ranking-winner";

export const TeamIdPage = () => {
  const { teamId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { handleLeave } = useLeaveTeam();
  const { teamData } = useTeam(teamId);
  const [, copy] = useCopyToClipboard();

  if (!teamId) return <div>sin id</div>;

  function handleCopy() {
    copy(`
      id: ${teamId}
      name: ${teamData.data?.name}
      `).then(() =>
      toast.success("Id copiado", {
        richColors: true,
      })
    );
  }

  return (
    <div>
      <div>
        <Header
          title={teamData.data?.name || ""}
          menuItems={
            teamData.isLoading
              ? []
              : [
                  {
                    to: "edit",
                    label: "Editar",
                    isDisabled: !isAdmin,
                  },
                  {
                    to: "",
                    label: "Salirse",
                    type: ICONS_KEYS.OUT,
                    onClick: () => handleLeave(teamId),
                  },
                  {
                    to: "",
                    label: "Compartir",
                    type: ICONS_KEYS.SHARE,
                    onClick: () => handleCopy(),
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
                ]
          }
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
          <section className="flex content-start flex-wrap gap-4 max-w-sm">
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

            <Link to="members" className="inline-block cursor-pointer">
              <Card className="w-32 h-32 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center">
                <CardContent className="">
                  <h4 className="text-center text-lg font-semibold text-blue-500">
                    Miembros
                  </h4>
                </CardContent>
              </Card>
            </Link>
          </section>

          <RankingWinner />
        </div>
      </div>
    </div>
  );
};

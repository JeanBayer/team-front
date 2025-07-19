import { Header } from "@/components/header/header";
import { Fallback } from "@/components/loaders/fallback";
import { CustomTooltip } from "@/components/tooltip/custom-tooltip";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRetro } from "@/retros/hooks/use-retro";
import { useTeam } from "@/teams/hooks/use-team";
import { Link, useParams } from "react-router";
import { RetrosPageLoading } from "./loaders/retros-page-loading";

export const RetrosPage = () => {
  const { teamId } = useParams();
  const { teamData } = useTeam(teamId);
  const { retros } = useRetro(teamId);

  return (
    <div>
      <Header
        title={"Retrospectivas"}
        menuItems={[
          {
            to: "create",
            label: "Crear",
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
          {
            to: `/teams/${teamId}`,
            label: teamData.data?.name || "",
          },
        ]}
        breadcrumbPage="Retrospectivas"
      />

      <section className="flex gap-8 flex-wrap justify-center p-8 max-w-2xl mx-auto">
        <Fallback
          isLoading={retros.isLoading}
          loadingComponent={<RetrosPageLoading />}
        >
          {retros.data?.map(
            ({ id, retrospectiveName, status, sprintWinner }) => (
              <Link
                to={`${id}`}
                className="inline-block cursor-pointer"
                key={id}
              >
                <Card className="w-40 h-40 hover:shadow-lg hover:border-blue-300 transition-all duration-300 gap-4 relative p-0">
                  {status === "CREATED" && (
                    <Badge
                      variant="default"
                      className="text-[8px] absolute top-1 -right-5 z-10"
                    >
                      Abierto
                    </Badge>
                  )}
                  {status === "CLOSED" && (
                    <Badge
                      variant="destructive"
                      className="text-[8px] absolute top-1 -right-5 z-10"
                    >
                      Cerrado
                    </Badge>
                  )}
                  <div className="relative w-full h-full overflow-hidden p-4 flex flex-col">
                    <CardHeader className="flex-1 p-0">
                      <CustomTooltip label={retrospectiveName}>
                        <CardTitle className="text-center text-sm font-semibold text-blue-500 line-clamp-3">
                          {retrospectiveName}
                        </CardTitle>
                      </CustomTooltip>
                    </CardHeader>
                    <CardContent className="p-0">
                      {sprintWinner?.name && (
                        <p className="text-center">
                          <span className="text-xs text-gray-500">
                            Elegido del sprint:{" "}
                          </span>
                          <CustomTooltip label={sprintWinner?.name}>
                            <strong className="text-sm font-semibold line-clamp-1">
                              {sprintWinner?.name}
                            </strong>
                          </CustomTooltip>
                        </p>
                      )}
                    </CardContent>
                  </div>
                </Card>
              </Link>
            )
          )}
        </Fallback>
      </section>
    </div>
  );
};

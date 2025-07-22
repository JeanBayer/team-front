import { Header } from "@/components/header/header";
import { Fallback } from "@/components/loaders/fallback";
import { CustomTooltip } from "@/components/tooltip/custom-tooltip";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounter } from "@/counters/hooks/use-counter";
import { useTeam } from "@/teams/hooks/use-team";
import { Link, useParams } from "react-router";
import { CountersPageLoading } from "./components/loaders/counters-page-loading";

export const CounterPage = () => {
  const { teamId } = useParams();
  const { teamData } = useTeam(teamId);
  const { counters } = useCounter(teamId);

  return (
    <div>
      <Header
        title="Contadores"
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
        breadcrumbPage="Contadores"
      />

      <section className="flex gap-8 flex-wrap justify-center p-8 max-w-2xl mx-auto">
        <Fallback
          isLoading={counters.isLoading}
          loadingComponent={<CountersPageLoading />}
        >
          {counters.data?.map(
            ({ id, name, alreadyModifiedToday, currentCount }) => (
              <Link
                to={`${id}`}
                className="inline-block cursor-pointer"
                key={id}
              >
                <Card className="w-40 h-40 hover:shadow-lg hover:border-blue-300 transition-all duration-300 gap-4 relative p-0">
                  {!alreadyModifiedToday && (
                    <Badge
                      variant="destructive"
                      className="text-[8px] absolute top-1 -right-5"
                    >
                      Pendiente
                    </Badge>
                  )}
                  <div className="relative w-full h-full overflow-hidden p-4 flex flex-col">
                    <CardHeader className="flex-1 p-0">
                      <CustomTooltip label={name}>
                        <CardTitle className="text-center text-sm font-semibold text-blue-500 line-clamp-3">
                          {name}
                        </CardTitle>
                      </CustomTooltip>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-center text-2xl">
                        <strong>{currentCount}</strong>
                      </p>
                    </CardContent>
                    {!alreadyModifiedToday && (
                      <img
                        className="absolute w-16 -bottom-5 -right-5 z-0 rotate-[23deg]"
                        src="/assets/sand-clock.png"
                        alt="sand-clock"
                      />
                    )}
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

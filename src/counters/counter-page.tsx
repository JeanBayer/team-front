import { Header } from "@/components/header/header";
import { CustomTooltip } from "@/components/tooltip/custom-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCounter } from "@/counters/hooks/use-counter";
import { useTeam } from "@/teams/hooks/use-team";
import { Link, useParams } from "react-router";

export const CounterPage = () => {
  const { teamId } = useParams();
  const { teamData } = useTeam(teamId);
  const { counters } = useCounter(teamId);

  return (
    <div>
      <Header
        title={"Contadores"}
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
        {counters.data?.map((counter) => (
          <Link
            to={`${counter.id}`}
            className="inline-block cursor-pointer"
            key={counter.id}
          >
            <Card className="w-44 h-44 hover:shadow-lg hover:border-blue-300 transition-all duration-300 gap-4">
              <CardHeader className="flex-1">
                <CustomTooltip label={counter.name}>
                  <CardTitle className="text-center text-lg font-semibold text-blue-500 line-clamp-3">
                    {counter.name}
                  </CardTitle>
                </CustomTooltip>
              </CardHeader>
              <CardContent>
                <p className="text-center">
                  <strong>{counter.currentCount}</strong>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
};

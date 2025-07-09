import { Header } from "@/components/header/header";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { useTeam } from "./hooks/use-team";

export const TeamsPage = () => {
  const { teamsData } = useTeam();
  return (
    <div>
      <Header
        title="Mis equipos"
        menuItems={[
          {
            to: "/teams/create",
            label: "Crear",
          },
          {
            to: "/teams/join",
            label: "Unirse",
          },
        ]}
      />
      <section className="flex gap-8 flex-wrap justify-center py-8 px-12 max-w-2xl mx-auto">
        {teamsData.data?.map((team) => (
          <Link
            to={`/teams/${team.id}`}
            className="inline-block cursor-pointer"
            key={team.id}
          >
            <Card className="w-64 h-64 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center">
              <CardContent className="">
                <h4 className="text-center text-lg font-semibold text-blue-500">
                  {team.name}
                </h4>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
};

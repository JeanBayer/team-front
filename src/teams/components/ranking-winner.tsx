import { Fallback } from "@/components/loaders/fallback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router";
import { useTeam } from "../hooks/use-team";
import { RankingWinnerLoading } from "./loaders/ranking-winner-loading";

export const RankingWinner = () => {
  const { teamId } = useParams();
  const { teamRanking } = useTeam(teamId);
  return (
    <section className="w-2xs">
      <Card className="w-full p-4 py-8">
        <CardHeader>
          <CardTitle>Ranking elegido del sprint</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-4">
            <Fallback
              isLoading={teamRanking.isLoading}
              loadingComponent={<RankingWinnerLoading />}
            >
              {teamRanking.data?.map((user) => (
                <li key={user.id} className="flex text-sm">
                  <span className="flex-1">{user.name}</span>
                  <span>{user.teamSprintWinner}</span>
                </li>
              ))}
            </Fallback>
          </ol>
        </CardContent>
      </Card>
    </section>
  );
};

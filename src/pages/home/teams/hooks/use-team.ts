import { TeamService } from "@/services/team-service";
import { useQuery } from "@tanstack/react-query";

const MINUTE_IN_MS = 1000 * 60;

export const useTeam = () => {
  const teamQuery = useQuery({
    queryKey: ["TEAMS"],
    queryFn: TeamService.getTeams,
    staleTime: 5 * MINUTE_IN_MS,
  });

  return {
    teamsData: {
      isLoading: teamQuery.isLoading,
      isError: teamQuery.isError,
      data: teamQuery.data,
    },
  };
};

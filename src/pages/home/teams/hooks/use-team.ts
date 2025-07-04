import { TeamService } from "@/services/team-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MINUTE_IN_MS = 1000 * 60;

export const useTeam = (teamId: string = "") => {
  const queryClient = useQueryClient();

  // pm: listar-teams
  const teamQuery = useQuery({
    queryKey: ["TEAMS"],
    queryFn: TeamService.getTeams,
    staleTime: 5 * MINUTE_IN_MS,
  });

  // pm: listar-team
  // TODO:

  // pm: editar-team [ADMIN]
  // TODO:

  // pm: ranking-winner
  const teamRankingQuery = useQuery({
    queryKey: ["TEAMS", teamId, "RANKING"],
    queryFn: () => TeamService.getTeamRanking(teamId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!teamId,
  });

  // pm: crear-team
  const teamCreate = useMutation({
    mutationFn: TeamService.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TEAMS"] });
    },
  });

  return {
    teamsData: {
      isLoading: teamQuery.isLoading,
      isError: teamQuery.isError,
      data: teamQuery.data,
    },
    teamRanking: {
      isLoading: teamRankingQuery.isLoading,
      isError: teamRankingQuery.isError,
      data: teamRankingQuery.data,
    },
    teamCreate: {
      isPending: teamCreate.isPending,
      isSuccess: teamCreate.isSuccess,
      isError: teamCreate.isError,
      mutate: teamCreate.mutate,
    },
  };
};

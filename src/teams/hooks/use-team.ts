import { TeamService } from "@/services/team-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const MINUTE_IN_MS = 1000 * 60;

export const useTeam = (teamId: string = "") => {
  const queryClient = useQueryClient();

  // pm: listar-teams
  const teamsQuery = useQuery({
    queryKey: ["TEAMS"],
    queryFn: TeamService.getTeams,
    staleTime: 5 * MINUTE_IN_MS,
  });

  // pm: listar-team
  const teamQuery = useQuery({
    queryKey: ["TEAMS", teamId],
    queryFn: () => TeamService.getTeam(teamId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!teamId,
  });

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["TEAMS"] }),
    onError: (error) => toast.error(error.message, { richColors: true }),
  });

  return {
    teamsData: {
      isLoading: teamsQuery.isLoading,
      isError: teamsQuery.isError,
      data: teamsQuery.data,
    },
    teamData: {
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

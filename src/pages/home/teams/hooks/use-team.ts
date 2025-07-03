import { MembershipService } from "@/services/membership-service";
import { TeamService } from "@/services/team-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MINUTE_IN_MS = 1000 * 60;

export const useTeam = () => {
  const queryClient = useQueryClient();

  const teamQuery = useQuery({
    queryKey: ["TEAMS"],
    queryFn: TeamService.getTeams,
    staleTime: 5 * MINUTE_IN_MS,
  });

  const teamCreate = useMutation({
    mutationFn: TeamService.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TEAMS"] });
    },
  });

  const teamJoin = useMutation({
    mutationFn: MembershipService.joinTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TEAMS"] });
    },
  });

  const teamLeave = useMutation({
    mutationFn: MembershipService.leaveTeam,
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
    teamCreate: {
      isPending: teamCreate.isPending,
      isSuccess: teamCreate.isSuccess,
      isError: teamCreate.isError,
      mutate: teamCreate.mutate,
    },
    teamJoin: {
      isPending: teamJoin.isPending,
      isSuccess: teamJoin.isSuccess,
      isError: teamJoin.isError,
      mutate: teamJoin.mutate,
    },
    teamLeave: {
      isPending: teamLeave.isPending,
      isSuccess: teamLeave.isSuccess,
      isError: teamLeave.isError,
      mutate: teamLeave.mutate,
    },
  };
};

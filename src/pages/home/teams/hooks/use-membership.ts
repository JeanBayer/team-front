import { MembershipService } from "@/services/membership-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMembership = () => {
  const queryClient = useQueryClient();

  // pm: unirme-team
  const teamJoin = useMutation({
    mutationFn: MembershipService.joinTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TEAMS"] });
    },
  });

  // pm: dejar-team
  const teamLeave = useMutation({
    mutationFn: MembershipService.leaveTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TEAMS"] });
    },
  });

  return {
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

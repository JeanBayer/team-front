import { MembershipService } from "@/services/membership-service";
import { useQuery } from "@tanstack/react-query";

const MINUTE_IN_MS = 1000 * 60;

export const useMembershipList = (teamId: string = "") => {
  // pm: listar-memberships
  const membershipQuery = useQuery({
    queryKey: ["TEAMS", teamId, "MEMBERSHIP-LIST"],
    queryFn: () => MembershipService.getMemberships(teamId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!teamId,
  });

  return {
    memberships: {
      isLoading: membershipQuery.isLoading,
      isError: membershipQuery.isError,
      data: membershipQuery.data,
    },
  };
};

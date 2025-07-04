import { MembershipService } from "@/services/membership-service";
import { useQuery } from "@tanstack/react-query";

const MINUTE_IN_MS = 1000 * 60;

export const useUserIsAdmin = (teamId: string = "") => {
  const verifyData = useQuery({
    queryKey: ["TEAMS", teamId, "MY_MEMBERSHIP"],
    queryFn: () => MembershipService.myMembership(teamId),
    staleTime: 10 * MINUTE_IN_MS,
    enabled: !!teamId,
  });

  return {
    isLoading: verifyData.isLoading,
    isError: verifyData.isError,
    isSuccess: verifyData.isSuccess,
    isAdmin: verifyData.data?.isAdmin,
  };
};

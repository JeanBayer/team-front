import { minute } from "@/helper/time";
import { ThankYouService } from "@/services/thank-you-service";
import { useQuery } from "@tanstack/react-query";

export const useThankYouRetrospective = (
  teamId: string = "",
  retroId: string = ""
) => {
  // pm: listar-thank-you
  const COUNTERS_KEY = [
    "TEAMS",
    teamId,
    "RETROSPECTIVES",
    retroId,
    "THANK-YOU",
  ];
  const thankYouQuery = useQuery({
    queryKey: COUNTERS_KEY,
    queryFn: () =>
      ThankYouService.getThankYousIntoRetrospective(teamId, retroId),
    staleTime: minute(5).toMS(),
    enabled: !!retroId,
  });

  return {
    thankYou: {
      isLoading: thankYouQuery.isLoading,
      isError: thankYouQuery.isError,
      data: thankYouQuery.data,
    },
  };
};

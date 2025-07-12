import { minute } from "@/helper/time";
import { GoalService } from "@/services/goal-service";
import { useQuery } from "@tanstack/react-query";

export const useGoal = (
  teamId: string = "",
  counterId: string = "",
  typeGoals: string = ""
) => {
  const GOALS_KEY = ["TEAMS", teamId, "COUNTER", counterId, "GOALS", typeGoals];
  const goalsQuery = useQuery({
    queryKey: GOALS_KEY,
    queryFn: () => GoalService.getGoals(teamId, counterId, typeGoals),
    staleTime: minute(5).toMS(),
    enabled: !!counterId,
  });

  return {
    goals: {
      isLoading: goalsQuery.isLoading,
      isError: goalsQuery.isError,
      data: goalsQuery.data,
    },
  };
};

import { TYPE_GOALS, type TypeGoals } from "@/data/goal-enum";
import { minute } from "@/helper/time";
import { useHandlerOptimistic } from "@/hooks/use-handler-optimistic";
import { GoalService } from "@/services/goal-service";
import type { CreateGoal, Goal } from "@/types/goal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGoal = (
  teamId: string = "",
  counterId: string = "",
  typeGoals: TypeGoals = TYPE_GOALS.AVAILABLE
) => {
  const GOALS_KEY = ["TEAMS", teamId, "COUNTER", counterId, "GOALS", typeGoals];
  const goalsQuery = useQuery({
    queryKey: GOALS_KEY,
    queryFn: () => GoalService.getGoals(teamId, counterId, typeGoals),
    staleTime: minute(5).toMS(),
    enabled: !!counterId,
  });

  // pm: crear-counter
  const goalCreateOptimistic = useHandlerOptimistic<Goal[], CreateGoal>({
    queryKey: GOALS_KEY,
    onMutate: (mutateData) => (old) =>
      [
        ...old,
        {
          id: "123",
          description: mutateData.description,
          targetDays: mutateData.targetDays,
          achieved: false,
          achievedAt: null,
          counterId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    onSuccess: () => toast.success("Goal creado", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const goalCreate = useMutation({
    mutationFn: (createGoal: CreateGoal) =>
      GoalService.createGoal(teamId, counterId, createGoal),
    onSuccess: goalCreateOptimistic.onSuccess,
    onMutate: goalCreateOptimistic.onMutate,
    onError: goalCreateOptimistic.onError,
    onSettled: goalCreateOptimistic.onSettled,
  });

  return {
    goals: {
      isLoading: goalsQuery.isLoading,
      isError: goalsQuery.isError,
      data: goalsQuery.data,
    },
    goalCreate: {
      isPending: goalCreate.isPending,
      isSuccess: goalCreate.isSuccess,
      isError: goalCreate.isError,
      mutate: goalCreate.mutate,
    },
  };
};

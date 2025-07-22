import { TYPE_GOALS, type TypeGoals } from "@/data/goal-enum";
import { minute } from "@/helper/time";
import { useHandlerOptimistic } from "@/hooks/use-handler-optimistic";
import { GoalService } from "@/services/goal-service";
import type { CreateGoal, Goal, UpdateGoal } from "@/types/goal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGoal = (
  teamId: string = "",
  counterId: string = "",
  typeGoals: TypeGoals = TYPE_GOALS.AVAILABLE
) => {
  const queryClient = useQueryClient();
  const GOALS_KEY = ["TEAMS", teamId, "COUNTER", counterId, "GOALS", typeGoals];
  const goalsQuery = useQuery({
    queryKey: GOALS_KEY,
    queryFn: () => GoalService.getGoals(teamId, counterId, typeGoals),
    staleTime: minute(5).toMS(),
    enabled: !!counterId,
  });

  // pm: crear-goal
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
    onSuccess: () => toast.success("Meta creada", { richColors: true }),
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

  // pm: update-goal
  const goalUpdateOptimistic = useHandlerOptimistic<Goal[], UpdateGoal>({
    queryKey: GOALS_KEY,
    onMutate: (mutateData) => (old) =>
      old.map((goal) => {
        if (goal.id === mutateData.id)
          return {
            ...goal,
            ...mutateData,
          };
        return { ...goal };
      }),
    onSuccess: () =>
      toast.success("Meta actualizada correctamente", { richColors: true }),
    onError: (error) =>
      toast.error(error?.message || "Hubo un error", { richColors: true }),
  });

  const goalUpdate = useMutation({
    mutationFn: (updateGoal: UpdateGoal) =>
      GoalService.updateGoal(teamId, counterId, updateGoal),
    onSuccess: goalUpdateOptimistic.onSuccess,
    onMutate: goalUpdateOptimistic.onMutate,
    onError: goalUpdateOptimistic.onError,
    onSettled: goalUpdateOptimistic.onSettled,
  });

  const goalDeleteOptimistic = useHandlerOptimistic<Goal[], string>({
    queryKey: GOALS_KEY,
    onMutate: (goalId) => (old) => old.filter((goal) => goal.id !== goalId),
    onSuccess: () =>
      toast.success("Meta eliminada correctamente", { richColors: true }),
    onError: (error) =>
      toast.error(error?.message || "Hubo un error", { richColors: true }),
  });

  const goalDelete = useMutation({
    mutationFn: (goalId: string) =>
      GoalService.deleteGoal(teamId, counterId, goalId),
    onSuccess: goalDeleteOptimistic.onSuccess,
    onMutate: goalDeleteOptimistic.onMutate,
    onError: goalDeleteOptimistic.onError,
    onSettled: goalDeleteOptimistic.onSettled,
  });

  const GOALS_KEY_AVAILABLE = [
    "TEAMS",
    teamId,
    "COUNTER",
    counterId,
    "GOALS",
    TYPE_GOALS.AVAILABLE,
  ];

  // pm: clonar-goal
  const goalCloneOptimistic = useHandlerOptimistic<Goal[], string>({
    queryKey: GOALS_KEY_AVAILABLE,
    onMutate: (goalId) => (old) =>
      [...old, { ...old.find((goal) => goal.id === goalId)!, id: "123" }],
    onSuccess: () => toast.success("Meta clonada", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const goalClone = useMutation({
    mutationFn: (goalId: string) =>
      GoalService.cloneGoal(teamId, counterId, goalId),
    onSuccess: goalCloneOptimistic.onSuccess,
    onMutate: goalCloneOptimistic.onMutate,
    onError: goalCloneOptimistic.onError,
    onSettled: goalCloneOptimistic.onSettled,
  });

  const GOALS_KEY_ACHIEVED = [
    "TEAMS",
    teamId,
    "COUNTER",
    counterId,
    "GOALS",
    TYPE_GOALS.ACHIEVED,
  ];

  // pm: reactivar-goal
  const goalReactivateOptimistic = useHandlerOptimistic<Goal[], string>({
    queryKey: GOALS_KEY_ACHIEVED,
    onMutate: (goalId) => (old) => old.filter((goal) => goal.id !== goalId),
    onSuccess: () => {
      toast.success("Meta reactivada", { richColors: true });
      queryClient.invalidateQueries({ queryKey: GOALS_KEY_AVAILABLE });
    },
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const goalReactivate = useMutation({
    mutationFn: (goalId: string) =>
      GoalService.reactivateGoal(teamId, counterId, goalId),
    onSuccess: goalReactivateOptimistic.onSuccess,
    onMutate: goalReactivateOptimistic.onMutate,
    onError: goalReactivateOptimistic.onError,
    onSettled: goalReactivateOptimistic.onSettled,
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
    goalUpdate: {
      isPending: goalUpdate.isPending,
      isSuccess: goalUpdate.isSuccess,
      isError: goalUpdate.isError,
      mutate: goalUpdate.mutate,
    },
    goalDelete: {
      isPending: goalDelete.isPending,
      isSuccess: goalDelete.isSuccess,
      isError: goalDelete.isError,
      mutate: goalDelete.mutate,
    },
    goalClone: {
      isPending: goalClone.isPending,
      isSuccess: goalClone.isSuccess,
      isError: goalClone.isError,
      mutate: goalClone.mutate,
    },
    goalReactivate: {
      isPending: goalReactivate.isPending,
      isSuccess: goalReactivate.isSuccess,
      isError: goalReactivate.isError,
      mutate: goalReactivate.mutate,
    },
  };
};

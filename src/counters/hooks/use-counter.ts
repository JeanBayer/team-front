import { minute } from "@/helper/time";
import { useHandlerOptimistic } from "@/hooks/use-handler-optimistic";
import { CounterService } from "@/services/counter-service";
import type { Counter, CreateCounter, UpdateCounter } from "@/types/counter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCounter = (teamId: string = "", counterId: string = "") => {
  const queryClient = useQueryClient();

  // pm: listar-counters
  const COUNTERS_KEY = ["TEAMS", teamId, "COUNTER"];
  const countersQuery = useQuery({
    queryKey: COUNTERS_KEY,
    queryFn: () => CounterService.getCounters(teamId),
    staleTime: minute(5).toMS(),
    enabled: !!teamId,
  });

  // pm: listar-counter
  const COUNTER_KEY = ["TEAMS", teamId, "COUNTER", counterId];
  const counterQuery = useQuery({
    queryKey: COUNTER_KEY,
    queryFn: () => CounterService.getCounter(teamId, counterId),
    staleTime: minute(5).toMS(),
    enabled: !!counterId,
  });

  // pm: crear-counter
  const counterCreateOptimistic = useHandlerOptimistic<
    Counter[],
    CreateCounter
  >({
    queryKey: COUNTERS_KEY,
    onMutate: (mutateData) => (old) =>
      [
        ...old,
        {
          id: "123",
          alreadyModifiedToday: false,
          currentCount: 0,
          name: mutateData.name,
          incrementButtonLabel: mutateData.incrementButtonLabel,
          resetButtonLabel: mutateData.resetButtonLabel,
          longestStreak: 0,
          lastResetDuration: 0,
          teamId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    onSuccess: () => toast.success("Counter creado", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const counterCreate = useMutation({
    mutationFn: (createCounter: CreateCounter) =>
      CounterService.createCounter(teamId, createCounter),
    onSuccess: counterCreateOptimistic.onSuccess,
    onMutate: counterCreateOptimistic.onMutate,
    onError: counterCreateOptimistic.onError,
    onSettled: counterCreateOptimistic.onSettled,
  });

  // pm: increment-counter
  const counterIncrementOptimistic = useHandlerOptimistic<Counter, any>({
    queryKey: COUNTER_KEY,
    onMutate: () => (old) => ({
      ...old,
      currentCount: old.currentCount + 1,
      alreadyModifiedToday: true,
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COUNTERS_KEY }),
  });

  const counterIncrement = useMutation({
    mutationFn: () => CounterService.incrementCounter(teamId, counterId),
    onSuccess: counterIncrementOptimistic.onSuccess,
    onMutate: counterIncrementOptimistic.onMutate,
    onError: counterIncrementOptimistic.onError,
    onSettled: counterIncrementOptimistic.onSettled,
  });

  // pm: reset-counter
  const counterResetOptimistic = useHandlerOptimistic<Counter, any>({
    queryKey: COUNTER_KEY,
    onMutate: () => (old) => ({
      ...old,
      currentCount: 0,
      lastResetDuration: old.currentCount,
      alreadyModifiedToday: true,
    }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: COUNTERS_KEY }),
  });

  const counterReset = useMutation({
    mutationFn: () =>
      CounterService.resetCounter(teamId, counterId, { nameEvent: "sacar" }),
    onSuccess: counterResetOptimistic.onSuccess,
    onMutate: counterResetOptimistic.onMutate,
    onError: counterResetOptimistic.onError,
    onSettled: counterResetOptimistic.onSettled,
  });

  // pm: delete counter
  const deleteCreateOptimistic = useHandlerOptimistic<Counter[], null>({
    queryKey: COUNTERS_KEY,
    onMutate: () => (old) => old.filter((counter) => counter.id !== counterId),
    onSuccess: () => toast.success("Counter eliminado", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const counterDelete = useMutation({
    mutationFn: () => CounterService.deleteCounter(teamId, counterId),
    onSuccess: deleteCreateOptimistic.onSuccess,
    onMutate: deleteCreateOptimistic.onMutate,
    onError: deleteCreateOptimistic.onError,
    onSettled: deleteCreateOptimistic.onSettled,
  });

  // pm: update-counter
  const counterUpdateOptimistic = useHandlerOptimistic<Counter, UpdateCounter>({
    queryKey: COUNTER_KEY,
    onMutate: (mutateData) => (old) => ({
      ...old,
      ...mutateData,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COUNTERS_KEY });
      toast.success("Counter actualizado correctamente", { richColors: true });
    },
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const counterUpdate = useMutation({
    mutationFn: (updateCounter: UpdateCounter) =>
      CounterService.updateCounter(teamId, counterId, updateCounter),
    onSuccess: counterUpdateOptimistic.onSuccess,
    onMutate: counterUpdateOptimistic.onMutate,
    onError: counterUpdateOptimistic.onError,
    onSettled: counterUpdateOptimistic.onSettled,
  });

  return {
    counters: {
      isLoading: countersQuery.isLoading,
      isError: countersQuery.isError,
      data: countersQuery.data,
    },
    counter: {
      isLoading: counterQuery.isLoading,
      isError: counterQuery.isError,
      data: counterQuery.data,
    },
    counterCreate: {
      isPending: counterCreate.isPending,
      isSuccess: counterCreate.isSuccess,
      isError: counterCreate.isError,
      mutate: counterCreate.mutate,
    },
    counterIncrement: {
      isPending: counterIncrement.isPending,
      isSuccess: counterIncrement.isSuccess,
      isError: counterIncrement.isError,
      mutate: counterIncrement.mutate as () => void,
    },
    counterReset: {
      isPending: counterReset.isPending,
      isSuccess: counterReset.isSuccess,
      isError: counterReset.isError,
      mutate: counterReset.mutate as () => void,
    },
    counterDelete: {
      isPending: counterDelete.isPending,
      isSuccess: counterDelete.isSuccess,
      isError: counterDelete.isError,
      mutate: counterDelete.mutate as () => void,
    },
    counterUpdate: {
      isPending: counterUpdate.isPending,
      isSuccess: counterUpdate.isSuccess,
      isError: counterUpdate.isError,
      mutate: counterUpdate.mutate,
    },
  };
};

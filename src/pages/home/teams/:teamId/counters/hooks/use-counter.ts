import { useHandlerOptimistic } from "@/hooks/use-handler-optimistic";
import { CounterService } from "@/services/counter-service";
import type { Counter, CreateCounter } from "@/types/counter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MINUTE_IN_MS = 1000 * 60;

export const useCounter = (teamId: string = "", counterId: string = "") => {
  const queryClient = useQueryClient();

  // pm: listar-counters
  const countersQuery = useQuery({
    queryKey: ["TEAMS", teamId, "COUNTER"],
    queryFn: () => CounterService.getCounters(teamId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!teamId,
  });

  // pm: listar-counter
  const COUNTER_KEY = ["TEAMS", teamId, "COUNTER", counterId];
  const counterQuery = useQuery({
    queryKey: COUNTER_KEY,
    queryFn: () => CounterService.getCounter(teamId, counterId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!counterId,
  });

  // pm: crear-counter
  const counterCreate = useMutation({
    mutationFn: (createCounter: CreateCounter) =>
      CounterService.createCounter(teamId, createCounter),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TEAMS", teamId, "COUNTER"] });
    },
  });

  // pm: increment-counter
  const counterIncrementOptimistic = useHandlerOptimistic<Counter>({
    queryKey: COUNTER_KEY,
    onMutate: (old) => ({
      ...old,
      currentCount: old.currentCount + 1,
      alreadyModifiedToday: true,
    }),
  });

  const counterIncrement = useMutation({
    mutationFn: () => CounterService.incrementCounter(teamId, counterId),
    onSuccess: counterIncrementOptimistic.onSuccess,
    onMutate: counterIncrementOptimistic.onMutate,
    onError: counterIncrementOptimistic.onError,
    onSettled: counterIncrementOptimistic.onSettled,
  });

  // pm: reset-counter
  const counterResetOptimistic = useHandlerOptimistic<Counter>({
    queryKey: COUNTER_KEY,
    onMutate: (old) => ({
      ...old,
      currentCount: 0,
      lastResetDuration: old.currentCount,
      alreadyModifiedToday: true,
    }),
  });

  const counterReset = useMutation({
    mutationFn: () =>
      CounterService.resetCounter(teamId, counterId, { nameEvent: "sacar" }),
    onSuccess: counterResetOptimistic.onSuccess,
    onMutate: counterResetOptimistic.onMutate,
    onError: counterResetOptimistic.onError,
    onSettled: counterResetOptimistic.onSettled,
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
  };
};

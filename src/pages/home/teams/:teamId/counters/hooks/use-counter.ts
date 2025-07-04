import { CounterService } from "@/services/counter-service";
import type { CreateCounter } from "@/types/counter";
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
  const counterQuery = useQuery({
    queryKey: ["TEAMS", teamId, "COUNTER", counterId],
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
  };
};

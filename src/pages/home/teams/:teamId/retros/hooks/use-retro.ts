import { RetrospectiveService } from "@/services/retrospective-service";
import type { CreateRetrospective } from "@/types/retrospective";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MINUTE_IN_MS = 1000 * 60;

export const useRetro = (teamId: string = "", retroId: string = "") => {
  const queryClient = useQueryClient();

  // pm: listar-retrospectives
  const retrosQuery = useQuery({
    queryKey: ["TEAMS", teamId, "RETROSPECTIVES"],
    queryFn: () => RetrospectiveService.getRetrospectives(teamId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!teamId,
  });

  // pm: listar-retrospective
  const COUNTER_KEY = ["TEAMS", teamId, "RETROSPECTIVES", retroId];
  const retroQuery = useQuery({
    queryKey: COUNTER_KEY,
    queryFn: () => RetrospectiveService.getRetrospective(teamId, retroId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!retroId,
  });

  // pm: crear-retrospective
  const retroCreate = useMutation({
    mutationFn: (createRetrospective: CreateRetrospective) =>
      RetrospectiveService.createRetrospective(teamId, createRetrospective),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["TEAMS", teamId, "RETROSPECTIVES"],
      });
    },
  });

  // pm: increment-counter
  // const counterIncrementOptimistic = useHandlerOptimistic<Counter>({
  //   queryKey: COUNTER_KEY,
  //   onMutate: (old) => ({
  //     ...old,
  //     currentCount: old.currentCount + 1,
  //     alreadyModifiedToday: true,
  //   }),
  // });

  // const counterIncrement = useMutation({
  //   mutationFn: () => CounterService.incrementCounter(teamId, retroId),
  //   onSuccess: counterIncrementOptimistic.onSuccess,
  //   onMutate: counterIncrementOptimistic.onMutate,
  //   onError: counterIncrementOptimistic.onError,
  //   onSettled: counterIncrementOptimistic.onSettled,
  // });

  return {
    retros: {
      isLoading: retrosQuery.isLoading,
      isError: retrosQuery.isError,
      data: retrosQuery.data,
    },
    retro: {
      isLoading: retroQuery.isLoading,
      isError: retroQuery.isError,
      data: retroQuery.data,
    },
    retroCreate: {
      isPending: retroCreate.isPending,
      isSuccess: retroCreate.isSuccess,
      isError: retroCreate.isError,
      mutate: retroCreate.mutate,
    },
  };
};

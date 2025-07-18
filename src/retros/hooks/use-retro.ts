import { useHandlerOptimistic } from "@/hooks/use-handler-optimistic";
import { RetrospectiveService } from "@/services/retrospective-service";
import type { CreateRetrospective, Retrospective } from "@/types/retrospective";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const MINUTE_IN_MS = 1000 * 60;

export const useRetro = (teamId: string = "", retroId: string = "") => {
  // pm: listar-retrospectives
  const RETROS_KEY = ["TEAMS", teamId, "RETROSPECTIVES"];
  const retrosQuery = useQuery({
    queryKey: RETROS_KEY,
    queryFn: () => RetrospectiveService.getRetrospectives(teamId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!teamId,
  });

  // pm: listar-retrospective
  const RETRO_KEY = ["TEAMS", teamId, "RETROSPECTIVES", retroId];
  const retroQuery = useQuery({
    queryKey: RETRO_KEY,
    queryFn: () => RetrospectiveService.getRetrospective(teamId, retroId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!retroId,
  });

  // pm: crear-retrospective
  const retroCreateOptimistic = useHandlerOptimistic<
    Retrospective[],
    CreateRetrospective
  >({
    queryKey: RETROS_KEY,
    onMutate: (mutateData) => (old) =>
      [
        ...old,
        {
          id: uuidv4(),
          retrospectiveName: mutateData.retrospectiveName,
          retrospectiveNumber: 1,
          status: "CREATED",
          sprintWinner: null,
          teamId,
          createdAt: new Date(),
        },
      ],
    onSuccess: () =>
      toast.success("Retrospectiva creada", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const retroCreate = useMutation({
    mutationFn: (createRetrospective: CreateRetrospective) =>
      RetrospectiveService.createRetrospective(teamId, createRetrospective),
    onSuccess: retroCreateOptimistic.onSuccess,
    onMutate: retroCreateOptimistic.onMutate,
    onError: retroCreateOptimistic.onError,
    onSettled: retroCreateOptimistic.onSettled,
  });

  // pm: close-retrospective
  const retroCloseOptimistic = useHandlerOptimistic<Retrospective, null>({
    queryKey: RETRO_KEY,
    onMutate: () => (old) => ({
      ...old,
      status: "CLOSED",
    }),
    onSuccess: () =>
      toast.success("Retrospectiva cerrada", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const retroClose = useMutation({
    mutationFn: () => RetrospectiveService.closeRetrospective(teamId, retroId),
    onSuccess: retroCloseOptimistic.onSuccess,
    onMutate: retroCloseOptimistic.onMutate,
    onError: retroCloseOptimistic.onError,
    onSettled: retroCloseOptimistic.onSettled,
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
    retroClose: {
      isPending: retroClose.isPending,
      isSuccess: retroClose.isSuccess,
      isError: retroClose.isError,
      mutate: retroClose.mutate as () => void,
    },
  };
};

import { useHandlerOptimistic } from "@/hooks/use-handler-optimistic";
import { RetrospectiveService } from "@/services/retrospective-service";
import type {
  CreateRetrospective,
  Retrospective,
  UpdateRetrospective,
} from "@/types/retrospective";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const MINUTE_IN_MS = 1000 * 60;

export const useRetro = (teamId: string = "", retroId: string = "") => {
  const queryClient = useQueryClient();

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

  const retroCreate = useMutation({
    mutationFn: (createRetrospective: CreateRetrospective) =>
      RetrospectiveService.createRetrospective(teamId, createRetrospective),
    onSuccess: () =>
      toast.success("Retrospectiva creada", { richColors: true }),
  });

  // pm: update-retrospective
  const retroUpdateOptimistic = useHandlerOptimistic<
    Retrospective,
    UpdateRetrospective
  >({
    queryKey: RETRO_KEY,
    onMutate: (mutateData) => (old) => ({
      ...old,
      ...mutateData,
    }),
    onSuccess: () => {
      toast.success("Retrospectiva actualizada", { richColors: true });
      queryClient.invalidateQueries({ queryKey: RETROS_KEY });
    },
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const retroUpdate = useMutation({
    mutationFn: (updateRetrospective: UpdateRetrospective) =>
      RetrospectiveService.updateRetrospective(
        teamId,
        retroId,
        updateRetrospective
      ),
    onSuccess: retroUpdateOptimistic.onSuccess,
    onMutate: retroUpdateOptimistic.onMutate,
    onError: retroUpdateOptimistic.onError,
    onSettled: retroUpdateOptimistic.onSettled,
  });

  // pm: close-retrospective
  const retroCloseOptimistic = useHandlerOptimistic<Retrospective, null>({
    queryKey: RETRO_KEY,
    onMutate: () => (old) => ({
      ...old,
      status: "CLOSED",
    }),
    onSuccess: () => {
      toast.success("Retrospectiva cerrada", { richColors: true });
      queryClient.invalidateQueries({ queryKey: RETROS_KEY });
    },
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const retroClose = useMutation({
    mutationFn: () => RetrospectiveService.closeRetrospective(teamId, retroId),
    onSuccess: retroCloseOptimistic.onSuccess,
    onMutate: retroCloseOptimistic.onMutate,
    onError: retroCloseOptimistic.onError,
    onSettled: retroCloseOptimistic.onSettled,
  });

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
    retroUpdate: {
      isPending: retroUpdate.isPending,
      isSuccess: retroUpdate.isSuccess,
      isError: retroUpdate.isError,
      mutate: retroUpdate.mutate,
    },
    retroClose: {
      isPending: retroClose.isPending,
      isSuccess: retroClose.isSuccess,
      isError: retroClose.isError,
      mutate: retroClose.mutate as () => void,
    },
  };
};

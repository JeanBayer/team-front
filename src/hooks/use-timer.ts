import { minute } from "@/helper/time";
import { TimerService } from "@/services/timer-service";
import type { CreateTimer, Timer } from "@/types/timer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { toast } from "sonner";
import { useHandlerOptimistic } from "./use-handler-optimistic";

export const useTimer = (teamId: string = "") => {
  const TIMERS_KEY = ["TEAMS", teamId, "TIMER"];
  const timerQuery = useQuery({
    queryKey: TIMERS_KEY,
    queryFn: () => TimerService.getTimer(teamId),
    staleTime: minute(5).toMS(),
    enabled: !!teamId,
  });

  // pm: timer-create
  const timerCreateOptimistic = useHandlerOptimistic<Timer, CreateTimer>({
    queryKey: TIMERS_KEY,
    onMutate: (mutateData) => (old) => ({
      ...old,
      endsAt: DateTime.now().plus({ minutes: mutateData.minutes }).toString(),
    }),
    onSuccess: () => toast.success("Timer creado", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const timerCreate = useMutation({
    mutationFn: (createTimer: CreateTimer) =>
      TimerService.createTimer(teamId, createTimer),
    onMutate: timerCreateOptimistic.onMutate,
    onSuccess: timerCreateOptimistic.onSuccess,
    onError: timerCreateOptimistic.onError,
    onSettled: timerCreateOptimistic.onSettled,
  });

  // pm: timer-cancel
  const timerCancelOptimistic = useHandlerOptimistic<any, any>({
    queryKey: TIMERS_KEY,
    onMutate: () => () => null,
    onSuccess: () => toast.success("Timer cancelado", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const timerCancel = useMutation({
    mutationFn: () => TimerService.cancelTimer(teamId),
    onMutate: timerCancelOptimistic.onMutate,
    onSuccess: timerCancelOptimistic.onSuccess,
    onError: timerCancelOptimistic.onError,
    onSettled: timerCancelOptimistic.onSettled,
  });

  return {
    timer: {
      isLoading: timerQuery.isLoading,
      isError: timerQuery.isError,
      data: timerQuery.data,
      refetch: timerQuery.refetch,
    },
    timerCreate: {
      isPending: timerCreate.isPending,
      isSuccess: timerCreate.isSuccess,
      isError: timerCreate.isError,
      mutate: timerCreate.mutate,
    },
    timerCancel: {
      isPending: timerCancel.isPending,
      isSuccess: timerCancel.isSuccess,
      isError: timerCancel.isError,
      mutate: timerCancel.mutate as () => void,
    },
  };
};

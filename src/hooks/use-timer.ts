import { minute } from "@/helper/time";
import { TimerService } from "@/services/timer-service";
import type { CreateTimer } from "@/types/timer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTimer = (teamId: string = "") => {
  const queryClient = useQueryClient();

  const TIMERS_KEY = ["TEAMS", teamId, "TIMER"];
  const timerQuery = useQuery({
    queryKey: TIMERS_KEY,
    queryFn: () => TimerService.getTimer(teamId),
    staleTime: minute(5).toMS(),
    enabled: !!teamId,
  });

  const timerCreate = useMutation({
    mutationFn: (createTimer: CreateTimer) =>
      TimerService.createTimer(teamId, createTimer),
    onSuccess: () => {
      toast.success("Timer creado", { richColors: true });
      queryClient.invalidateQueries({ queryKey: TIMERS_KEY });
    },
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
  };
};

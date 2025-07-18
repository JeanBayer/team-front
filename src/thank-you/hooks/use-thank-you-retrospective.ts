import { minute } from "@/helper/time";
import { useHandlerOptimistic } from "@/hooks/use-handler-optimistic";
import { ThankYouService } from "@/services/thank-you-service";
import type { CreateThankYou, ThankYou } from "@/types/thank-you";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export const useThankYouRetrospective = (
  teamId: string = "",
  retroId: string = ""
) => {
  // pm: listar-thank-you
  const THANK_YOU_KEY = [
    "TEAMS",
    teamId,
    "RETROSPECTIVES",
    retroId,
    "THANK-YOU",
  ];
  const thankYouQuery = useQuery({
    queryKey: THANK_YOU_KEY,
    queryFn: () =>
      ThankYouService.getThankYousIntoRetrospective(teamId, retroId),
    staleTime: minute(5).toMS(),
    enabled: !!retroId,
  });

  // pm: crear-counter
  const thankYouOptimistic = useHandlerOptimistic<ThankYou[], CreateThankYou>({
    queryKey: THANK_YOU_KEY,
    onMutate: (mutateData) => (old) =>
      [
        ...old,
        {
          id: uuidv4(),
          message: mutateData.message,
          giverId: uuidv4(),
          giver: {
            id: uuidv4(),
            name: "Yo",
          },
          receiverId: mutateData.userId,
          receiver: {
            id: mutateData.userId,
            name: "Miembro",
          },
          retrospectiveId: retroId,
          createdAt: new Date(),
        },
      ],
    onSuccess: () =>
      toast.success("Agradecimiento creado", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const thankYouCreate = useMutation({
    mutationFn: (createThankYou: CreateThankYou) =>
      ThankYouService.createThankYou(teamId, retroId, createThankYou),
    onSuccess: thankYouOptimistic.onSuccess,
    onMutate: thankYouOptimistic.onMutate,
    onError: thankYouOptimistic.onError,
    onSettled: thankYouOptimistic.onSettled,
  });

  return {
    thankYou: {
      isLoading: thankYouQuery.isLoading,
      isError: thankYouQuery.isError,
      data: thankYouQuery.data,
    },
    thankYouCreate: {
      isPending: thankYouCreate.isPending,
      isSuccess: thankYouCreate.isSuccess,
      isError: thankYouCreate.isError,
      mutate: thankYouCreate.mutate,
    },
  };
};

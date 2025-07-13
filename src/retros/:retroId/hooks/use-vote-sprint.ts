import { useHandlerOptimistic } from "@/hooks/use-handler-optimistic";
import { SprintWinnerService } from "@/services/sprint-winner-service";
import type { VoteSprintWinner, VoteStatus } from "@/types/sprint-winner";
import { useMutation, useQuery } from "@tanstack/react-query";

const MINUTE_IN_MS = 1000 * 60;

export const useVoteSprint = (teamId: string = "", retroId: string = "") => {
  const VOTE_STATUS_KEY = [
    "TEAMS",
    teamId,
    "RETROSPECTIVES",
    retroId,
    "SPRINT-WINNER",
    "VOTE-STATUS",
  ];
  const voteStatusQuery = useQuery({
    queryKey: VOTE_STATUS_KEY,
    queryFn: () => SprintWinnerService.getVoteStatus(teamId, retroId),
    staleTime: 5 * MINUTE_IN_MS,
    enabled: !!retroId,
  });

  const voteOptimisticHandler = useHandlerOptimistic<
    VoteStatus,
    VoteSprintWinner
  >({
    queryKey: VOTE_STATUS_KEY,
    onMutate: (mutateData) => (old) => ({
      ...old,
      totalVotes: old.totalVotes + 1,
      myVote: {
        id: "123",
        retrospectiveId: "123",
        voterId: "123",
        createdAt: new Date(),
        votedForId: mutateData.userId,
      },
    }),
  });

  const voteWinner = useMutation({
    mutationFn: (voteWinner: VoteSprintWinner) =>
      SprintWinnerService.voteWinner(teamId, retroId, voteWinner),
    onSuccess: voteOptimisticHandler.onSuccess,
    onMutate: voteOptimisticHandler.onMutate,
    onError: voteOptimisticHandler.onError,
    onSettled: voteOptimisticHandler.onSettled,
  });

  return {
    voteStatus: {
      isLoading: voteStatusQuery.isLoading,
      isError: voteStatusQuery.isError,
      data: voteStatusQuery.data,
    },
    voteWinner: {
      isPending: voteWinner.isPending,
      isSuccess: voteWinner.isSuccess,
      isError: voteWinner.isError,
      mutate: voteWinner.mutate,
    },
  };
};

import { instance } from "@/api/api";
import type { VoteSprintWinner, VoteStatus } from "@/types/sprint-winner";
import { AxiosError } from "axios";

export class SprintWinnerService {
  static async voteWinner(
    teamId: string,
    retroId: string,
    voteSprintWinner: VoteSprintWinner
  ) {
    try {
      const { data } = await instance.post(
        `/teams/${teamId}/retrospectives/${retroId}/sprint-winner`,
        voteSprintWinner
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async getVoteStatus(teamId: string, retroId: string) {
    try {
      const { data } = await instance.get<VoteStatus>(
        `/teams/${teamId}/retrospectives/${retroId}/sprint-winner/vote-status`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }
}

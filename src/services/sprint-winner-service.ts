import { instance } from "@/api/api";
import type { VoteSprintWinner, VoteStatus } from "@/types/sprint-winner";

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
      console.error("voteWinner error", error);
      throw new Error("error");
    }
  }

  static async getVoteStatus(teamId: string, retroId: string) {
    try {
      const { data } = await instance.get<VoteStatus>(
        `/teams/${teamId}/retrospectives/${retroId}/sprint-winner/vote-status`
      );
      return data;
    } catch (error) {
      console.error("getVoteStatus error", error);
      throw new Error("error");
    }
  }

  // static async getRetrospective(teamId: string, retroId: string) {
  //   try {
  //     const { data } = await instance.get<Retrospective>(
  //       `/teams/${teamId}/retrospectives/${retroId}`
  //     );
  //     return data;
  //   } catch (error) {
  //     console.error("getRetrospective error", error);
  //     throw new Error("error");
  //   }
  // }
}

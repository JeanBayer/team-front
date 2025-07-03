import { instance } from "@/api/api";
import type { MyMembership } from "@/types/membership";
import type { BasicTeam, JoinTeam } from "@/types/team";

export class MembershipService {
  static async joinTeam(joinTeam: JoinTeam) {
    const { id, ...rest } = joinTeam;
    try {
      const { data } = await instance.post<BasicTeam>(
        `teams/${id}/users`,
        rest
      );
      return data;
    } catch (error) {
      console.error("joinTeam error", error);
      throw new Error("error");
    }
  }

  static async leaveTeam(teamId: string) {
    try {
      const { data } = await instance.delete(`teams/${teamId}/users`);
      return data;
    } catch (error) {
      console.error("leaveTeam error", error);
      throw new Error("error");
    }
  }

  static async myMembership(teamId: string) {
    try {
      const { data } = await instance.get<MyMembership>(
        `teams/${teamId}/users/my-membership`
      );
      return data;
    } catch (error) {
      console.error("myMembership error", error);
      throw new Error("error");
    }
  }
}

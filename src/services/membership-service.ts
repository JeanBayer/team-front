import { instance } from "@/api/api";
import type { Membership } from "@/types/membership";
import type { BasicTeam, JoinTeam } from "@/types/team";
import { AxiosError } from "axios";

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
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
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
      const { data } = await instance.get<Membership>(
        `teams/${teamId}/users/my-membership`
      );
      return data;
    } catch (error) {
      console.error("myMembership error", error);
      throw new Error("error");
    }
  }

  static async getMemberships(teamId: string) {
    try {
      const { data } = await instance.get<Membership[]>(
        `teams/${teamId}/users`
      );
      return data;
    } catch (error) {
      console.error("getMemberships error", error);
      throw new Error("error");
    }
  }
}

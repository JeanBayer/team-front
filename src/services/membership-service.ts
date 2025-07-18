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
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async myMembership(teamId: string) {
    try {
      const { data } = await instance.get<Membership>(
        `teams/${teamId}/users/my-membership`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async getMemberships(teamId: string) {
    try {
      const { data } = await instance.get<Membership[]>(
        `teams/${teamId}/users`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async leaveUser(teamId: string, userId: string) {
    try {
      const { data } = await instance.delete(`teams/${teamId}/users/${userId}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async promoteAdminUser(teamId: string, userId: string) {
    try {
      const { data } = await instance.post(
        `teams/${teamId}/users/${userId}/admin`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async demoteAdminUser(teamId: string, userId: string) {
    try {
      const { data } = await instance.delete(
        `teams/${teamId}/users/${userId}/admin`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }
}

import { instance } from "@/api/api";
import type { CreateRetrospective, Retrospective } from "@/types/retrospective";

export class RetrospectiveService {
  static async createRetrospective(
    teamId: string,
    createRetrospective: CreateRetrospective
  ) {
    try {
      const { data } = await instance.post<Retrospective>(
        `/teams/${teamId}/retrospectives`,
        createRetrospective
      );
      return data;
    } catch (error) {
      console.error("createRetrospective error", error);
      throw new Error("error");
    }
  }

  static async getRetrospectives(teamId: string) {
    try {
      const { data } = await instance.get<Retrospective[]>(
        `/teams/${teamId}/retrospectives`
      );
      return data;
    } catch (error) {
      console.error("getRetrospectives error", error);
      throw new Error("error");
    }
  }

  static async getRetrospective(teamId: string, retroId: string) {
    try {
      const { data } = await instance.get<Retrospective>(
        `/teams/${teamId}/retrospectives/${retroId}`
      );
      return data;
    } catch (error) {
      console.error("getRetrospective error", error);
      throw new Error("error");
    }
  }
}

import { instance } from "@/api/api";
import type { Counter, CreateCounter } from "@/types/counter";

export class CounterService {
  static async createCounter(teamId: string, createCounter: CreateCounter) {
    try {
      const { data } = await instance.post<Counter>(
        `/teams/${teamId}/counters`,
        createCounter
      );
      return data;
    } catch (error) {
      console.error("createCounter error", error);
      throw new Error("error");
    }
  }

  static async getCounters(teamId: string) {
    try {
      const { data } = await instance.get<Counter[]>(
        `/teams/${teamId}/counters`
      );
      return data;
    } catch (error) {
      console.error("getCounters error", error);
      throw new Error("error");
    }
  }

  static async getCounter(teamId: string, counterId: string) {
    try {
      const { data } = await instance.get<Counter>(
        `/teams/${teamId}/counters/${counterId}`
      );
      return data;
    } catch (error) {
      console.error("getCounters error", error);
      throw new Error("error");
    }
  }
}

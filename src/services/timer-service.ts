import { instance } from "@/api/api";
import { DateChile, sleep } from "@/helper/time";
import type { CreateTimer, Timer } from "@/types/timer";
import { AxiosError } from "axios";

export class TimerService {
  static async getTimer(teamId: string) {
    await sleep(10000);
    try {
      const { data } = await instance.get<Timer | undefined>(
        `/teams/${teamId}/timers`
      );
      if (data?.isActive)
        return {
          ...data,
          endsAt: DateChile.convertDateToChile(data.endsAt),
        };

      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async cancelTimer(teamId: string) {
    try {
      const { data } = await instance.delete<undefined>(
        `/teams/${teamId}/timers`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }

  static async createTimer(teamId: string, createTimer: CreateTimer) {
    try {
      const { data } = await instance.post<Timer>(
        `/teams/${teamId}/timers`,
        createTimer
      );

      if (data?.isActive)
        return {
          ...data,
          endsAt: DateChile.convertDateToChile(data.endsAt),
        };

      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        throw new Error(error.response?.data.message);
      throw new Error("Error inesperado");
    }
  }
}

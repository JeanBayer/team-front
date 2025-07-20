import { envs } from "@/config/envs";
import {
  deleteAuthData,
  extractAuthData,
  updateAuthData,
} from "@/helper/extract-data";
import { sleep } from "@/helper/time";
import axios from "axios";
import { toast } from "sonner";

export const instance = axios.create({
  baseURL: envs.VITE_BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    const authData = extractAuthData();
    config.headers.set("Authorization", `Bearer ${authData?.token}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (config) {
    if (config.config.url?.includes("auth") && config?.data?.token)
      updateAuthData(config?.data);

    return config;
  },
  function (error) {
    if (error.status === 401) {
      deleteAuthData();
      window.location.href = "/landing";
    } else if (error.status === 403) {
      toast.error(error.response?.data.message || "No autorizado");
      sleep(3000).then(() => {
        window.location.href = "/";
      });
    }
    return Promise.reject(error);
  }
);

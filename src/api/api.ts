import { envs } from "@/config/envs";
import { extractAuthData, updateAuthData } from "@/helper/extract-data";
import axios from "axios";

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
    if (error.status === 401) window.location.href = "/landing";
    return Promise.reject(error);
  }
);

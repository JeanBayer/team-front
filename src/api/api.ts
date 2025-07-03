import { envs } from "@/config/envs";
import { extractAuthData } from "@/helper/extract-data";
import axios from "axios";

export const instance = axios.create({
  baseURL: envs.VITE_BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    const authData = extractAuthData();

    if (!authData?.token) {
      throw new Error("Error no hay token");
    }

    config.headers.set("Authorization", `Bearer ${authData?.token}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.status === 401) window.location.href = "/landing";
    return Promise.reject(error);
  }
);

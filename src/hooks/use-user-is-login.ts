import { extractAuthData } from "@/helper/extract-data";
import { useState } from "react";

export const useUserIsLogin = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const authData = extractAuthData();
    if (!authData?.token) return false;
    return true;
  });

  function reevaluate() {
    const authData = extractAuthData();
    if (!authData?.token) setIsLogin(false);
    else setIsLogin(true);
  }

  return [isLogin, reevaluate] as const;
};

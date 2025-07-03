import { useState } from "react";

function extractAuthData() {
  return JSON.parse(localStorage.getItem("auth-data") || "{}");
}

export const userIsLogin = () => {
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

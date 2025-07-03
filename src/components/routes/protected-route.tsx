import { useUserIsLogin } from "@/hooks/use-user-is-login";
import { useEffect, type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const [isLogin, reevaluate] = useUserIsLogin();
  const location = useLocation();

  useEffect(() => {
    reevaluate();
  }, [location]);

  console.log({ isLogin });

  if (!isLogin) return <Navigate to="/landing" />;

  return <>{children}</>;
};

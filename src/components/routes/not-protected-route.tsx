import { userIsLogin } from "@/hooks/user-is-login";
import { useVerify } from "@/hooks/use-verify";
import { useEffect, type PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router";

export const NotProtectedRoute = ({ children }: PropsWithChildren) => {
  const [isLogin, reevaluate] = userIsLogin();
  const verifyData = useVerify(isLogin);
  const location = useLocation();

  useEffect(() => {
    reevaluate();
  }, [location]);

  if (verifyData.isLoading) return <></>;
  if (verifyData.isSuccess) return <Navigate to="/" />;
  return <>{children}</>;
};

import { AuthService } from "@/services/auth-service";
import { useQuery } from "@tanstack/react-query";

export const useVerify = (enabled: boolean = false) => {
  const verifyData = useQuery({
    queryKey: ["AUTH"],
    queryFn: AuthService.verify,
    enabled,
  });

  return {
    isLoading: verifyData.isLoading,
    isError: verifyData.isError,
    isSuccess: verifyData.isSuccess,
  };
};

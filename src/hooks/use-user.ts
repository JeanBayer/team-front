import { UserService } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

const MINUTE_IN_MS = 1000 * 60;

export const useUser = () => {
  const userQuery = useQuery({
    queryKey: ["USER"],
    queryFn: () => UserService.getUser(),
    staleTime: 10 * MINUTE_IN_MS,
  });

  return {
    user: {
      isLoading: userQuery.isLoading,
      isError: userQuery.isError,
      data: userQuery.data,
    },
  };
};

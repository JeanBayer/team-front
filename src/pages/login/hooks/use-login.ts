import { AuthService } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: () => {
      navigate("/");
    },
  });

  return {
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    mutate: mutation.mutate,
  };
};

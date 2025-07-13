import { AuthService } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: () => navigate("/"),
    onError: (error) => toast.error(error.message, { richColors: true }),
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

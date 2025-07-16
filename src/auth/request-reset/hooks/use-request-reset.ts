import { AuthService } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useRequestReset = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: AuthService.requestReset,
    onSuccess: (_result, data) =>
      navigate(`/reset-account?email=${data.email}`),
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

import { AuthService } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useRequestReset = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: AuthService.requestReset,
    onSuccess: (_result, data) => {
      toast.success("Te hemos enviado el codigo a tu email", {
        richColors: true,
      });
      navigate(`/reset-user?email=${data.email}`);
    },
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

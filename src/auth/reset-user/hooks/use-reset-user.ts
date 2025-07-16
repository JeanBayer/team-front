import { AuthService } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useResetUser = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: AuthService.resetUser,
    onSuccess: (_result, data) => {
      toast.success("Usuario restablecido correctamente", {
        richColors: true,
      });
      navigate(`/login?email=${data.email}&password=${data.password}`);
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

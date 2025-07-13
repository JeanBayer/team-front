import { useLogin } from "@/auth/login/hooks/use-login";
import { useFormData } from "@/hooks/use-form-data";

const initialFormData = {
  email: "",
  password: "",
};

export const useFormLogin = () => {
  const createMutation = useLogin();
  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => createMutation.mutate(formData)
  );

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: createMutation.isPending,
    isError: createMutation.isError,
  };
};

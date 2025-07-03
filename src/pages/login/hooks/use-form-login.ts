import { useFormData } from "@/hooks/use-form-data";
import { useLogin } from "./use-login";

const initialFormData = {
  email: "jhanbayer@gmail.com",
  password: "123-Jhan",
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

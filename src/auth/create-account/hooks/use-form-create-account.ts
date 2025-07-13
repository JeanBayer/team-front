import { useCreateAccount } from "@/auth/create-account/hooks/use-create-account";
import { useFormData } from "@/hooks/use-form-data";

const initialFormData = {
  name: "jhan",
  email: "jhanbayer@gmail.com",
  password: "123-Jhan",
};

export const useFormCreateAccount = () => {
  const createMutation = useCreateAccount();
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

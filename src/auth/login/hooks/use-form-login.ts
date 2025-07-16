import { useLogin } from "@/auth/login/hooks/use-login";
import { useFormData } from "@/hooks/use-form-data";
import { useSearchParams } from "react-router";

const initialFormData = {
  email: "",
  password: "",
};

export const useFormLogin = () => {
  const [searchParams] = useSearchParams({ email: "", password: "" });
  const createMutation = useLogin();
  const { formData, updateField, handleSubmit } = useFormData(
    {
      ...initialFormData,
      email: searchParams.get("email") || "",
      password: searchParams.get("password") || "",
    },
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

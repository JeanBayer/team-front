import { useFormData } from "@/hooks/use-form-data";
import { useSearchParams } from "react-router";
import { useResetUser } from "./use-reset-user";

const initialFormData = {
  email: "",
  password: "",
  code: "",
};

export const useFormResetUser = () => {
  const [searchParams] = useSearchParams({ email: "" });
  const resetUserMutation = useResetUser();
  const { formData, updateField, handleSubmit } = useFormData(
    { ...initialFormData, email: searchParams.get("email") || "" },
    (formData) => resetUserMutation.mutate(formData)
  );

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: resetUserMutation.isPending,
    isError: resetUserMutation.isError,
  };
};

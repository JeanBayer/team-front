import { useFormData } from "@/hooks/use-form-data";
import { useSearchParams } from "react-router";
import { useRequestReset } from "./use-request-reset";

const initialFormData = {
  email: "",
};

export const useFormRequestReset = () => {
  const [searchParams] = useSearchParams({ email: "" });
  const requestResetMutation = useRequestReset();
  const { formData, updateField, handleSubmit } = useFormData(
    { ...initialFormData, email: searchParams.get("email") || "" },
    (formData) => requestResetMutation.mutate(formData)
  );

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: requestResetMutation.isPending,
    isError: requestResetMutation.isError,
  };
};

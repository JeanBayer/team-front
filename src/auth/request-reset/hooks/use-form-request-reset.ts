import { useFormData } from "@/hooks/use-form-data";
import { useRequestReset } from "./use-request-reset";

const initialFormData = {
  email: "",
};

export const useFormRequestReset = () => {
  const requestResetMutation = useRequestReset();
  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
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

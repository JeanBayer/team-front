import { useCounter } from "@/counters/hooks/use-counter";
import { useFormData } from "@/hooks/use-form-data";
import type { ResetCounter } from "@/types/counter";
import { useParams } from "react-router";

const initialFormData: ResetCounter = {
  nameEvent: "",
};

export const useFormResetCounter = () => {
  const { teamId, counterId } = useParams();
  const { counterReset } = useCounter(teamId, counterId);

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => counterReset.mutate(formData)
  );

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: counterReset.isPending,
    isError: counterReset.isError,
  };
};

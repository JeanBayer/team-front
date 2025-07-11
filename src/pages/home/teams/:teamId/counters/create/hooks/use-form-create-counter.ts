import { useFormData } from "@/hooks/use-form-data";
import { useNavigate, useParams } from "react-router";
import { useCounter } from "../../hooks/use-counter";

const initialFormData = {
  name: "Counter 1",
  incrementButtonLabel: "increment",
  resetButtonLabel: "reset",
};

export const useFormCreateCounter = () => {
  const { teamId } = useParams();
  const { counterCreate } = useCounter(teamId);
  const navigate = useNavigate();

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => counterCreate.mutate(formData)
  );

  if (counterCreate.isSuccess) {
    navigate(`/teams/${teamId}/counters`);
  }

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: counterCreate.isPending,
    isError: counterCreate.isError,
  };
};

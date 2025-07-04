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

  console.log({ counterCreate });

  if (counterCreate.isSuccess) navigate(-1);

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: counterCreate.isPending,
    isError: counterCreate.isError,
  };
};

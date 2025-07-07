import { useFormData } from "@/hooks/use-form-data";
import { useNavigate, useParams } from "react-router";
import { useRetro } from "../../hooks/use-retro";

const initialFormData = {
  retrospectiveName: "Retro name N1",
};

export const useFormCreateRetro = () => {
  const { teamId } = useParams();
  const { retroCreate } = useRetro(teamId);
  const navigate = useNavigate();

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => retroCreate.mutate(formData)
  );

  if (retroCreate.isSuccess) navigate(-1);

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: retroCreate.isPending,
    isError: retroCreate.isError,
  };
};

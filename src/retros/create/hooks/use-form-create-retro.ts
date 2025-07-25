import { useFormData } from "@/hooks/use-form-data";
import { useRetro } from "@/retros/hooks/use-retro";
import { useNavigate, useParams } from "react-router";

const initialFormData = {
  retrospectiveName: "",
};

export const useFormCreateRetro = () => {
  const { teamId } = useParams();
  const { retroCreate } = useRetro(teamId);
  const navigate = useNavigate();

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => retroCreate.mutate(formData)
  );

  if (retroCreate.isSuccess) navigate(`/teams/${teamId}/retrospectives`);

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: retroCreate.isPending,
    isError: retroCreate.isError,
  };
};

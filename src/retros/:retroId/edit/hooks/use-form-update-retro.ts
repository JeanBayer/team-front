import { useFormData } from "@/hooks/use-form-data";
import { useRetro } from "@/retros/hooks/use-retro";
import type { UpdateRetrospective } from "@/types/retrospective";
import { useNavigate, useParams } from "react-router";

type UseFormUpdateRetroProps = {
  initialFormData: UpdateRetrospective;
};

export const useFormUpdateRetro = ({
  initialFormData,
}: UseFormUpdateRetroProps) => {
  const { teamId, retroId } = useParams();
  const { retroUpdate } = useRetro(teamId, retroId);
  const navigate = useNavigate();

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => retroUpdate.mutate(formData)
  );

  if (retroUpdate.isSuccess) {
    navigate(`/teams/${teamId}/retrospectives/${retroId}`);
  }

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: retroUpdate.isPending,
    isError: retroUpdate.isError,
  };
};

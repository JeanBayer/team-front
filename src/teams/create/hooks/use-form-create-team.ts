import { useFormData } from "@/hooks/use-form-data";
import { useTeam } from "@/teams/hooks/use-team";
import { useNavigate } from "react-router";

const initialFormData = {
  name: "",
  joinPassword: "",
};

export const useFormCreateTeam = () => {
  const { teamCreate } = useTeam();
  const navigate = useNavigate();

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => teamCreate.mutate(formData)
  );

  if (teamCreate.isSuccess) navigate("/teams");

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: teamCreate.isPending,
    isError: teamCreate.isError,
  };
};

import { useFormData } from "@/hooks/use-form-data";
import { useNavigate } from "react-router";
import { useTeam } from "../../hooks/use-team";

const initialFormData = {
  name: "team with counter - increment",
  joinPassword: "123",
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

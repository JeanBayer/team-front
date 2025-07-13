import { useFormData } from "@/hooks/use-form-data";
import { useMembership } from "@/teams/hooks/use-membership";
import { useNavigate } from "react-router";

const initialFormData = {
  id: "",
  joinPassword: "",
};

export const useFormJoinTeam = () => {
  const { teamJoin } = useMembership();
  const navigate = useNavigate();

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => teamJoin.mutate(formData)
  );

  if (teamJoin.isSuccess) navigate("/teams");

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: teamJoin.isPending,
    isError: teamJoin.isError,
  };
};

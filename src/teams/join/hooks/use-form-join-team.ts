import { useFormData } from "@/hooks/use-form-data";
import { useMembership } from "@/teams/hooks/use-membership";
import { useNavigate } from "react-router";

const initialFormData = {
  id: "ddf18cf4-c06a-4d82-bbb6-29514cb1f633",
  joinPassword: "123",
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

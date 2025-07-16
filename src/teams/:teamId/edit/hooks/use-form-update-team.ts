import { ObjectUtil } from "@/helper/object-util";
import { useFormData } from "@/hooks/use-form-data";
import { useTeam } from "@/teams/hooks/use-team";
import type { UpdateTeam } from "@/types/team";
import { useNavigate, useParams } from "react-router";

type UseFormUpdateTeamProps = {
  initialFormData: UpdateTeam;
};

export const useFormUpdateTeam = ({
  initialFormData,
}: UseFormUpdateTeamProps) => {
  const { teamId } = useParams();
  const { teamUpdate } = useTeam(teamId);
  const navigate = useNavigate();

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => teamUpdate.mutate(ObjectUtil.onlyTruthyValues(formData))
  );

  if (teamUpdate.isSuccess) {
    navigate(`/teams/${teamId}`);
  }

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: teamUpdate.isPending,
    isError: teamUpdate.isError,
  };
};

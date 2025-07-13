import { useFormData } from "@/hooks/use-form-data";
import { useVoteSprint } from "@/retros/:retroId/hooks/use-vote-sprint";
import { useParams } from "react-router";

const initialFormData = {
  userId: "",
};

export const useFormSprintWinnerVote = () => {
  const { teamId, retroId } = useParams();
  const { voteWinner } = useVoteSprint(teamId, retroId);

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => voteWinner.mutate(formData)
  );

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: voteWinner.isPending,
    isError: voteWinner.isError,
  };
};

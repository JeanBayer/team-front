import { useGoal } from "@/goals/hooks/use-goal";
import { ObjectUtil } from "@/helper/object-util";
import { useFormData } from "@/hooks/use-form-data";
import type { UpdateGoal } from "@/types/goal";
import { useParams } from "react-router";

type UseFormUpdateGoalProps = {
  initialData: UpdateGoal;
};

export const useFormUpdateGoal = ({ initialData }: UseFormUpdateGoalProps) => {
  const { teamId, counterId } = useParams();
  const { goalUpdate } = useGoal(teamId, counterId);

  const { formData, updateField, handleSubmit, resetFormData } = useFormData(
    initialData,
    (formData) => goalUpdate.mutate(ObjectUtil.onlyTruthyValues(formData))
  );

  return {
    formData,
    resetFormData,
    updateField,
    handleSubmit,
    isPending: goalUpdate.isPending,
    isError: goalUpdate.isError,
    isSuccess: goalUpdate.isSuccess,
  };
};

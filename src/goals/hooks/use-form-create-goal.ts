import { useGoal } from "@/goals/hooks/use-goal";
import { useFormData } from "@/hooks/use-form-data";
import type { CreateGoal } from "@/types/goal";
import { useParams } from "react-router";

const INITIAL_CREATE_GOAL: CreateGoal = {
  description: "",
  targetDays: 1,
};

export const useFormCreateGoal = () => {
  const { teamId, counterId } = useParams();
  const { goalCreate } = useGoal(teamId, counterId);
  // const navigate = useNavigate();

  const { formData, updateField, handleSubmit, resetFormData } = useFormData(
    INITIAL_CREATE_GOAL,
    (formData) => goalCreate.mutate(formData)
  );

  return {
    formData,
    resetFormData,
    updateField,
    handleSubmit,
    isPending: goalCreate.isPending,
    isError: goalCreate.isError,
    isSuccess: goalCreate.isSuccess,
  };
};

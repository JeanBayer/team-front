import { ObjectUtil } from "@/helper/object-util";
import { useFormData } from "@/hooks/use-form-data";
import type { UpdateCounter } from "@/types/counter";
import { useNavigate, useParams } from "react-router";
import { useCounter } from "../../../hooks/use-counter";

type UseFormUpdateCounterProps = {
  initialFormData: UpdateCounter;
};

export const useFormUpdateCounter = ({
  initialFormData,
}: UseFormUpdateCounterProps) => {
  const { teamId, counterId } = useParams();
  const { counterUpdate } = useCounter(teamId, counterId);
  const navigate = useNavigate();

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => counterUpdate.mutate(ObjectUtil.onlyTruthyValues(formData))
  );

  if (counterUpdate.isSuccess) {
    navigate(`/teams/${teamId}/counters/${counterId}`);
  }

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: counterUpdate.isPending,
    isError: counterUpdate.isError,
  };
};

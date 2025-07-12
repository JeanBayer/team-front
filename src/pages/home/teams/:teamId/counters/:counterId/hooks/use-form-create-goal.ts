import { useFormData } from "@/hooks/use-form-data";

const INITIAL_CREATE_GOAL = {
  description: "",
  targetDays: 1,
};

export const useFormCreateGoal = () => {
  // const { teamId } = useParams();
  // const { counterCreate } = useCounter(teamId);
  // const navigate = useNavigate();

  const { formData, updateField, handleSubmit, resetFormData } = useFormData(
    INITIAL_CREATE_GOAL,
    (formData) => console.log(formData)
  );

  return {
    formData,
    resetFormData,
    updateField,
    handleSubmit,
    isPending: false,
    isError: false,
  };
};

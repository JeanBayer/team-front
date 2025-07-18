import { useFormData } from "@/hooks/use-form-data";
import { useThankYouRetrospective } from "@/thank-you/hooks/use-thank-you-retrospective";
import { useParams } from "react-router";

const initialFormData = {
  userId: "",
  message: "",
};

export const useFormCreateThankYou = () => {
  const { teamId, retroId } = useParams();
  const { thankYouCreate } = useThankYouRetrospective(teamId, retroId);

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => thankYouCreate.mutate(formData)
  );

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: thankYouCreate.isPending,
    isError: thankYouCreate.isError,
  };
};

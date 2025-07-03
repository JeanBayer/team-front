import { useState } from "react";
import { useNavigate } from "react-router";
import { useTeam } from "../../hooks/use-team";

const initialFormData = {
  name: "team with counter - increment",
  joinPassword: "123",
};

export const useFormCreateTeam = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { teamCreate } = useTeam();
  const navigate = useNavigate();

  function updateField(key: string, value: string) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    teamCreate.mutate(formData);
  }

  if (teamCreate.isSuccess) navigate("/teams");

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: teamCreate.isPending,
    isError: teamCreate.isError,
  };
};

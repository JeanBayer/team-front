import { useState } from "react";
import { useCreateAccount } from "./use-create-account";

const initialFormData = {
  name: "jhan",
  email: "jhanbayer@gmail.com",
  password: "123-Jhan",
};

export const useFormCreateAccount = () => {
  const [formData, setFormData] = useState(initialFormData);
  const createMutation = useCreateAccount();

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
    createMutation.mutate(formData);
  }

  return {
    formData,
    updateField,
    handleSubmit,
    isPending: createMutation.isPending,
    isError: createMutation.isError,
  };
};

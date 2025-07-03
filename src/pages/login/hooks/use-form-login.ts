import { useState } from "react";
import { useLogin } from "./use-login";

const initialFormData = {
  email: "jhanbayer@gmail.com",
  password: "123-Jhan",
};

export const useFormLogin = () => {
  const [formData, setFormData] = useState(initialFormData);
  const createMutation = useLogin();

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

import { useState } from "react";

const initialFormData = { name: "", email: "", password: "" };

export const useCreateAccount = () => {
  const [formData, setFormData] = useState(initialFormData);

  function updateField(key: string, value: string) {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: mutate
  }

  return {
    formData,
    updateField,
    handleSubmit,
  };
};

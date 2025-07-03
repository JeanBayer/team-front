import { useState } from "react";

export const useFormData = <T>(
  initialFormData: T,
  callbackSubmit: (formData: T) => void
) => {
  const [formData, setFormData] = useState(initialFormData);

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
    callbackSubmit(formData);
  }

  return {
    formData,
    updateField,
    handleSubmit,
  };
};

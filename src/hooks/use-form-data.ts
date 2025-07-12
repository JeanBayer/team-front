import { useState } from "react";

export const useFormData = <T>(
  initialFormData: T,
  callbackSubmit: (formData: T) => void
) => {
  const [formData, setFormData] = useState(initialFormData);

  function resetFormData() {
    setFormData(initialFormData);
  }

  function updateField(key: string, value: string | number) {
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
    resetFormData,
    updateField,
    handleSubmit,
  };
};

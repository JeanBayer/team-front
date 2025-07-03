import { instance } from "@/api/api";
import { useState } from "react";

const initialFormData = { name: "jhan", email: "jhanbayer@gmail.com", password: "123456" };

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: mutate

    try {
      const { data } = await instance.get("/auth/verify");
      console.log({ data });
    } catch (error) {
      console.error({ error });
    }
  }

  return {
    formData,
    updateField,
    handleSubmit,
  };
};

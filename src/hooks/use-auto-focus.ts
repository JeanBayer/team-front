import { useEffect, useRef } from "react";

export const useAutoFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef.current]);

  return inputRef;
};

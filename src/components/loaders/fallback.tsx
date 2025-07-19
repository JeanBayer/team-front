import type React from "react";

type FallbackProps = {
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
  children: React.ReactNode;
};

export const Fallback = ({
  isLoading = false,
  loadingComponent = <></>,
  children,
}: FallbackProps) => {
  if (isLoading) return loadingComponent;

  return children;
};

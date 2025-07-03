import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import type { PropsWithChildren } from "react";
import { useParams } from "react-router";

export const AdminConditional = ({ children }: PropsWithChildren) => {
  const { teamId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);

  if (!isAdmin) return null;
  return children;
};

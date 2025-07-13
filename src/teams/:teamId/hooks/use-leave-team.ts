import { useMembership } from "@/teams/hooks/use-membership";
import { useNavigate } from "react-router";

export const useLeaveTeam = () => {
  const { teamLeave } = useMembership();

  const navigate = useNavigate();

  function handleLeave(teamId: string) {
    teamLeave.mutate(teamId || "");
  }

  if (teamLeave.isSuccess) navigate("/teams");

  return {
    handleLeave,
  };
};

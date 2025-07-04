import { useNavigate } from "react-router";
import { useMembership } from "../../hooks/use-membership";

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

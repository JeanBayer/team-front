import { useNavigate } from "react-router";
import { useTeam } from "../../hooks/use-team";

export const useLeaveTeam = () => {
  const { teamLeave } = useTeam();

  const navigate = useNavigate();

  function handleLeave(teamId: string) {
    teamLeave.mutate(teamId || "");
  }

  if (teamLeave.isSuccess) navigate("/teams");

  return {
    handleLeave,
  };
};

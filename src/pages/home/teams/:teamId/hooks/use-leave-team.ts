import { useNavigate, useParams } from "react-router";
import { useTeam } from "../../hooks/use-team";

export const useLeaveTeam = () => {
  const { teamLeave } = useTeam();
  const { teamId } = useParams();
  const navigate = useNavigate();

  function handleLeave() {
    teamLeave.mutate(teamId || "");
  }

  if (teamLeave.isSuccess) navigate("/teams");

  return {
    teamId,
    handleLeave,
  };
};

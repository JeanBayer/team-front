import { useLeaveTeam } from "./hooks/use-leave-team";

export const TeamIdPage = () => {
  const { teamId, handleLeave } = useLeaveTeam();

  return (
    <div>
      {teamId}
      <button onClick={handleLeave}>leave</button>
    </div>
  );
};

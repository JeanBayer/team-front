import { Link } from "react-router";
import { useLeaveTeam } from "./hooks/use-leave-team";

export const TeamIdPage = () => {
  const { teamId, handleLeave } = useLeaveTeam();

  return (
    <div>
      {teamId}
      <button onClick={handleLeave}>leave</button>

      <main>
        <section>
          <div>
            <Link to="retrospectives">Retros</Link>
          </div>
          <div>
            <Link to="counters">Counters</Link>
          </div>
          <div>
            <Link to="members">Miembros</Link>
          </div>
        </section>
        <section>
          
        </section>
      </main>
    </div>
  );
};

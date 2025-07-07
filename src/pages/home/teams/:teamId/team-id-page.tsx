import { AdminConditional } from "@/components/membership/admin-conditional";
import { Link, useParams } from "react-router";
import { useTeam } from "../hooks/use-team";
import { useLeaveTeam } from "./hooks/use-leave-team";

export const TeamIdPage = () => {
  const { teamId } = useParams();
  const { handleLeave } = useLeaveTeam();
  const { teamRanking } = useTeam(teamId);

  if (!teamId) return <div>sin id</div>;

  return (
    <div>
      <header>
        {teamId}
        <button onClick={() => handleLeave(teamId)}>leave</button>
        <AdminConditional>
          <Link to="edit">edit</Link>
        </AdminConditional>
      </header>

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
          <h3>Ranking elegido del sprint</h3>
          <ol>
            {teamRanking.data?.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span>
                <span>{user.teamSprintWinner}</span>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
};

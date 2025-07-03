import { Link } from "react-router";
import { useTeam } from "./hooks/use-team";

export const TeamsPage = () => {
  const { teamsData } = useTeam();
  return (
    <div>
      <header>
        <Link to="/">Home</Link>
      </header>
      <main>
        <section>
          <Link to="/teams/create">Create</Link>
          <Link to="/teams/join">Join</Link>
        </section>
        <section>
          <ul>
            {teamsData.data?.map((team) => (
              <li key={team.id}>
                <Link to={`/teams/${team.id}`}>{team.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

import { Header } from "@/components/header/header";
import { AdminConditional } from "@/components/membership/admin-conditional";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { Link, useParams } from "react-router";
import { useTeam } from "../hooks/use-team";
import { useLeaveTeam } from "./hooks/use-leave-team";

export const TeamIdPage = () => {
  const { teamId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { handleLeave } = useLeaveTeam();
  const { teamRanking, teamData } = useTeam(teamId);

  if (!teamId) return <div>sin id</div>;

  return (
    <div>
      <header>
        <button onClick={() => handleLeave(teamId)}>leave</button>
        <AdminConditional>
          <Link to="edit">edit</Link>
        </AdminConditional>
      </header>

      <Header
        title={teamData.data?.name || ""}
        menuItems={[
          {
            to: "edit",
            label: "Editar",
            isDisabled: !isAdmin,
          },
          {
            to: "",
            label: "Salirse",
            type: "out",
            onClick: () => handleLeave(teamId),
          },
          {
            to: "retrospectives",
            label: "Retros",
          },
          {
            to: "counters",
            label: "Counters",
          },
          {
            to: "members",
            label: "Miembros",
          },
        ]}
        breadcrumbList={[
          {
            to: "/",
            label: "Home",
          },
          {
            to: "/teams",
            label: "Mis equipos",
          },
        ]}
        breadcrumbPage={teamData.data?.name || ""}
      />

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

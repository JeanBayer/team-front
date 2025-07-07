import { AdminConditional } from "@/components/membership/admin-conditional";
import { Link, useParams } from "react-router";
import { useRetro } from "../hooks/use-retro";

export const RetroIdPage = () => {
  const { teamId, retroId } = useParams();
  const { retro } = useRetro(teamId, retroId);

  if (retro.isLoading) return <div>loading...</div>;
  if (retro.isError) return <div>error...</div>;

  return (
    <div>
      <header>
        <Link to="..">Volver</Link>
        <h1>{retro.data?.retrospectiveName}</h1>
        <AdminConditional>
          <Link to="editar">Editar</Link>
        </AdminConditional>
      </header>
      <main>
        <section></section>

        <section></section>
      </main>
    </div>
  );
};

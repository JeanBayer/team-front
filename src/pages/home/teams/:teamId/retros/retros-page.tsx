import { Link, useParams } from "react-router";
import { useRetro } from "./hooks/use-retro";

export const RetrosPage = () => {
  const { teamId } = useParams();
  const { retros } = useRetro(teamId);

  return (
    <div>
      <header>
        <Link to="..">Volver</Link>
        <h1>RetrosPage</h1>
        <Link to="create">Crear</Link>
      </header>
      <main>
        <section>
          {retros.data?.map((retro) => (
            <Link to={`${retro.id}`} key={retro.id}>
              <div>
                <h3>{retro.retrospectiveName}</h3>
                <p>{retro.status}</p>
                {retro.sprintWinner?.name ? (
                  <p>Elegido: {retro.sprintWinner?.name}</p>
                ) : null}
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

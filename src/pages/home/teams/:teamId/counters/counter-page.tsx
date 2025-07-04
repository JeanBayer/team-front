import { Link, useParams } from "react-router";
import { useCounter } from "./hooks/use-counter";

export const CounterPage = () => {
  const { teamId } = useParams();
  const { counters } = useCounter(teamId);

  return (
    <div>
      <header>
        <Link to="..">Volver</Link>
        <h1>counterPage</h1>
        <Link to="create">Crear</Link>
      </header>
      <main>
        <section>
          {counters.data?.map((counter) => (
            <Link to={`${counter.id}`} key={counter.id}>
              <div>
                <h3>{counter.name}</h3>
                <p>{counter.currentCount}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
};

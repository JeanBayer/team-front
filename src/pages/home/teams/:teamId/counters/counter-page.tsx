import { Link, useParams } from "react-router";
import { useCounter } from "./hooks/use-counter";

export const CounterPage = () => {
  const { teamId } = useParams();
  const { counters } = useCounter(teamId);

  return (
    <div>
      <header>
        <Link to="-1">Volver</Link>
        <h1>counterPage</h1>
        <Link to="create">Crear</Link>
      </header>
      <main>
        <section>
          {counters.data?.map((counter) => (
            <div key={counter.id}>
              <h3>{counter.name}</h3>
              <p>{counter.currentCount}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

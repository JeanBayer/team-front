import { AdminConditional } from "@/components/membership/admin-conditional";
import { Link, useParams } from "react-router";
import { useCounter } from "../hooks/use-counter";

export const CounterIdPage = () => {
  const { teamId, counterId } = useParams();
  const { counter } = useCounter(teamId, counterId);

  if (counter.isLoading) return <div>loading...</div>;
  if (counter.isError) return <div>error...</div>;

  return (
    <div>
      <header>
        <Link to="..">Volver</Link>
        <h1>CounterIdPage</h1>
        <AdminConditional>
          <Link to="editar">Editar</Link>
        </AdminConditional>
      </header>
      <main>
        <section>
          <h3>{counter.data?.name}</h3>
          <h5>{counter.data?.currentCount}</h5>
          {counter.data?.alreadyModifiedToday ? null : (
            <>
              <button>{counter.data?.incrementButtonLabel}</button>
              <button>{counter.data?.resetButtonLabel}</button>
            </>
          )}
        </section>

        <section>
          <p>Contador mas alto: {counter.data?.longestStreak}</p>
          <p>Contador mas reciente {counter.data?.longestStreak}</p>
        </section>
      </main>
    </div>
  );
};

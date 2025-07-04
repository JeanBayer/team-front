import { Link } from "react-router";
import { useFormCreateCounter } from "./hooks/use-form-create-counter";

export const CreateCounterPage = () => {
  const { formData, handleSubmit, updateField, isPending } =
    useFormCreateCounter();

  return (
    <div>
      <header>
        <Link to="..">Volver</Link>
        <h1>CreateCounterPage</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nombre del contador:</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </label>

          <label>
            <span>Label de incremento:</span>
            <input
              type="text"
              value={formData.incrementButtonLabel}
              onChange={(e) =>
                updateField("incrementButtonLabel", e.target.value)
              }
              required
            />
          </label>

          <label>
            <span>Label del reset:</span>
            <input
              type="text"
              value={formData.resetButtonLabel}
              onChange={(e) => updateField("resetButtonLabel", e.target.value)}
              required
            />
          </label>

          <input type="submit" value="Crear" disabled={isPending} />
        </form>
      </main>
    </div>
  );
};

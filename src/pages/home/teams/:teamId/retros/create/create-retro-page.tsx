import { Link } from "react-router";
import { useFormCreateRetro } from "./hooks/use-form-create-retro";

export const CreateRetroPage = () => {
  const { formData, handleSubmit, updateField, isPending } =
    useFormCreateRetro();

  return (
    <div>
      <header>
        <Link to="..">Volver</Link>
        <h1>CreateRetroPage</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nombre de la retrospectiva:</span>
            <input
              type="text"
              value={formData.retrospectiveName}
              onChange={(e) => updateField("retrospectiveName", e.target.value)}
              required
            />
          </label>

          <input type="submit" value="Crear" disabled={isPending} />
        </form>
      </main>
    </div>
  );
};

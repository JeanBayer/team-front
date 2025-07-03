import { Link } from "react-router";
import { useFormCreateTeam } from "./hooks/use-form-create-team";

export const CreateTeamPage = () => {
  const { formData, updateField, handleSubmit, isPending } =
    useFormCreateTeam();
  return (
    <div>
      <header>
        <Link to="/teams">volver</Link>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nombre equipo</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </label>

          <label>
            <span>Contraseña equipo</span>
            <input
              type="password"
              value={formData.joinPassword}
              onChange={(e) => updateField("password", e.target.value)}
              required
            />
          </label>

          <input type="submit" value="Crear" disabled={isPending} />
        </form>
      </main>
    </div>
  );
};

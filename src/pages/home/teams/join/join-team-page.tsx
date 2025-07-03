import { Link } from "react-router";
import { useFormJoinTeam } from "./hooks/use-form-join-team";

export const JoinTeamPage = () => {
  const { formData, updateField, handleSubmit, isPending } = useFormJoinTeam();
  return (
    <div>
      <header>
        <Link to="/teams">volver</Link>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            <span>ID equipo</span>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => updateField("id", e.target.value)}
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

          <input type="submit" value="Unirme" disabled={isPending} />
        </form>
      </main>
    </div>
  );
};

import { Header } from "@/components/header/header";
import { useFormJoinTeam } from "./hooks/use-form-join-team";

export const JoinTeamPage = () => {
  const { formData, updateField, handleSubmit, isPending } = useFormJoinTeam();
  return (
    <div>
      <Header
        title="Unirme a un equipo"
        breadcrumbList={[
          {
            to: "/",
            label: "Home",
          },
          {
            to: "/teams",
            label: "Mi equipo",
          },
        ]}
        breadcrumbPage="Unirse a un equipo"
      />
      <section className="flex gap-8 flex-wrap justify-center py-8 px-12 max-w-2xl mx-auto">
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
      </section>
    </div>
  );
};

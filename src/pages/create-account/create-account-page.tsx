import { Link } from "react-router";
import { useFormCreateAccount } from "./hooks/use-form-create-account";

export const CreateAccountPage = () => {
  const { formData, updateField, handleSubmit, isPending } =
    useFormCreateAccount();
  return (
    <div>
      <header>
        <Link to="/landing">volver</Link>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nombre</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
          </label>

          <label>
            <span>Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
            />
          </label>

          <label>
            <span>Contraseña</span>
            <input
              type="password"
              value={formData.password}
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

import { Link } from "react-router";
import { useFormLogin } from "./hooks/use-form-login";

export const LoginPage = () => {
  const { formData, updateField, handleSubmit, isPending } = useFormLogin();
  return (
    <div>
      <header>
        <Link to="/landing">volver</Link>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
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

          <input type="submit" value="Entrar" disabled={isPending} />
        </form>
      </main>
    </div>
  );
};

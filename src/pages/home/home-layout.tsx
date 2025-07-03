import { deleteAuthData } from "@/helper/extract-data";
import { Link, Outlet, useNavigate } from "react-router";

export const HomeLayout = () => {
  const navigate = useNavigate();

  function handleLogout() {
    deleteAuthData();
    navigate("/landing");
  }

  return (
    <div>
      <nav>
        <Link to="/user">Usuario</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/thank-you">Agradecimientos</Link>

        <button onClick={handleLogout}>Logout</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

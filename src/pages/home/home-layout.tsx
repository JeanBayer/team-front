import { Link, Outlet } from "react-router";

export const HomeLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/teams">Teams</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

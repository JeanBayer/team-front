import { Link } from "react-router";

export const LandingPage = () => {
  return (
    <div>
      <header>
        <Link to="/login">Login</Link>
        <Link to="/create-account">Create Account</Link>
      </header>
      <main></main>
    </div>
  );
};

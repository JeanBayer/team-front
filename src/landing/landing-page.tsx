import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export const LandingPage = () => {
  return (
    <div>
      <header>
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/create-account">
          <Button variant="link">Create Account</Button>
        </Link>
      </header>
      <main></main>
    </div>
  );
};

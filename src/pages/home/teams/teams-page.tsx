import { useState } from "react";
import { Link } from "react-router";

export const TeamsPage = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>TeamsPage</h1>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>up</button>
    </div>
  );
};

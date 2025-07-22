import { GoalLoader } from "./goal-loader";

const GOALS = new Array(6).fill(null);

export const GoalListLoader = () => {
  return (
    <>
      {GOALS.map((_, i) => (
        <GoalLoader key={i} />
      ))}
    </>
  );
};

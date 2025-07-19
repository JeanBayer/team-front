import { CardLoader } from "@/components/loaders/card-loader";

const CARDS = new Array(6).fill(null);

export const TeamsPageLoading = () => {
  return (
    <>
      {CARDS.map((_, i) => (
        <CardLoader key={i} />
      ))}
    </>
  );
};

import { CardLoader } from "@/components/loaders/card-loader";

const CARDS = new Array(12).fill(null);

export const CountersPageLoading = () => {
  return (
    <>
      {CARDS.map((_, i) => (
        <CardLoader key={i} size={40} />
      ))}
    </>
  );
};

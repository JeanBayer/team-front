import { CardLoader } from "@/components/loaders/card-loader";

const THANK_YOU_LIST = new Array(12).fill(null);

export const ThankYouListLoading = () => {
  return (
    <>
      {THANK_YOU_LIST.map((_, i) => (
        <CardLoader key={i} size={64} />
      ))}
    </>
  );
};

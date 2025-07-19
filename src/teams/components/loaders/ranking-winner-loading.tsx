import { Skeleton } from "@/components/ui/skeleton";

const MEMBERS = new Array(8).fill(null);

export const RankingWinnerLoading = () => {
  return (
    <>
      {MEMBERS.map((_, i) => (
        <li key={i} className="flex gap-8 text-sm">
          <Skeleton className="flex-1 h-4" />
          <Skeleton className="w-5 h-4" />
        </li>
      ))}
    </>
  );
};

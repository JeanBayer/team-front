import { Skeleton } from "@/components/ui/skeleton";

export const GoalLoader = () => {
  return (
    <div className="flex mb-2 items-center justify-between bg-card border-2 p-4 rounded-b-lg">
      <div>
        <Skeleton className="h-4 w-36 mb-2" />
        <Skeleton className="h-4 w-46" />
      </div>
      <Skeleton className="h-8 w-4" />
    </div>
  );
};

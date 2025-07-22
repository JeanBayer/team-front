import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CounterInfoLoader = () => {
  return (
    <Card className="flex-1 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
      <CardContent>
        <div className="flex flex-col gap-2 justify-between text-center">
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
};

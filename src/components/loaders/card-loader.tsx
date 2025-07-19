import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const CardLoader = () => {
  return (
    <Card className="w-64 h-64 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center">
      <CardContent className="w-full">
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
};

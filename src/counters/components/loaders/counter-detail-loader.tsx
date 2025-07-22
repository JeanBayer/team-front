import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CounterDetailLoader = () => {
  return (
    <Card className="w-xs min-h-52 hover:shadow-lg hover:border-blue-300 transition-all duration-300 ">
      <CardHeader className="flex-1">
        <CardTitle className="text-center text-lg font-semibold text-blue-500 line-clamp-3">
          <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <Skeleton className="h-8 w-1/2 mx-auto" />
      </CardContent>
      <CardFooter className="w-full">
        <div className="w-full flex flex-wrap flex-col justify-center sm:flex-row sm:justify-between gap-4">
          <Skeleton className="min-w-30 h-8 max-w-full w-full sm:w-auto" />
          <Skeleton className="min-w-30 h-8 max-w-full w-full sm:w-auto" />
        </div>
      </CardFooter>
    </Card>
  );
};

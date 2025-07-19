import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type CardLoaderProps = {
  size?: number;
};

export const CardLoader = ({ size = 64 }: CardLoaderProps) => {
  return (
    <Card
      className={`w-${size} h-${size} hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center`}
    >
      <CardContent className="w-full">
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
};

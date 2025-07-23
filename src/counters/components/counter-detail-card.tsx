import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Counter } from "@/types/counter";
import { ButtonDialogReset } from "./button-dialog-reset";

type CounterDetailCardProps = {
  counter: Counter;
  handleCounterIncrement?: () => void;
};

export const CounterDetailCard = ({
  counter,
  handleCounterIncrement,
}: CounterDetailCardProps) => {
  return (
    <Card className="w-xs min-h-52 hover:shadow-lg hover:border-blue-300 transition-all duration-300 ">
      <CardHeader className="flex-1">
        <CardTitle className="text-center text-lg font-semibold text-blue-500 line-clamp-3">
          <h3>{counter?.name}</h3>
          <p className="text-gray-500 text-xs font-normal">
            {new Date(counter?.createdAt!).toLocaleDateString()}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-center text-2xl">
          <strong>{counter?.currentCount}</strong>
        </p>
      </CardContent>
      <CardFooter className="w-full">
        {!counter?.alreadyModifiedToday && (
          <div className="w-full flex flex-wrap flex-col justify-center sm:flex-row sm:justify-between gap-4">
            <Button
              onClick={handleCounterIncrement}
              className="cursor-pointer min-w-30 max-w-full w-full sm:w-auto"
            >
              {counter?.incrementButtonLabel}
            </Button>
            <ButtonDialogReset>{counter?.resetButtonLabel}</ButtonDialogReset>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

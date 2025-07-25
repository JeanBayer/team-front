import { CircleSlash, TimerIcon } from "lucide-react";
import Countdown, { type CountdownRenderProps } from "react-countdown";
import { AdminConditional } from "../membership/admin-conditional";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type TimerCountdownProps = {
  date: string;
  onComplete: () => void;
  onCancel: () => void;
};

export const TimerCountdown = ({
  date,
  onComplete,
  onCancel,
}: TimerCountdownProps) => (
  <div className="flex items-center gap-1 relative z-10">
    <Countdown date={date} renderer={renderer} onComplete={onComplete} />
    <AdminConditional>
      <Button
        variant="destructive"
        onClick={onCancel}
        className="cursor-pointer"
      >
        <CircleSlash className="inline h-4 w-4" />
      </Button>
    </AdminConditional>
  </div>
);

const renderer = ({ minutes, seconds }: CountdownRenderProps) => {
  return (
    <div className="w-full flex justify-end">
      <Badge className="text-sm p-2">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
        <TimerIcon className="inline ml-1 h-4 w-4" />
      </Badge>
    </div>
  );
};

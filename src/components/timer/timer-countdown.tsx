import { TimerIcon } from "lucide-react";
import Countdown, { type CountdownRenderProps } from "react-countdown";
import { Badge } from "../ui/badge";

type TimerCountdownProps = {
  date: string;
  onComplete: () => void;
};

export const TimerCountdown = ({ date, onComplete }: TimerCountdownProps) => (
  <Countdown date={date} renderer={renderer} onComplete={onComplete} />
);

const renderer = ({ minutes, seconds }: CountdownRenderProps) => {
  return (
    <div className="w-full flex justify-end relative z-10">
      <Badge className="text-sm p-2">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
        <TimerIcon className="inline ml-1 h-4 w-4" />
      </Badge>
    </div>
  );
};

import { useFormData } from "@/hooks/use-form-data";
import { useTimer } from "@/hooks/use-timer";
import { TimerIcon } from "lucide-react";
import { useState } from "react";
import Countdown, { type CountdownRenderProps } from "react-countdown";
import { useParams } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

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
const initialFormData = {
  minutes: "05",
};

const TimerForm = () => {
  const { teamId } = useParams();
  const { timerCreate } = useTimer(teamId);

  const { formData, updateField, handleSubmit } = useFormData(
    initialFormData,
    (formData) => {
      timerCreate.mutate({
        minutes: Number(formData.minutes),
      });
    }
  );

  const handleUpdateTimeField = (key: string, value: string | number) => {
    if (isNaN(Number(value)) || value === "" || Number(value) <= 0) {
      return updateField(key, "");
    }

    const valueAsString = value.toString();

    if (valueAsString.length > 2 && valueAsString[0] === "0") {
      const totalValueLength = valueAsString.length;
      return updateField(key, valueAsString.slice(1, totalValueLength));
    }

    updateField(key, valueAsString.padStart(2, "0"));
  };

  const handleDown1Minute = () => {
    const minutes = parseInt(formData.minutes, 10);

    if (isNaN(minutes) || minutes <= 1) {
      return;
    }

    if (minutes > 0) {
      handleUpdateTimeField(
        "minutes",
        (minutes - 1).toString().padStart(2, "0")
      );
    }
  };

  const handleUp1Minute = () => {
    const minutes = parseInt(formData.minutes, 10);

    if (isNaN(minutes)) {
      return;
    }

    handleUpdateTimeField("minutes", (minutes + 1).toString().padStart(2, "0"));
  };

  return (
    <DialogContent>
      <DialogHeader className="px-4">
        <DialogTitle>Poner Timer</DialogTitle>
        <DialogDescription>
          Indica el tiempo en minutos que durará el evento.
        </DialogDescription>
      </DialogHeader>
      <form
        className="w-full flex flex-col items-center gap-4 sm:flex-row sm:justify-between px-4"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center gap-2">
          <Button type="button" onClick={handleDown1Minute} variant="ghost">
            -
          </Button>
          <Input
            type="number"
            min={1}
            placeholder="01"
            className="w-16"
            value={formData.minutes}
            onChange={(e) => handleUpdateTimeField("minutes", e.target.value)}
            required
          />
          :
          <Input
            type="string"
            placeholder="00"
            className="w-14"
            readOnly
            value="00"
          />
          <Button type="button" onClick={handleUp1Minute} variant="ghost">
            +
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full sm:w-24 cursor-pointer max-w-[260px]"
        >
          Empezar
        </Button>
      </form>
    </DialogContent>
  );
};

export const Timer = () => {
  const [initialState, setInitialState] = useState(true);

  const { teamId } = useParams();
  const { timer } = useTimer(teamId);

  if (timer.isLoading) return null;

  if (!timer.data && initialState)
    return (
      <div className="w-full flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <TimerIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <TimerForm />
        </Dialog>
      </div>
    );

  if (timer.data)
    return (
      <Countdown
        date={timer.data?.endsAt?.toString()}
        renderer={renderer}
        onComplete={() => {
          timer.refetch();
          setInitialState(true);
        }}
      />
    );
};

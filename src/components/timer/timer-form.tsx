import { useFormData } from "@/hooks/use-form-data";
import { useTimer } from "@/hooks/use-timer";
import { Loader2Icon } from "lucide-react";
import { useParams } from "react-router";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

const initialFormData = {
  minutes: "05",
};

export const TimerForm = () => {
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
    if (isNaN(Number(value)) || value === "" || Number(value) <= 0)
      return updateField(key, "");

    const valueAsString = value.toString();

    if (valueAsString.length > 2 && valueAsString[0] === "0")
      return updateField(key, valueAsString.slice(1, valueAsString.length));

    updateField(key, valueAsString.padStart(2, "0"));
  };

  const handleDown1Minute = () => {
    const minutes = parseInt(formData.minutes, 10);
    if (isNaN(minutes) || minutes <= 1) return;
    if (minutes > 0)
      handleUpdateTimeField(
        "minutes",
        (minutes - 1).toString().padStart(2, "0")
      );
  };

  const handleUp1Minute = () => {
    const minutes = parseInt(formData.minutes, 10);
    if (isNaN(minutes)) return;
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
          value="Empezar"
          className="w-full sm:w-24 cursor-pointer max-w-[260px]"
          disabled={timerCreate.isPending}
        >
          {timerCreate.isPending && <Loader2Icon className="animate-spin" />}
          Empezar
        </Button>
      </form>
    </DialogContent>
  );
};

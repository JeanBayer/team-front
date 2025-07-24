import { TimerIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { TimerForm } from "./timer-form";

export const TimerInitial = () => (
  <div className="w-full flex justify-end relative z-10">
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <TimerIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <TimerForm />
    </Dialog>
  </div>
);

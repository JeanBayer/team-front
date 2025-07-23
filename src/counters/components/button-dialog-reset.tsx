import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { type PropsWithChildren } from "react";
import { CounterResetModal } from "./counter-reset-modal";

export const ButtonDialogReset = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="cursor-pointer min-w-30 max-w-full w-full sm:w-auto"
        >
          {children}
        </Button>
      </DialogTrigger>
      <CounterResetModal />
    </Dialog>
  );
};

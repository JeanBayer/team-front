import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { useFormResetCounter } from "../hooks/use-form-reset-counter";

export const CounterResetModal = () => {
  const { formData, updateField, handleSubmit, isPending } =
    useFormResetCounter();
  return (
    <DialogContent>
      <DialogHeader className="px-4">
        <DialogTitle>Reset evento</DialogTitle>
        <DialogDescription>
          Indique el motivo del reseteo del evento.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 px-4">
        <div className="grid w-full max-w-md items-center gap-3">
          <Label htmlFor="nombre-evento">Nombre del evento:</Label>
          <Textarea
            id="nombre-evento"
            placeholder="Bug encontrado"
            minLength={1}
            value={formData.nameEvent}
            onChange={(e) => updateField("nameEvent", e.target.value)}
          />
        </div>
        <Button
          variant="destructive"
          type="submit"
          value="Enviar"
          disabled={isPending}
          className="cursor-pointer"
        >
          {isPending && <Loader2Icon className="animate-spin" />}
          Resetear
        </Button>
      </form>
    </DialogContent>
  );
};

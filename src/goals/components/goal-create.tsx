import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormCreateGoal } from "@/goals/hooks/use-form-create-goal";
import { useAutoFocus } from "@/hooks/use-auto-focus";
import { Save, X } from "lucide-react";

type GoalCreateProps = {
  handleCancel?: () => void;
  handleSuccess?: () => void;
};

export const GoalCreate = ({
  handleCancel = () => {},
  handleSuccess = () => {},
}: GoalCreateProps) => {
  const descriptionRef = useAutoFocus();
  const {
    formData,
    updateField,
    handleSubmit,
    resetFormData,
    isPending,
    isSuccess,
  } = useFormCreateGoal();

  function onClickCancelCreateGoal() {
    resetFormData();
    handleCancel();
  }

  if (isSuccess) {
    resetFormData();
    handleSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mb-2 items-center border-2 justify-between p-4 rounded-b-lg">
        <div className="flex flex-col gap-2">
          <div>
            <Label htmlFor="description-goal" className="text-xs">
              Descripción:
            </Label>
            <Input
              type="text"
              id="description-goal"
              placeholder="Goal"
              ref={descriptionRef}
              autoFocus
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="target-days-goal" className="text-xs">
              Meta:
            </Label>
            <Input
              type="number"
              min={1}
              id="target-days-goal"
              placeholder="1"
              className="w-20"
              value={formData.targetDays}
              onChange={(e) =>
                updateField("targetDays", Number.parseInt(e.target.value) || "")
              }
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-7 h-7 cursor-pointer"
            disabled={isPending}
          >
            <Save size={16} />
          </Button>
          <Button
            className="w-7 h-7 cursor-pointer"
            variant="destructive"
            onClick={onClickCancelCreateGoal}
            disabled={isPending}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </form>
  );
};

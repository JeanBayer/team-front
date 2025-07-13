import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormUpdateGoal } from "@/goals/hooks/use-form-update-goal";
import type { Goal } from "@/types/goal";
import { Save, X } from "lucide-react";

type GoalUpdateProps = {
  goal: Goal;
  handleCancel?: () => void;
  handleSuccess?: () => void;
};

export const GoalUpdate = ({
  goal,
  handleCancel = () => {},
  handleSuccess = () => {},
}: GoalUpdateProps) => {
  const { formData, updateField, handleSubmit, resetFormData, isPending } =
    useFormUpdateGoal({
      initialData: {
        id: goal.id,
        description: goal.description,
        targetDays: goal.targetDays,
      },
    });

  function onClickCancelEditGoal() {
    resetFormData();
    handleCancel();
  }

  // if (isSuccess) {
  //   handleSuccess();
  // }

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
        handleSuccess();
      }}
    >
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
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
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
            onClick={onClickCancelEditGoal}
            disabled={isPending}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </form>
  );
};

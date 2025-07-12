import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, X } from "lucide-react";
import { useFormCreateGoal } from "../hooks/use-form-create-goal";

type GoalCreateProps = {
  handleCancel: () => void;
};

export const GoalCreate = ({ handleCancel }: GoalCreateProps) => {
  const { formData, updateField, handleSubmit, resetFormData } =
    useFormCreateGoal();

  function onClickCancelCreateGoal() {
    resetFormData();
    handleCancel();
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
          <Button type="submit" className="w-7 h-7 cursor-pointer">
            <Save size={16} />
          </Button>
          <Button
            className="w-7 h-7 cursor-pointer"
            variant="destructive"
            onClick={onClickCancelCreateGoal}
          >
            <X size={16} />
          </Button>
        </div>
      </div>
    </form>
  );
};

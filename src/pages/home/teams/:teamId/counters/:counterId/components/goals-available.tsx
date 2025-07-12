import { DropdownMenuHeader } from "@/components/header/dropdown-menu-header";
import { CustomTooltip } from "@/components/tooltip/custom-tooltip";
import { MODE_GOAL, TYPE_GOALS, type ModeGoal } from "@/data/goal-enum";
import { ICONS_KEYS } from "@/data/icon-enum";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import type { Goal } from "@/types/goal";
import { useState } from "react";
import { useParams } from "react-router";
import { useGoal } from "../hooks/use-goal";
import { GoalUpdate } from "./goal-update";

type GoalsAvailableProps = {
  goals: Goal[];
  modeGoal: ModeGoal;
  changeModeGoal: (modeGoal: ModeGoal) => void;
  currentCount: number;
};

export const GoalsAvailable = ({
  goals,
  modeGoal,
  changeModeGoal,
  currentCount,
}: GoalsAvailableProps) => {
  const { teamId, counterId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { goalDelete, goalClone } = useGoal(
    teamId,
    counterId,
    TYPE_GOALS.AVAILABLE
  );
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  function handleEditGoal(goal: Goal) {
    setSelectedGoal(goal);
    changeModeGoal(MODE_GOAL.EDIT);
  }

  return (
    <>
      {goals?.map((goal) => {
        if (modeGoal === MODE_GOAL.EDIT && selectedGoal?.id === goal.id)
          return (
            <GoalUpdate
              key={goal.id}
              goal={selectedGoal}
              handleCancel={() => changeModeGoal(MODE_GOAL.EMPTY)}
              handleSuccess={() => changeModeGoal(MODE_GOAL.EMPTY)}
            />
          );

        return (
          <div
            className="flex mb-2 items-center justify-between bg-blue-100 p-4 rounded-b-lg"
            key={goal.id}
          >
            <div>
              <CustomTooltip label={goal.description}>
                <p>
                  <strong className="line-clamp-2">{goal.description}</strong>
                </p>
              </CustomTooltip>
              <p className="text-xs text-gray-600">
                Meta: {goal.targetDays} días / Restantes:{" "}
                {goal.targetDays - currentCount} días
              </p>
            </div>
            <DropdownMenuHeader
              menuItems={[
                {
                  to: "",
                  label: "Editar",
                  type: ICONS_KEYS.EDIT,
                  isDisabled: !isAdmin || modeGoal !== MODE_GOAL.EMPTY,
                  onClick: () => handleEditGoal(goal),
                },
                {
                  to: "",
                  label: "Eliminar",
                  type: ICONS_KEYS.DELETE,
                  isDisabled: !isAdmin,
                  onClick: () => goalDelete.mutate(goal.id),
                },
                {
                  to: "",
                  label: "Clonar",
                  type: ICONS_KEYS.COPY,
                  onClick: () => goalClone.mutate(goal.id),
                },
              ]}
            />
          </div>
        );
      })}
    </>
  );
};

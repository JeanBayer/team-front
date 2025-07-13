import { DropdownMenuHeader } from "@/components/header/dropdown-menu-header";
import { CustomTooltip } from "@/components/tooltip/custom-tooltip";
import { TYPE_GOALS } from "@/data/goal-enum";
import { ICONS_KEYS } from "@/data/icon-enum";
import { useGoal } from "@/goals/hooks/use-goal";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import type { Goal } from "@/types/goal";
import { useParams } from "react-router";

type GoalsAchievedProps = {
  goals: Goal[];
};

export const GoalsAchieved = ({ goals }: GoalsAchievedProps) => {
  const { teamId, counterId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { goalDelete, goalReactivate, goalClone } = useGoal(
    teamId,
    counterId,
    TYPE_GOALS.ACHIEVED
  );

  return (
    <>
      {goals?.map((goal) => (
        <div
          className="flex items-center mb-2 justify-between bg-green-100 p-4 rounded-b-lg"
          key={goal.id}
        >
          <div className="flex-1">
            <CustomTooltip label={goal.description}>
              <p>
                <strong className="line-clamp-2">{goal.description}</strong>
              </p>
            </CustomTooltip>
            <p className="text-xs text-gray-600">
              Meta cumplida: {goal.targetDays} días
            </p>
            <p className="text-xs text-gray-600 text-end">
              {new Date(goal.achievedAt!).toLocaleDateString()}
            </p>
          </div>
          <DropdownMenuHeader
            menuItems={[
              {
                to: "",
                label: "Eliminar",
                type: ICONS_KEYS.DELETE,
                isDisabled: !isAdmin,
                onClick: () => goalDelete.mutate(goal.id),
              },
              {
                to: "",
                label: "Reactivar",
                type: ICONS_KEYS.REACTIVATE,
                isDisabled: !isAdmin,
                onClick: () => goalReactivate.mutate(goal.id),
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
      ))}
    </>
  );
};

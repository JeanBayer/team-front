import { DropdownMenuHeader } from "@/components/header/dropdown-menu-header";
import { CustomTooltip } from "@/components/tooltip/custom-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MODE_GOAL,
  TYPE_GOALS,
  type ModeGoal,
  type TypeGoals,
} from "@/data/goal-enum";
import { ICONS_KEYS } from "@/data/icon-enum";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useState } from "react";
import { useParams } from "react-router";
import { useGoal } from "../hooks/use-goal";
import { GoalCreate } from "./goal-create";
import { GoalsAvailable } from "./goals-available";

type GoalsSectionProps = {
  currentCount: number;
};

export const GoalsSection = ({ currentCount }: GoalsSectionProps) => {
  const { teamId, counterId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const [typeGoals, setTypeGoals] = useState<TypeGoals>(TYPE_GOALS.AVAILABLE);
  const { goals, goalDelete, goalClone, goalReactivate } = useGoal(
    teamId,
    counterId,
    typeGoals
  );
  const [modeGoal, setModeGoal] = useState<ModeGoal>(MODE_GOAL.EMPTY);

  function changeModeGoal(modeGoal: ModeGoal) {
    setModeGoal(modeGoal);
  }

  return (
    <section className="flex flex-col p-4 gap-8 justify-center w-sm">
      <Card>
        <Tabs defaultValue="disponibles" value={typeGoals}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex">
                <DropdownMenuHeader
                  menuItems={[
                    {
                      to: "",
                      label: "Crear",
                      onClick: () => setModeGoal(MODE_GOAL.CREATE),
                      isDisabled:
                        modeGoal !== MODE_GOAL.EMPTY ||
                        typeGoals !== TYPE_GOALS.AVAILABLE,
                    },
                  ]}
                />
                <p>Metas</p>
              </div>
              <TabsList>
                <TabsTrigger
                  value={TYPE_GOALS.AVAILABLE}
                  onClick={() => setTypeGoals(TYPE_GOALS.AVAILABLE)}
                  className="cursor-pointer"
                >
                  Disponibles
                </TabsTrigger>
                <TabsTrigger
                  value={TYPE_GOALS.ACHIEVED}
                  onClick={() => setTypeGoals(TYPE_GOALS.ACHIEVED)}
                  className="cursor-pointer"
                >
                  Completadas
                </TabsTrigger>
              </TabsList>
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <ScrollArea className="h-96">
              <TabsContent value={TYPE_GOALS.AVAILABLE}>
                <GoalsAvailable
                  goals={goals.data || []}
                  modeGoal={modeGoal}
                  changeModeGoal={changeModeGoal}
                  currentCount={currentCount}
                />
              </TabsContent>

              <TabsContent value={TYPE_GOALS.ACHIEVED}>
                {goals.data?.map((goal) => (
                  <div
                    className="flex items-center mb-2 justify-between bg-green-100 p-4 rounded-b-lg"
                    key={goal.id}
                  >
                    <div className="flex-1">
                      <CustomTooltip label={goal.description}>
                        <p>
                          <strong className="line-clamp-2">
                            {goal.description}
                          </strong>
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
              </TabsContent>
            </ScrollArea>
            <div>
              {modeGoal === MODE_GOAL.CREATE && (
                <GoalCreate
                  handleCancel={() => setModeGoal(MODE_GOAL.EMPTY)}
                  handleSuccess={() => setModeGoal(MODE_GOAL.EMPTY)}
                />
              )}
            </div>
          </CardContent>
        </Tabs>
      </Card>
    </section>
  );
};

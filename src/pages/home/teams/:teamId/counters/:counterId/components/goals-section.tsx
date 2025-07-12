import { DropdownMenuHeader } from "@/components/header/dropdown-menu-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MODE_GOAL,
  TYPE_GOALS,
  type ModeGoal,
  type TypeGoals,
} from "@/data/goal-enum";
import { useState } from "react";
import { useParams } from "react-router";
import { useGoal } from "../hooks/use-goal";
import { GoalCreate } from "./goal-create";
import { GoalsAchieved } from "./goals-achieved";
import { GoalsAvailable } from "./goals-available";

type GoalsSectionProps = {
  currentCount: number;
};

export const GoalsSection = ({ currentCount }: GoalsSectionProps) => {
  const { teamId, counterId } = useParams();
  const [typeGoals, setTypeGoals] = useState<TypeGoals>(TYPE_GOALS.AVAILABLE);
  const { goals } = useGoal(teamId, counterId, typeGoals);
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
                <GoalsAchieved goals={goals.data || []} />
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

import { DropdownMenuHeader } from "@/components/header/dropdown-menu-header";
import { Fallback } from "@/components/loaders/fallback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MODE_GOAL,
  TYPE_GOALS,
  type ModeGoal,
  type TypeGoals,
} from "@/data/goal-enum";
import { GoalCreate } from "@/goals/components/goal-create";
import { GoalsAchieved } from "@/goals/components/goals-achieved";
import { GoalsAvailable } from "@/goals/components/goals-available";
import { useGoal } from "@/goals/hooks/use-goal";
import { useState } from "react";
import { useParams } from "react-router";
import { GoalListLoader } from "./loaders/goal-list-loader";

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
      <Card aria-hidden={false}>
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
                <Fallback
                  isLoading={goals.isLoading}
                  loadingComponent={<GoalListLoader />}
                >
                  <GoalsAvailable
                    goals={goals.data || []}
                    modeGoal={modeGoal}
                    changeModeGoal={changeModeGoal}
                    currentCount={currentCount}
                  />
                </Fallback>
              </TabsContent>
              <TabsContent value={TYPE_GOALS.ACHIEVED}>
                <Fallback
                  isLoading={goals.isLoading}
                  loadingComponent={<GoalListLoader />}
                >
                  <GoalsAchieved goals={goals.data || []} />
                </Fallback>
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

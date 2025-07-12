import { DropdownMenuHeader } from "@/components/header/dropdown-menu-header";
import { Header } from "@/components/header/header";
import { CustomTooltip } from "@/components/tooltip/custom-tooltip";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useNavigate, useParams } from "react-router";
import { useTeam } from "../../../hooks/use-team";
import { useCounter } from "../hooks/use-counter";
import { useGoal } from "./hooks/use-goal";

export const CounterIdPage = () => {
  const { teamId, counterId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { teamData } = useTeam(teamId);
  const navigate = useNavigate();
  const { counter, counterIncrement, counterReset, counterDelete } = useCounter(
    teamId,
    counterId
  );
  const { goals } = useGoal(teamId, counterId);

  if (counter.isLoading) return <div>loading...</div>;
  if (counter.isError) return <div>error...</div>;

  if (counterDelete.isSuccess) navigate(`/teams/${teamId}/counters`);

  return (
    <div>
      <Header
        title={counter.data?.name || ""}
        menuItems={[
          {
            to: "edit",
            label: "Editar",
            isDisabled: !isAdmin,
          },
          {
            to: "",
            label: "Eliminar",
            type: "delete",
            onClick: counterDelete.mutate,
            isDisabled: !isAdmin || counterDelete.isPending,
          },
        ]}
        breadcrumbList={[
          {
            to: "/",
            label: "Home",
          },
          {
            type: "dropdown",
            dropdownItems: [
              {
                to: "/teams",
                label: "Mis equipos",
              },
              {
                to: `/teams/${teamId}`,
                label: teamData.data?.name || "",
              },
            ],
          },
          {
            to: `/teams/${teamId}/counters`,
            label: "Contadores",
          },
        ]}
        breadcrumbPage={counter.data?.name || ""}
      />
      <div className="flex py-8 flex-col lg:flex-row justify-center items-center lg:items-start gap-4 h-full mx-auto">
        <section className="flex flex-col gap-8 justify-center p-4 max-w-md">
          <div className="flex gap-8 flex-wrap justify-center">
            <Card className="w-xs min-h-52 hover:shadow-lg hover:border-blue-300 transition-all duration-300 ">
              <CardHeader className="flex-1">
                <CardTitle className="text-center text-lg font-semibold text-blue-500 line-clamp-3">
                  <h3>{counter.data?.name}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-center text-xl">
                  <strong>{counter.data?.currentCount}</strong>
                </p>
              </CardContent>
              <CardFooter className="w-full">
                {!counter.data?.alreadyModifiedToday && (
                  <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
                    <Button
                      onClick={counterIncrement.mutate}
                      className="cursor-pointer min-w-32"
                    >
                      {counter.data?.incrementButtonLabel}
                    </Button>
                    <Button
                      onClick={counterReset.mutate}
                      variant="destructive"
                      className="cursor-pointer min-w-32"
                    >
                      {counter.data?.resetButtonLabel}
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="w-xs flex justify-between gap-4">
            <Card className="flex-1 hover:shadow-lg hover:border-blue-300 transition-all duration-300 ">
              <CardContent>
                <div className="flex flex-col gap-2 justify-between text-center text-xs">
                  <p className="text-sm">
                    <strong>{counter.data?.longestStreak}</strong>
                  </p>
                  <p>
                    <strong>Contador mas alto</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 hover:shadow-lg hover:border-blue-300 transition-all duration-300 ">
              <CardContent>
                <div className="flex flex-col gap-2 justify-between text-center text-xs">
                  <p className="text-sm">
                    <strong>{counter.data?.lastResetDuration}</strong>
                  </p>
                  <p>
                    <strong>Contador mas reciente</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator orientation="horizontal" className="lg:w-[1px]! lg:h-96! " />

        <section className="flex flex-col p-4 gap-8 justify-center max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <p>Metas</p>
                <Tabs defaultValue="disponibles">
                  <TabsList>
                    <TabsTrigger
                      value="disponibles"
                      onClick={(e) => {
                        console.log({ e });
                      }}
                      className="cursor-pointer"
                    >
                      Disponibles
                    </TabsTrigger>
                    <TabsTrigger
                      value="completadas"
                      onClick={(e) => {
                        console.log({ e });
                      }}
                      className="cursor-pointer"
                    >
                      Completadas
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <ScrollArea className="h-96">
                {goals.data?.map((goal) => (
                  <div
                    className="flex items-center justify-between border-2 border-blue-300 p-4 rounded-b-lg first:border-t-2 not-first:border-t-0"
                    key={goal.id}
                  >
                    <div>
                      <CustomTooltip label={goal.description}>
                        <p>
                          <strong className="line-clamp-2">
                            {goal.description}
                          </strong>
                        </p>
                      </CustomTooltip>
                      <p className="text-xs text-gray-600">
                        Meta: {goal.targetDays} días / Restantes:{" "}
                        {goal.targetDays - counter.data?.currentCount!} días
                      </p>
                    </div>
                    <DropdownMenuHeader
                      menuItems={[
                        {
                          to: "",
                          label: "Editar",
                          isDisabled: !isAdmin,
                        },
                      ]}
                    />
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

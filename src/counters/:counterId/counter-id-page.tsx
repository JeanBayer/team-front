import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCounter } from "@/counters/hooks/use-counter";
import { GoalsSection } from "@/goals/components/goals-section";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useTeam } from "@/teams/hooks/use-team";
import { useNavigate, useParams } from "react-router";

export const CounterIdPage = () => {
  const { teamId, counterId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { teamData } = useTeam(teamId);
  const navigate = useNavigate();
  const { counter, counterIncrement, counterReset, counterDelete } = useCounter(
    teamId,
    counterId
  );

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
                <p className="text-center text-2xl">
                  <strong>{counter.data?.currentCount}</strong>
                </p>
              </CardContent>
              <CardFooter className="w-full">
                {!counter.data?.alreadyModifiedToday && (
                  <div className="w-full flex flex-wrap flex-col justify-center sm:flex-row sm:justify-between gap-4">
                    <Button
                      onClick={counterIncrement.mutate}
                      className="cursor-pointer min-w-30 max-w-full w-full sm:w-auto"
                    >
                      {counter.data?.incrementButtonLabel}
                    </Button>
                    <Button
                      onClick={counterReset.mutate}
                      variant="destructive"
                      className="cursor-pointer min-w-30 max-w-full w-full sm:w-auto"
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
                <div className="flex flex-col gap-2 justify-between text-center">
                  <p className="text-sm">
                    <strong>{counter.data?.longestStreak}</strong>
                  </p>
                  <p>
                    <strong className="text-gray-500 text-xs">
                      Contador mas alto
                    </strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 hover:shadow-lg hover:border-blue-300 transition-all duration-300">
              <CardContent>
                <div className="flex flex-col gap-2 justify-between text-center">
                  <p className="text-sm">
                    <strong>{counter.data?.lastResetDuration}</strong>
                  </p>
                  <p>
                    <strong className="text-gray-500 text-xs">
                      Contador mas reciente
                    </strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator orientation="horizontal" className="lg:w-[1px]! lg:h-96!" />

        <GoalsSection currentCount={counter.data?.currentCount || 0} />
      </div>
    </div>
  );
};

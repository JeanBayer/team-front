import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useNavigate, useParams } from "react-router";
import { useTeam } from "../../../hooks/use-team";
import { useCounter } from "../hooks/use-counter";

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
            to: "editar",
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
      <div>
        <section className="flex gap-8 flex-wrap justify-center p-8 max-w-2xl mx-auto">
          <Card className="w-sm min-h-52 hover:shadow-lg hover:border-blue-300 transition-all duration-300 ">
            <CardHeader className="flex-1">
              <CardTitle className="text-center text-lg font-semibold text-blue-500 line-clamp-3">
                <h3>{counter.data?.name}</h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-center">
                <strong>{counter.data?.currentCount}</strong>
              </p>
            </CardContent>
            <CardFooter className="w-full">
              {!counter.data?.alreadyModifiedToday && (
                <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
                  <Button
                    onClick={counterIncrement.mutate}
                    className="cursor-pointer"
                  >
                    {counter.data?.incrementButtonLabel}
                  </Button>
                  <Button
                    onClick={counterReset.mutate}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    {counter.data?.resetButtonLabel}
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </section>

        <section className="flex gap-8 flex-wrap justify-center p-8 max-w-2xl mx-auto">
          <Card className="w-xs hover:shadow-lg hover:border-blue-300 transition-all duration-300 ">
            <CardContent>
              <div className="flex justify-between">
                <p>
                  <strong>Contador mas alto:</strong>
                </p>
                <p>
                  <strong>{counter.data?.longestStreak}</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-xs hover:shadow-lg hover:border-blue-300 transition-all duration-300 ">
            <CardContent>
              <div className="flex justify-between">
                <p>
                  <strong>Contador mas reciente:</strong>
                </p>
                <p>
                  <strong>{counter.data?.lastResetDuration}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

import { Header } from "@/components/header/header";
import { Fallback } from "@/components/loaders/fallback";
import { Separator } from "@/components/ui/separator";
import { useCounter } from "@/counters/hooks/use-counter";
import { GoalsSection } from "@/goals/components/goals-section";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useTeam } from "@/teams/hooks/use-team";
import { useNavigate, useParams } from "react-router";
import { CounterDetailCard } from "../components/counter-detail-card";
import { CounterInfo } from "../components/counter-info";
import { CounterDetailLoader } from "../components/loaders/counter-detail-loader";
import { CounterInfoLoader } from "../components/loaders/counter-info-loader";

export const CounterIdPage = () => {
  const { teamId, counterId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { teamData } = useTeam(teamId);
  const navigate = useNavigate();
  const { counter, counterIncrement, counterReset, counterDelete } = useCounter(
    teamId,
    counterId
  );

  if (counterDelete.isSuccess) navigate(`/teams/${teamId}/counters`);

  return (
    <div>
      <Header
        title={counter.data?.name || ""}
        menuItems={
          counter.isLoading
            ? []
            : [
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
              ]
        }
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
          <Fallback
            isLoading={counter.isLoading}
            loadingComponent={<CounterDetailLoader />}
          >
            <CounterDetailCard
              counter={counter.data!}
              handleCounterIncrement={counterIncrement.mutate}
              handleCounterReset={counterReset.mutate}
            />
          </Fallback>

          <div className="w-xs flex justify-between gap-4">
            <Fallback
              isLoading={counter.isLoading}
              loadingComponent={<CounterInfoLoader />}
            >
              <CounterInfo
                label="Contador mas alto"
                value={counter.data?.longestStreak || 0}
              />
            </Fallback>

            <Fallback
              isLoading={counter.isLoading}
              loadingComponent={<CounterInfoLoader />}
            >
              <CounterInfo
                label="Contador mas reciente"
                value={counter.data?.lastResetDuration || 0}
              />
            </Fallback>
          </div>
        </section>

        <Separator orientation="horizontal" className="lg:w-[1px]! lg:h-96!" />

        <GoalsSection currentCount={counter.data?.currentCount || 0} />
      </div>
    </div>
  );
};

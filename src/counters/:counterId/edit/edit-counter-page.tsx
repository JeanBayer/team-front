import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormUpdateCounter } from "@/counters/:counterId/edit/hooks/use-form-update-counter";
import { useCounter } from "@/counters/hooks/use-counter";
import { useTeam } from "@/teams/hooks/use-team";
import { Loader2Icon } from "lucide-react";
import { useParams } from "react-router";

export const EditCounterPage = () => {
  const { teamId, counterId } = useParams();
  const { teamData } = useTeam(teamId);
  const { counter } = useCounter(teamId, counterId);
  const { formData, handleSubmit, updateField, isPending } =
    useFormUpdateCounter({
      initialFormData: {
        name: counter.data?.name,
        incrementButtonLabel: counter.data?.incrementButtonLabel,
        resetButtonLabel: counter.data?.resetButtonLabel,
      },
    });

  if (counter.isLoading) return <div>loading...</div>;
  if (counter.isError) return <div>error...</div>;

  return (
    <div>
      <Header
        title={counter.data?.name || ""}
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
              {
                to: `/teams/${teamId}/counters`,
                label: "Contadores",
              },
            ],
          },
          {
            to: `/teams/${teamId}/counters/${counterId}`,
            label: counter.data?.name || "",
          },
        ]}
        breadcrumbPage="Actualizar"
      />
      <section className="flex gap-8 flex-wrap justify-center py-8 px-4 md:px-12 max-w-lg mx-auto">
        <Card className="w-full p-6">
          <CardHeader>
            <CardTitle>Formulario</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-8"
            >
              <div className="grid w-full max-w-md items-center gap-3">
                <Label htmlFor="nombre-contador">Nombre del contador:</Label>
                <Input
                  type="text"
                  id="nombre-contador"
                  placeholder="Dias sin bug"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div className="grid w-full max-w-3xs items-center gap-3">
                <Label htmlFor="label-incremento">Label de incremento:</Label>
                <Input
                  type="text"
                  id="label-incremento"
                  placeholder="1 día mas"
                  value={formData.incrementButtonLabel}
                  onChange={(e) =>
                    updateField("incrementButtonLabel", e.target.value)
                  }
                />
              </div>

              <div className="grid w-full max-w-3xs items-center gap-3">
                <Label htmlFor="label-reset">Label del reset:</Label>
                <Input
                  type="text"
                  id="label-reset"
                  placeholder="bug encontrado"
                  value={formData.resetButtonLabel}
                  onChange={(e) =>
                    updateField("resetButtonLabel", e.target.value)
                  }
                />
              </div>

              <Button type="submit" value="Crear" disabled={isPending}>
                {isPending && <Loader2Icon className="animate-spin" />}
                Actualizar
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

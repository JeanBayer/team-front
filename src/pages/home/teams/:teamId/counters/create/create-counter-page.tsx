import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { useParams } from "react-router";
import { useTeam } from "../../../hooks/use-team";
import { useFormCreateCounter } from "./hooks/use-form-create-counter";

export const CreateCounterPage = () => {
  const { teamId } = useParams();
  const { teamData } = useTeam(teamId);
  const { formData, handleSubmit, updateField, isPending } =
    useFormCreateCounter();

  return (
    <div>
      <Header
        title="Crear Contador"
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
        breadcrumbPage="Crear Contador"
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
                  required
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
                  required
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
                  required
                />
              </div>

              <Button type="submit" value="Crear" disabled={isPending}>
                {isPending && <Loader2Icon className="animate-spin" />}
                Crear
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

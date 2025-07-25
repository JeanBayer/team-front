import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRetro } from "@/retros/hooks/use-retro";
import { useTeam } from "@/teams/hooks/use-team";
import { Loader2Icon } from "lucide-react";
import { useParams } from "react-router";
import { useFormUpdateRetro } from "./hooks/use-form-update-retro";

export const EditRetroPage = () => {
  const { teamId, retroId } = useParams();
  const { retro } = useRetro(teamId, retroId);
  const { teamData } = useTeam(teamId);

  const { formData, handleSubmit, updateField, isPending } = useFormUpdateRetro(
    {
      initialFormData: {
        retrospectiveName: retro.data?.retrospectiveName || "",
      },
    }
  );

  if (retro.isLoading) return <div>loading...</div>;
  if (retro.isError) return <div>error...</div>;

  return (
    <div>
      <Header
        title={retro.data?.retrospectiveName || ""}
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
                to: `/teams/${teamId}/retrospectives`,
                label: "Retrospectivas",
              },
            ],
          },
          {
            to: `/teams/${teamId}/retrospectives/${retroId}`,
            label: retro.data?.retrospectiveName || "",
          },
        ]}
        breadcrumbPage="Actualizar retrospectiva"
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
                <Label htmlFor="nombre-retrospectiva">
                  Nombre de la retrospectiva:
                </Label>
                <Input
                  type="text"
                  id="nombre-retrospectiva"
                  placeholder="Retrospectiva N°1"
                  minLength={3}
                  value={formData.retrospectiveName}
                  onChange={(e) =>
                    updateField("retrospectiveName", e.target.value)
                  }
                  required
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

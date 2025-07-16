import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTeam } from "@/teams/hooks/use-team";
import { Loader2Icon } from "lucide-react";
import { useParams } from "react-router";
import { useFormUpdateTeam } from "./hooks/use-form-update-team";

export const EditTeamPage = () => {
  const { teamId } = useParams();
  const { teamData } = useTeam(teamId);

  const { formData, handleSubmit, updateField, isPending } = useFormUpdateTeam({
    initialFormData: {
      name: teamData.data?.name,
      joinPassword: "",
    },
  });

  return (
    <div>
      <Header
        title={teamData.data?.name || ""}
        breadcrumbList={[
          {
            to: "/",
            label: "Home",
          },

          {
            to: "/teams",
            label: "Mis equipos",
          },
          {
            to: `/teams/${teamId}`,
            label: teamData.data?.name || "",
          },
        ]}
        breadcrumbPage="Editar equipo"
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
                <Label htmlFor="nombre-equipo">Nombre del equipo:</Label>
                <Input
                  type="text"
                  id="nombre-equipo"
                  placeholder="TLOP"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              <div className="grid w-full max-w-3xs items-center gap-3">
                <Label htmlFor="password">Password del equipo:</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="123"
                  value={formData.joinPassword}
                  onChange={(e) => updateField("joinPassword", e.target.value)}
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

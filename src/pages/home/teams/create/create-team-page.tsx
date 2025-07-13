import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { useFormCreateTeam } from "./hooks/use-form-create-team";

export const CreateTeamPage = () => {
  const { formData, updateField, handleSubmit, isPending } =
    useFormCreateTeam();
  return (
    <div>
      <Header
        title="Crear equipo"
        breadcrumbList={[
          {
            to: "/",
            label: "Home",
          },
          {
            to: "/teams",
            label: "Mis equipos",
          },
        ]}
        breadcrumbPage="Crear equipo"
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
                <Label htmlFor="nombre-equipo">Nombre equipo</Label>
                <Input
                  type="text"
                  id="nombre-equipo"
                  placeholder="TLOP"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </div>

              <div className="grid w-full max-w-3xs items-center gap-3">
                <Label htmlFor="password-equipo">Password</Label>
                <Input
                  type="password"
                  id="password-equipo"
                  placeholder="password"
                  value={formData.joinPassword}
                  onChange={(e) => updateField("joinPassword", e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending && <Loader2Icon className="animate-spin" />}
                Unirme
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

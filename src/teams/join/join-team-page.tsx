import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormJoinTeam } from "@/teams/join/hooks/use-form-join-team";
import { Loader2Icon } from "lucide-react";

export const JoinTeamPage = () => {
  const { formData, updateField, handleSubmit, isPending } = useFormJoinTeam();
  return (
    <div>
      <Header
        title="Unirme a un equipo"
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
        breadcrumbPage="Unirse a un equipo"
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
                <Label htmlFor="id-equipo">ID equipo</Label>
                <Input
                  type="text"
                  id="id-equipo"
                  placeholder="abcde123"
                  value={formData.id}
                  onChange={(e) => updateField("id", e.target.value)}
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

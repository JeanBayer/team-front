import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router";
import { useFormRequestReset } from "./hooks/use-form-request-reset";

export const RequestResetPage = () => {
  const { formData, updateField, handleSubmit, isPending } =
    useFormRequestReset();
  return (
    <main className="p-4 w-full">
      <Header
        title="Generar Codigo"
        breadcrumbList={[
          {
            to: "/landing",
            label: "Landing",
          },
          {
            to: "/login",
            label: "Login",
          },
        ]}
        breadcrumbPage="Generar Codigo"
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
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="tlop@gmail.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending && <Loader2Icon className="animate-spin" />}
                Enviar correo
              </Button>

              <Separator />

              <div className="grid w-full items-center gap-3">
                <Link
                  to={{
                    pathname: "/reset-user",
                    search: `?email=${formData.email}`,
                  }}
                  className="text-center text-xs underline "
                >
                  Ya generaste el codigo? Ingresa aqui
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

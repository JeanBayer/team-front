import { useFormLogin } from "@/auth/login/hooks/use-form-login";
import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";

export const LoginPage = () => {
  const { formData, updateField, handleSubmit, isPending } = useFormLogin();
  return (
    <main className="p-4 w-full">
      <Header
        title="Login"
        breadcrumbList={[
          {
            to: "/landing",
            label: "Landing",
          },
        ]}
        breadcrumbPage="Login"
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

              <div className="grid w-full max-w-3xs items-center gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending && <Loader2Icon className="animate-spin" />}
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

import { Header } from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2Icon } from "lucide-react";
import { Link } from "react-router";
import { useFormResetUser } from "./hooks/use-form-reset-user";

export const ResetUserPage = () => {
  const { formData, updateField, handleSubmit, isPending } = useFormResetUser();
  return (
    <main className="p-4 w-full">
      <Header
        title="Ingresar Codigo"
        breadcrumbList={[
          {
            to: "/landing",
            label: "Landing",
          },
          {
            to: "/login",
            label: "Login",
          },
          {
            to: "/request-reset",
            label: "Restablecer contraseña",
          },
        ]}
        breadcrumbPage="Ingresar Codigo"
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

              <div className="grid w-full max-w-md items-center justify-center gap-3">
                <Label htmlFor="code" className="text-center w-full">
                  Codigo
                </Label>
                <InputOTP
                  id="code"
                  maxLength={6}
                  value={formData.code.toString()}
                  onChange={(value) => updateField("code", value)}
                  required
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="cursor-pointer"
              >
                {isPending && <Loader2Icon className="animate-spin" />}
                Entrar
              </Button>

              <Separator />

              <div className="grid w-full items-center gap-3">
                <Link
                  to={{
                    pathname: "/request-reset",
                    search: `?email=${formData.email}`,
                  }}
                  className="text-center text-xs underline "
                >
                  Generar el codigo nuevamente
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

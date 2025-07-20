import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Membership } from "@/types/membership";
import { ChevronsUpDown, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useFormCreateThankYou } from "../:retroId/hooks/use-form-create-thank-you";

type ThankYouFormProps = {
  memberships: Membership[];
};

export const ThankYouForm = ({ memberships }: ThankYouFormProps) => {
  const {
    formData: formDataThankYou,
    handleSubmit: handleSubmitThankYou,
    updateField: updateFieldThankYou,
    isPending: isPendingThankYou,
  } = useFormCreateThankYou();
  const [isOpenThankYou, setIsOpenThankYou] = useState(false);

  const isDisabledThankYouSubmit =
    isPendingThankYou || !formDataThankYou.userId;

  return (
    <section className="sticky bottom-1 flex gap-4 flex-wrap justify-center py-8 px-4 md:px-12 min-w-xs max-w-sm md:max-w-lg mx-auto">
      <Card
        className={`w-full transition-colors duration-700 ease-in-out p-2 ${
          isOpenThankYou ? "bg-card" : "bg-blue-200"
        } bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100`}
      >
        <Collapsible open={isOpenThankYou} onOpenChange={setIsOpenThankYou}>
          <CollapsibleTrigger asChild>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Mandar Agradecimiento
                <Button variant="ghost" size="icon" className="size-8">
                  <ChevronsUpDown />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="p-6">
              <form
                onSubmit={handleSubmitThankYou}
                className="w-full flex flex-col gap-8"
              >
                <div className="grid w-full max-w-md items-center gap-3">
                  <Label htmlFor="miembro">Compañero/a:</Label>
                  <Select
                    defaultValue={formDataThankYou.userId}
                    value={formDataThankYou.userId}
                    onValueChange={(value) =>
                      updateFieldThankYou("userId", value)
                    }
                    required
                  >
                    <SelectTrigger className="w-[240px] bg-card">
                      <SelectValue
                        id="miembro"
                        placeholder="Elige un miembro del equipo"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Miembro</SelectLabel>
                        {memberships?.map(({ userId, user }) => {
                          return (
                            <SelectItem id={userId} value={userId}>
                              {user.name}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full max-w-md items-center gap-3">
                  <Label htmlFor="mensaje-agradecimiento">Mensaje:</Label>
                  <Textarea
                    id="mensaje-agradecimiento"
                    placeholder="Agradezco a "
                    minLength={3}
                    value={formDataThankYou.message}
                    onChange={(e) =>
                      updateFieldThankYou("message", e.target.value)
                    }
                    required
                    className="bg-card"
                  />
                </div>

                <Button
                  type="submit"
                  value="Enviar"
                  disabled={isDisabledThankYouSubmit}
                >
                  {isPendingThankYou && (
                    <Loader2Icon className="animate-spin" />
                  )}
                  Enviar
                </Button>
              </form>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </section>
  );
};

import { Header } from "@/components/header/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useMembershipList } from "@/hooks/use-membership-list";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useFormSprintWinnerVote } from "@/retros/:retroId/hooks/use-form-sprint-winner-vote";
import { useVoteSprint } from "@/retros/:retroId/hooks/use-vote-sprint";
import { useRetro } from "@/retros/hooks/use-retro";
import { useTeam } from "@/teams/hooks/use-team";
import { useThankYouRetrospective } from "@/thank-you/hooks/use-thank-you-retrospective";
import { ChevronsUpDown, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFormCreateThankYou } from "./hooks/use-form-create-thank-you";

export const RetroIdPage = () => {
  const { teamId, retroId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { teamData } = useTeam(teamId);
  const { retro, retroClose } = useRetro(teamId, retroId);
  const { memberships } = useMembershipList(teamId);
  const { formData, handleSubmit, updateField, isPending } =
    useFormSprintWinnerVote();
  const { voteStatus } = useVoteSprint(teamId, retroId);
  const { thankYou } = useThankYouRetrospective(teamId, retroId);
  const {
    formData: formDataThankYou,
    handleSubmit: handleSubmitThankYou,
    updateField: updateFieldThankYou,
    isPending: isPendingThankYou,
  } = useFormCreateThankYou();
  const [isOpenThankYou, setIsOpenThankYou] = useState(false);
  const [isOpenVote, setIsOpenVote] = useState(false);

  useEffect(() => {
    if (!!voteStatus.data?.myVote?.id)
      updateField("userId", voteStatus.data.myVote.votedForId);
  }, [voteStatus.data?.myVote?.id]);

  if (retro.isLoading || voteStatus.isLoading) return <div>loading...</div>;
  if (retro.isError) return <div>error...</div>;

  const isDisabledSprintWinnerSubmit =
    !!voteStatus.data?.myVote?.id ||
    isPending ||
    retro?.data?.status === "CLOSED";

  const isDisabledThankYouSubmit =
    isPendingThankYou || retro?.data?.status === "CLOSED";

  return (
    <div>
      <Header
        title={retro.data?.retrospectiveName || ""}
        menuItems={[
          {
            to: "edit",
            label: "Editar",
            isDisabled: !isAdmin,
          },
          {
            to: "",
            label: "Terminar",
            type: "out",
            onClick: () => retroClose.mutate(),
            isDisabled: !isAdmin || retro?.data?.status === "CLOSED",
          },
        ]}
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
            to: `/teams/${teamId}/retrospectives`,
            label: "Retrospectivas",
          },
        ]}
        breadcrumbPage={retro.data?.retrospectiveName || ""}
      >
        {retro?.data?.status === "CREATED" && (
          <Badge variant="default" className="text-[10px]">
            Abierto
          </Badge>
        )}
        {retro?.data?.status === "CLOSED" && (
          <Badge variant="destructive" className="text-[10px]">
            Cerrado
          </Badge>
        )}
      </Header>

      <section className="flex gap-8 flex-wrap justify-center py-8 px-4 md:px-12 min-w-xs max-w-sm md:max-w-2xl mx-auto">
        <Card className="w-full p-2">
          <Collapsible open={isOpenVote} onOpenChange={setIsOpenVote}>
            <CollapsibleTrigger asChild>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <h3>
                    <span>Votación del elegido</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge>
                      {voteStatus.data?.totalVotes} /{" "}
                      {voteStatus.data?.totalMembers}
                    </Badge>
                    <Button variant="ghost" size="icon" className="size-8">
                      <ChevronsUpDown />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="p-6">
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col flex-wrap gap-8"
                >
                  <RadioGroup
                    defaultValue={formData.userId}
                    value={formData.userId}
                    onValueChange={(value) => updateField("userId", value)}
                    className="md:max-h-40 flex flex-col flex-wrap gap-6"
                  >
                    {memberships.data?.map(({ userId, user }) => {
                      return (
                        <div
                          className="flex items-center space-x-2"
                          key={userId}
                        >
                          <RadioGroupItem
                            id={userId}
                            value={userId}
                            disabled={isDisabledSprintWinnerSubmit}
                            required
                          />
                          <Label htmlFor={userId}>{user.name}</Label>
                        </div>
                      );
                    })}
                  </RadioGroup>

                  <Button
                    type="submit"
                    value="Votar"
                    className="cursor-pointer w-40 mx-auto"
                    disabled={isDisabledSprintWinnerSubmit}
                  >
                    {isPending && <Loader2Icon className="animate-spin" />}
                    Votar
                  </Button>
                </form>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </section>

      {retro.data?.sprintWinner?.name && (
        <section className="flex gap-8 flex-wrap justify-center mb-8 px-4 md:px-12 min-w-xs max-w-sm md:max-w-2xl mx-auto">
          <Card className="bg-blue-200 w-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <h3>
                  <span>🏆 Elegido del sprint</span>
                </h3>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-center">
                {retro.data?.sprintWinner?.name}
              </h3>
            </CardContent>
          </Card>
        </section>
      )}

      <Separator className="w-[40vw]! mx-auto bg-gray-300" decorative={false} />

      <h2 className="text-center text-2xl font-bold mt-10 mb-4">
        Agradecimientos
      </h2>

      <section className="flex gap-10 flex-wrap justify-center md:justify-between py-8 px-4 md:px-12 min-w-xs max-w-sm md:max-w-2xl mx-auto">
        {thankYou.data?.map(({ receiver, message, giver, id }) => (
          <Card className="w-66" key={id}>
            <CardHeader>
              <CardTitle className="text-center">{receiver.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <ScrollArea className="h-26">
                <h4 className="text-sm flex-1">{message}</h4>
              </ScrollArea>
              <p className="text-xs text-gray-500 text-right">~ {giver.name}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {retro?.data?.status === "CREATED" && (
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
                    Agradecimientos
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
                      <Label htmlFor="miembro">Miembro:</Label>
                      <Select
                        defaultValue={formDataThankYou.userId}
                        value={formDataThankYou.userId}
                        onValueChange={(value) =>
                          updateFieldThankYou("userId", value)
                        }
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
                            {memberships.data?.map(({ userId, user }) => {
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
      )}
    </div>
  );
};

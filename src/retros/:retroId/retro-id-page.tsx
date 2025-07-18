import { Header } from "@/components/header/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMembershipList } from "@/hooks/use-membership-list";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useFormSprintWinnerVote } from "@/retros/:retroId/hooks/use-form-sprint-winner-vote";
import { useVoteSprint } from "@/retros/:retroId/hooks/use-vote-sprint";
import { useRetro } from "@/retros/hooks/use-retro";
import { useTeam } from "@/teams/hooks/use-team";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";

export const RetroIdPage = () => {
  const { teamId, retroId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { teamData } = useTeam(teamId);
  const { retro } = useRetro(teamId, retroId);
  const { memberships } = useMembershipList(teamId);
  const { formData, handleSubmit, updateField, isPending } =
    useFormSprintWinnerVote();
  const { voteStatus } = useVoteSprint(teamId, retroId);

  useEffect(() => {
    if (!!voteStatus.data?.myVote?.id)
      updateField("userId", voteStatus.data.myVote.votedForId);
  }, [voteStatus.data?.myVote?.id]);

  if (retro.isLoading || voteStatus.isLoading) return <div>loading...</div>;
  if (retro.isError) return <div>error...</div>;

  const isDisabledSprintWinnerSubmit =
    !!voteStatus.data?.myVote?.id || isPending;

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
        <Card className="w-full p-6">
          <CardHeader>
            <CardTitle>
              <h3 className="flex items-center justify-between">
                <span>Elegido del sprint</span>
                <Badge>
                  {voteStatus.data?.totalVotes} /{" "}
                  {voteStatus.data?.totalMembers}
                </Badge>
              </h3>
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                    <div className="flex items-center space-x-2" key={userId}>
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
        </Card>
      </section>
    </div>
  );
};

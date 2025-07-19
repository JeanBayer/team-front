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
import type { Membership } from "@/types/membership";
import { ChevronsUpDown, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFormSprintWinnerVote } from "../:retroId/hooks/use-form-sprint-winner-vote";
import { useVoteSprint } from "../:retroId/hooks/use-vote-sprint";

type RetroWinnerFormProps = {
  memberships: Membership[];
  disabled?: boolean;
};

export const RetroWinnerForm = ({
  memberships,
  disabled = false,
}: RetroWinnerFormProps) => {
  const { teamId, retroId } = useParams();
  const { formData, handleSubmit, updateField, isPending } =
    useFormSprintWinnerVote();
  const [isOpenVote, setIsOpenVote] = useState(false);
  const { voteStatus } = useVoteSprint(teamId, retroId);

  useEffect(() => {
    if (!!voteStatus.data?.myVote?.id)
      updateField("userId", voteStatus.data.myVote.votedForId);
  }, [voteStatus.data?.myVote?.id]);

  const isDisabledSprintWinnerSubmit =
    !!voteStatus.data?.myVote?.id || isPending || disabled;

  return (
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
                  {memberships?.map(({ userId, user }) => {
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
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </section>
  );
};

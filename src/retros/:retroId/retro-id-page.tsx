import { AdminConditional } from "@/components/membership/admin-conditional";
import { useMembershipList } from "@/hooks/use-membership-list";
import { useFormSprintWinnerVote } from "@/retros/:retroId/hooks/use-form-sprint-winner-vote";
import { useVoteSprint } from "@/retros/:retroId/hooks/use-vote-sprint";
import { useRetro } from "@/retros/hooks/use-retro";
import { useEffect } from "react";
import { Link, useParams } from "react-router";

export const RetroIdPage = () => {
  const { teamId, retroId } = useParams();
  const { retro } = useRetro(teamId, retroId);
  const { memberships } = useMembershipList(teamId);
  const { formData, handleSubmit, updateField, isPending } =
    useFormSprintWinnerVote();
  const { voteStatus } = useVoteSprint(teamId, retroId);

  useEffect(() => {
    if (!!voteStatus.data?.myVote?.id)
      updateField("userId", voteStatus.data.myVote.votedForId);
  }, [voteStatus.data?.myVote?.id]);

  if (retro.isLoading) return <div>loading...</div>;
  if (retro.isError) return <div>error...</div>;

  const isDisabledSprintWinnerSubmit =
    !!voteStatus.data?.myVote?.id || isPending;

  return (
    <div>
      <header>
        <Link to="..">Volver</Link>
        <h1>{retro.data?.retrospectiveName}</h1>
        <AdminConditional>
          <Link to="editar">Editar</Link>
        </AdminConditional>
      </header>
      <main>
        <section>sprint winner</section>

        <section>
          <h3>sprint votes</h3>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>
                Select a sprint winner:
                <span>
                  votes: {voteStatus.data?.totalVotes} /{" "}
                  {voteStatus.data?.totalMembers}
                </span>
              </legend>
              {memberships.data?.map(({ userId, user }) => {
                return (
                  <div key={userId}>
                    <input
                      type="radio"
                      name="sprint-winner-vote"
                      id={userId}
                      value={userId}
                      onChange={(e) => updateField("userId", e.target.value)}
                      checked={userId === formData.userId}
                      disabled={isDisabledSprintWinnerSubmit}
                    />
                    <label htmlFor={userId}>{user.name}</label>
                  </div>
                );
              })}

              <input
                type="submit"
                value="Votar"
                disabled={isDisabledSprintWinnerSubmit}
              />
            </fieldset>
          </form>
        </section>
      </main>
    </div>
  );
};

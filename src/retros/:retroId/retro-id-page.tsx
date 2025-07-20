import { Header } from "@/components/header/header";
import { Visible } from "@/components/loaders/visible";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ICONS_KEYS } from "@/data/icon-enum";
import { useMembershipList } from "@/hooks/use-membership-list";
import { useUserIsAdmin } from "@/hooks/use-user-is-admin";
import { useRetro } from "@/retros/hooks/use-retro";
import { useTeam } from "@/teams/hooks/use-team";
import { useParams } from "react-router";
import { RetroWinner } from "../components/retro-winner";
import { RetroWinnerForm } from "../components/retro-winner-form";
import { ThankYouForm } from "../components/thank-you-form";
import { ThankYouList } from "../components/thank-you-list";

export const RetroIdPage = () => {
  const { teamId, retroId } = useParams();
  const { isAdmin } = useUserIsAdmin(teamId);
  const { teamData } = useTeam(teamId);
  const { retro, retroClose } = useRetro(teamId, retroId);
  const { memberships } = useMembershipList(teamId);

  return (
    <div>
      <Header
        title={retro.data?.retrospectiveName || ""}
        menuItems={
          retro.isLoading
            ? []
            : [
                // {
                //   to: "edit",
                //   label: "Editar",
                //   isDisabled: !isAdmin,
                // },
                {
                  to: "",
                  label: "Cerrar",
                  type: ICONS_KEYS.EYE_CLOSED,
                  onClick: () => retroClose.mutate(),
                  isDisabled: !isAdmin || retro?.data?.status === "CLOSED",
                },
              ]
        }
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
        <Visible when={retro?.data?.status === "CREATED"}>
          <Badge variant="default" className="text-[10px]">
            Abierto
          </Badge>
        </Visible>
        <Visible when={retro?.data?.status === "CLOSED"}>
          <Badge variant="destructive" className="text-[10px]">
            Cerrado
          </Badge>
        </Visible>
      </Header>

      <RetroWinnerForm
        memberships={memberships.data || []}
        disabled={retro?.data?.status === "CLOSED"}
      />

      <Visible when={!!retro.data?.sprintWinner?.name}>
        <RetroWinner name={retro.data?.sprintWinner?.name!} />
      </Visible>

      <Separator className="w-[40vw]! mx-auto bg-gray-300" decorative={false} />

      <ThankYouList />

      <Visible when={retro?.data?.status === "CREATED"}>
        <ThankYouForm memberships={memberships.data || []} />
      </Visible>
    </div>
  );
};

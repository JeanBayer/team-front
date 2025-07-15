import { useHandlerOptimistic } from "@/hooks/use-handler-optimistic";
import { MembershipService } from "@/services/membership-service";
import type { Membership } from "@/types/membership";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMembership = (teamId: string = "") => {
  const LIST_MEMBERSHIPS_KEY = ["TEAMS", teamId, "MEMBERSHIP-LIST"];

  // pm: member promote
  const promoteToAdminOptimistic = useHandlerOptimistic<Membership[], string>({
    queryKey: LIST_MEMBERSHIPS_KEY,
    onMutate: (userId) => (old) =>
      old.map((membership) => {
        if (membership.userId === userId)
          return { ...membership, isAdmin: true };
        return membership;
      }),
    onSuccess: () =>
      toast.success("Usuario promovido a Admin del equipo", {
        richColors: true,
      }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const promoteToAdmin = useMutation({
    mutationFn: (userId: string) =>
      MembershipService.promoteAdminUser(teamId, userId),
    onSuccess: promoteToAdminOptimistic.onSuccess,
    onMutate: promoteToAdminOptimistic.onMutate,
    onError: promoteToAdminOptimistic.onError,
    onSettled: promoteToAdminOptimistic.onSettled,
  });

  // pm: member demote
  const demoteToAdminOptimistic = useHandlerOptimistic<Membership[], string>({
    queryKey: LIST_MEMBERSHIPS_KEY,
    onMutate: (userId) => (old) =>
      old.map((membership) => {
        if (membership.userId === userId)
          return { ...membership, isAdmin: false };
        return membership;
      }),
    onSuccess: () =>
      toast.success("Usuario promovido a Admin del equipo", {
        richColors: true,
      }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const demoteToAdmin = useMutation({
    mutationFn: (userId: string) =>
      MembershipService.demoteAdminUser(teamId, userId),
    onSuccess: demoteToAdminOptimistic.onSuccess,
    onMutate: demoteToAdminOptimistic.onMutate,
    onError: demoteToAdminOptimistic.onError,
    onSettled: demoteToAdminOptimistic.onSettled,
  });

  // pm: member leave
  const memberLeaveUserOptimistic = useHandlerOptimistic<Membership[], string>({
    queryKey: LIST_MEMBERSHIPS_KEY,
    onMutate: (userId) => (old) =>
      old.filter((membership) => membership.userId !== userId),
    onSuccess: () =>
      toast.success("Usuario eliminado del equipo", { richColors: true }),
    onError: (error) => toast.error(error?.message, { richColors: true }),
  });

  const memberLeaveUser = useMutation({
    mutationFn: (userId: string) => MembershipService.leaveUser(teamId, userId),
    onSuccess: memberLeaveUserOptimistic.onSuccess,
    onMutate: memberLeaveUserOptimistic.onMutate,
    onError: memberLeaveUserOptimistic.onError,
    onSettled: memberLeaveUserOptimistic.onSettled,
  });

  return {
    memberLeaveUser: {
      isPending: memberLeaveUser.isPending,
      isSuccess: memberLeaveUser.isSuccess,
      isError: memberLeaveUser.isError,
      mutate: memberLeaveUser.mutate,
    },
    promoteToAdmin: {
      isPending: promoteToAdmin.isPending,
      isSuccess: promoteToAdmin.isSuccess,
      isError: promoteToAdmin.isError,
      mutate: promoteToAdmin.mutate,
    },
    demoteToAdmin: {
      isPending: demoteToAdmin.isPending,
      isSuccess: demoteToAdmin.isSuccess,
      isError: demoteToAdmin.isError,
      mutate: demoteToAdmin.mutate,
    },
  };
};

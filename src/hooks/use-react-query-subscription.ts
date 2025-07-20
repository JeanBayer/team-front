import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { socketService } from "../services/socket-service";

interface WebSocketEvent {
  entity: string[];
  data: any;
}

export const useReactQuerySubscription = (teamId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!teamId) return;

    socketService.connect();
    socketService.joinTeam(teamId);

    const handleUpdate = (data: WebSocketEvent) => {
      queryClient.invalidateQueries({ queryKey: data.entity });
    };

    socketService.socket.on("team", handleUpdate);

    return () => {
      socketService.socket.off("team", handleUpdate);
      socketService.leaveTeam(teamId);
    };
  }, [teamId, queryClient]);
};

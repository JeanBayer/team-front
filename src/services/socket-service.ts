import { io, Socket } from "socket.io-client";
import { envs } from "../config/envs";

class SocketService {
  public socket: Socket;

  constructor() {
    this.socket = io(envs.VITE_WS_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    this.socket.on("connect", () => {
      console.log("✅ WebSocket connected!");
    });

    this.socket.on("disconnect", () => {
      console.log("❌ WebSocket disconnected!");
    });
  }

  public connect() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public joinTeam(teamId: string) {
    this.socket.emit("joinTeam", teamId);
  }

  public leaveTeam(teamId: string) {
    this.socket.emit("leaveTeam", teamId);
  }
}

export const socketService = new SocketService();

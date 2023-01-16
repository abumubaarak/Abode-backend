import { Socket } from "socket.io";

export interface CustomNodeJsGlobal extends NodeJS.Global {
  socketIO: Socket;
}

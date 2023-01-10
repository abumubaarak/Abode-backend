import { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

export const realTimeMessaging = (app: Application) => {
  const httpServer = createServer(app);
  const io: Server = new Server(httpServer, {
    cors: {
      origin: "http://localhost:7000",
    },
  });
  io.on("connection", (socket) => {
    socket.emit("server", "hello client")
  });

  httpServer.listen(9000, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:9000/`);
  });
};

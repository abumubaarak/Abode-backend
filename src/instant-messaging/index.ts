import { Application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Conversation } from "./conversation/conversationModel";
import { Message } from "./messages/messageModel";

export const realTimeMessaging = (app: Application) => {
  const httpServer = createServer(app);
  const io: Server = new Server(httpServer, {
    cors: {
      origin: "http://localhost:8080",
    },
  });
  io.on("connection", (socket) => {
    socket.on("join_chat", (data) => {
      socket.join(data);
      console.log(data)
    });


    socket.on("send_chat", async (data, callback) => {
      console.log(data)
      const { tenant_id, landlord_id, sender, message, message_id } = data;
      const reciever = sender === landlord_id ? tenant_id : landlord_id;
      await Conversation.create(
        {
          tenant_id,
          landlord_id,
          message,
          message_id,
          sender
        },
        async (err: any, doc: any) => {
          if (doc) {

            let newMessage =
            {
              _id: doc?._id,
              text: doc?.message,
              createdAt: new Date(),
              user: {
                _id: doc?.sender,
              }
            }
            socket
              .to(reciever + message_id)
              .to(sender + message_id)
              .emit("conversation_chat", newMessage);

            await Message.findByIdAndUpdate(message_id, { message, sentAt: new Date() })
          }
        }
      );

    });

    socket.on('left', (data) => {
      console.log("left", data)
      socket.leave(data);
    });
  });

  httpServer.listen(9000, () => {
    console.log(`Server running at 9000/`);
  });
};

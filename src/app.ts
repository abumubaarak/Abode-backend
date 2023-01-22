import "colors";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import { realTimeMessaging } from "./instant-messaging";
import { router as ConversationRoute } from "./instant-messaging/conversation/conversationRoute";
import MessageRoute from "./instant-messaging/messages/messageRoute";
import { errorMiddleware } from "./middleware/error.middleware";
import PaymentRoute from "./payment/paymentRoute";
const app: Application = express();

app.use(helmet());
app.use(cors());

app.use(express.json());


realTimeMessaging(app)

app.use("/conversations", ConversationRoute);
app.use("/messages", MessageRoute);
app.use("/payments", PaymentRoute);

app.use(errorMiddleware);

export { app };

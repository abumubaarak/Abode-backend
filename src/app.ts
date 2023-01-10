import "colors";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import { realTimeMessaging } from "./instant-messaging";

const app: Application = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

realTimeMessaging(app)

export { app };

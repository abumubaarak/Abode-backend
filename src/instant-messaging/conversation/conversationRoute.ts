import express, { Router } from "express";
import { getConversation } from "./conversationController";
const router: Router = express();

router.route("/").get(getConversation);

export { router };

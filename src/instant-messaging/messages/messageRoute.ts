import express, { Router } from "express";
import { getMessages, initiateMessage } from "./messageController";

const router: Router = express();

router.route("/").get(getMessages);
router.route("/").post(initiateMessage)
export default router;

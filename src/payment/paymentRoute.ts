import express, { Router } from "express";
import { checkout, successfulPayment } from "./paymentController";

const router: Router = express();

router.route("").post(checkout);
router.route("/webhook").post(successfulPayment);
export default router

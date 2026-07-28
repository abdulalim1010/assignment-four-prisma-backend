import express from "express";
import { PaymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post(
  "/create-checkout-session",
  auth(Role.TENANT, Role.LANDLORD),
  PaymentController.createCheckoutSession
);

router.get(
  "/success",
  PaymentController.paymentSuccess
);

// ⭐ Stripe Webhook
router.post(
  "/webhook",
  PaymentController.webhook
);

export const PaymentRoutes = router;
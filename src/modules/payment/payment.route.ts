import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";

const router = Router();

// Logged in user
router.post(
  "/create-checkout-session",
  auth(),
  PaymentController.createCheckoutSession
);

// Success URL
router.get(
  "/success",
  PaymentController.paymentSuccess
);

// Stripe Webhook
router.post(
  "/webhook",
  PaymentController.webhook
);

export const PaymentRoutes = router;
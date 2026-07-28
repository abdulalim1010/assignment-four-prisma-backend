import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

const createCheckoutSession = async (
  req: Request,
  res: Response
) => {
const userId = req.user!.userId;

  const result = await PaymentService.createCheckoutSession(
    userId
  );

  res.status(200).json({
    success: true,
    message: "Checkout session created successfully",
    data: result,
  });
};

const paymentSuccess = async (
  req: Request,
  res: Response
) => {
  const result = await PaymentService.paymentSuccess();

  res.status(200).json({
    success: true,
    data: result,
  });
};

const webhook = async (
  req: Request,
  res: Response
) => {
  const signature = req.headers["stripe-signature"] as string;

  const result = await PaymentService.webhook(
    req.body,
    signature
  );

  res.status(200).json(result);
};

export const PaymentController = {
  createCheckoutSession,
  paymentSuccess,
  webhook,
};
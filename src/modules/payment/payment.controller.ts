import { Request, Response } from "express";
import { PaymentService } from "./payment.service";


import Stripe from "stripe";
import config from "../../config";


const stripe = new Stripe(
  config.stripe_secret_key!,
);


const createCheckoutSession = async (
  req: Request,
  res: Response
) => {

  console.log("CREATE CHECKOUT USER:", req.user);


  const session =
    await stripe.checkout.sessions.create({

      mode:"payment",

      payment_method_types:[
        "card"
      ],

      line_items:[
        {
          price_data:{
            currency:"usd",

            product_data:{
              name:"Premium Subscription",
            },

            unit_amount:500,
          },

          quantity:1,
        }
      ],


      metadata:{
        userId:req.user!.userId,
      },


      success_url:
      "http://localhost:3000/payment/success",


      cancel_url:
      "http://localhost:3000/payment/cancel",

    });


  res.json({
    success:true,
    url:session.url,
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

const webhook = async (req: Request, res: Response) => {
  console.log("✅ Webhook Hit");

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
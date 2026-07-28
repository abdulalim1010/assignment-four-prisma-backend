import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe(config.stripe_secret_key as string);

const createCheckoutSession = async (userId: string) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    payment_method_types: ["card"],

    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",

          product_data: {
            name: "Premium Subscription",
            description: "Unlock Premium News",
          },

          unit_amount: 500, // $5.00
        },
      },
    ],

    metadata: {
      userId,
    },

    success_url: `${config.frontend_url}/payment/success`,
    cancel_url: `${config.frontend_url}/payment/cancel`,
  });

  return {
    url: session.url,
  };
};

const paymentSuccess = async () => {
  return {
    message: "Payment successful",
  };
};

const webhook = async (body: Buffer, signature: string) => {

  console.log("🔥 Webhook function called");

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    config.stripe_webhook_secret as string
  );

  console.log("Event Type:", event.type);


  switch (event.type) {

    case "checkout.session.completed": {

      console.log("✅ Checkout Completed");


      const session = event.data.object as Stripe.Checkout.Session;


      console.log(
        "Metadata:",
        session.metadata
      );


      const userId = session.metadata?.userId;


      console.log(
        "User ID:",
        userId
      );


      if (userId) {

        const updatedUser = await prisma.user.update({

          where: {
            id: userId,
          },

          data: {
            isPremium: true,
          },

        });


        console.log(
          "Updated User:",
          updatedUser.id
        );

      }

      break;
    }


    default:
      console.log(
        "Unhandled event:",
        event.type
      );
  }


  return {
    received: true,
  };
};

export const PaymentService = {
  createCheckoutSession,
  paymentSuccess,
  webhook,
};
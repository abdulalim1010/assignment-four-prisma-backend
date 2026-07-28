import Stripe from "stripe";
import config from "../../config";




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
    message: "Payment success",
  };
};

const webhook = async (body: Buffer, signature: string) => {
  return {
    message: "Webhook received",
  };
};

export const PaymentService = {
  createCheckoutSession,
  paymentSuccess,
  webhook,
};
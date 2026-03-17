import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Stripe client — only available server-side when STRIPE_SECRET_KEY is set
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2026-02-25.clover" })
  : null;

export async function createCheckoutSession(params: {
  clientEmail: string;
  amount: number;
  description: string;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!stripe) {
    console.log("[Stripe Stub] createCheckoutSession called:", params);
    return { url: params.successUrl + "?stub=true" };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.clientEmail,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: params.description },
          unit_amount: params.amount,
        },
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });

  return { url: session.url };
}

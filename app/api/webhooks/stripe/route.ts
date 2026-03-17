import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  // TODO: Verify webhook signature with stripe.webhooks.constructEvent when STRIPE_WEBHOOK_SECRET is set

  const event = JSON.parse(body);
  console.log(`[Stripe Webhook] Received event: ${event.type}`);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log(`[Stripe Webhook] Payment completed: ${session.id}, amount: ${session.amount_total}`);
      // TODO: Update payment status in Convex
      break;
    }
    default:
      console.log(`[Stripe Webhook] Unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

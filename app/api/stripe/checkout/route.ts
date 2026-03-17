import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { clientEmail, amount, description } = body;

  const origin = req.nextUrl.origin;
  const result = await createCheckoutSession({
    clientEmail,
    amount,
    description,
    successUrl: `${origin}/app/payments?success=true`,
    cancelUrl: `${origin}/app/payments?cancelled=true`,
  });

  return NextResponse.json(result);
}

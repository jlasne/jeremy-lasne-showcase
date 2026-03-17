import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(`[Yousign Webhook] Received event:`, body);

  const eventType = body.event_name;

  switch (eventType) {
    case "signature_request.done": {
      const requestId = body.data?.signature_request?.id;
      console.log(`[Yousign Webhook] Signature completed: ${requestId}`);
      // TODO: Update contract status in Convex to "signed"
      break;
    }
    case "signature_request.declined": {
      const requestId = body.data?.signature_request?.id;
      console.log(`[Yousign Webhook] Signature declined: ${requestId}`);
      // TODO: Update contract status in Convex to "cancelled"
      break;
    }
    default:
      console.log(`[Yousign Webhook] Unhandled event: ${eventType}`);
  }

  return NextResponse.json({ received: true });
}

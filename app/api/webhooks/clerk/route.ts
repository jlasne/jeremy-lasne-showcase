import { NextRequest, NextResponse } from "next/server";

// Clerk webhook handler — syncs user creation/updates to Convex
// Requires CLERK_WEBHOOK_SECRET env var and Convex deployment
export async function POST(req: NextRequest) {
  // TODO: Verify webhook signature with svix when CLERK_WEBHOOK_SECRET is set
  // TODO: Sync user data to Convex users table

  const body = await req.json();
  const eventType = body.type;

  console.log(`[Clerk Webhook] Received event: ${eventType}`);

  switch (eventType) {
    case "user.created":
    case "user.updated": {
      const { id, email_addresses, first_name, last_name, public_metadata } = body.data;
      const email = email_addresses?.[0]?.email_address;
      const role = public_metadata?.role === "admin" ? "admin" : "client";

      console.log(`[Clerk Webhook] User ${eventType}: ${email} (role: ${role}, clerkId: ${id})`);
      // When Convex is connected:
      // await convex.mutation(api.users.createUser, { clerkId: id, email, firstName: first_name, lastName: last_name, role })
      break;
    }
    default:
      console.log(`[Clerk Webhook] Unhandled event type: ${eventType}`);
  }

  return NextResponse.json({ received: true });
}

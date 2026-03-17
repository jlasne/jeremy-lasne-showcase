import { v } from "convex/values";
import { action } from "./_generated/server";

export const sendClientInvitation = action({
  args: {
    email: v.string(),
    firstName: v.optional(v.string()),
    siteUrl: v.string(),
  },
  handler: async (_ctx, args) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "jeremy@jeremylasne.com";
    const name = args.firstName || "there";
    const signUpUrl = `${args.siteUrl}/sign-up`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0e0e0e; color: #e8e6e1; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c;">Jérémy Lasne — Wealth Architecture</div>
        </div>

        <h1 style="font-size: 22px; font-weight: 600; margin-bottom: 16px; color: #e8e6e1;">Hello ${name},</h1>

        <p style="font-size: 15px; line-height: 1.6; color: #9a9790; margin-bottom: 24px;">
          You have been invited to access your personal client portal. This portal allows you to view your contracts, documents, payments, and upcoming meetings.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${signUpUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #c9a84c, #d4b85a); color: #0e0e0e; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">
            Create Your Account
          </a>
        </div>

        <p style="font-size: 13px; color: #5a5750; margin-bottom: 8px;">
          Use this email address to sign up: <strong style="color: #9a9790;">${args.email}</strong>
        </p>

        <p style="font-size: 13px; color: #5a5750;">
          If the button doesn't work, copy this link: ${signUpUrl}
        </p>

        <hr style="border: none; border-top: 1px solid #222; margin: 32px 0;" />

        <p style="font-size: 12px; color: #5a5750; text-align: center;">
          Jérémy Lasne — Wealth Architecture<br/>
          jeremylasne.com
        </p>
      </div>
    `;

    if (!resendApiKey) {
      console.log("[Resend Stub] Client invitation email:", {
        from: fromEmail,
        to: args.email,
        subject: "Welcome to your Wealth Architecture portal",
      });
      console.log("[Resend Stub] Sign-up URL:", signUpUrl);
      return { success: true, stub: true };
    }

    // Use Resend API directly (actions can't import from lib/)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: args.email,
        subject: "Welcome to your Wealth Architecture portal",
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend error:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    return { success: true, stub: false };
  },
});

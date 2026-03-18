import { v } from "convex/values";
import { action } from "./_generated/server";

export const sendClientInvitation = action({
  args: {
    email: v.string(),
    firstName: v.optional(v.string()),
    siteUrl: v.string(),
    lang: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    const rawEmail = process.env.RESEND_FROM_EMAIL || "jeremy@jeremylasne.com";
    const fromEmail = `Jérémy Lasne <${rawEmail}>`;
    const lang = args.lang || "en";
    const name = args.firstName || (lang === "fr" ? "Bonjour" : "there");
    const signUpUrl = `${args.siteUrl}/sign-up`;

    const t = (en: string, fr: string) => lang === "fr" ? fr : en;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0e0e0e; color: #e8e6e1; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c;">Jérémy Lasne — Wealth Architecture</div>
        </div>

        <h1 style="font-size: 22px; font-weight: 600; margin-bottom: 16px; color: #e8e6e1;">${t(`Hello ${name},`, `${name},`)}</h1>

        <p style="font-size: 15px; line-height: 1.6; color: #9a9790; margin-bottom: 24px;">
          ${t(
            "You have been invited to access your personal client portal. This portal allows you to view your contracts, documents, payments, and upcoming meetings.",
            "Vous avez été invité(e) à accéder à votre portail client personnel. Ce portail vous permet de consulter vos contrats, documents, paiements et rendez-vous à venir."
          )}
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${signUpUrl}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #c9a84c, #d4b85a); color: #0e0e0e; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">
            ${t("Create Your Account", "Créer votre compte")}
          </a>
        </div>

        <p style="font-size: 13px; color: #5a5750; margin-bottom: 8px;">
          ${t(
            `Use this email address to sign up: <strong style="color: #9a9790;">${args.email}</strong>`,
            `Utilisez cette adresse pour vous inscrire : <strong style="color: #9a9790;">${args.email}</strong>`
          )}
        </p>

        <p style="font-size: 13px; color: #5a5750;">
          ${t(
            `If the button doesn't work, copy this link: ${signUpUrl}`,
            `Si le bouton ne fonctionne pas, copiez ce lien : ${signUpUrl}`
          )}
        </p>

        <hr style="border: none; border-top: 1px solid #222; margin: 32px 0;" />

        <p style="font-size: 12px; color: #5a5750; text-align: center;">
          Jérémy Lasne — Wealth Architecture<br/>
          jeremylasne.com
        </p>
      </div>
    `;

    const subject = t(
      "Welcome to your Wealth Architecture portal",
      "Bienvenue sur votre portail Wealth Architecture"
    );

    if (!resendApiKey) {
      console.log("[Resend Stub] Client invitation email:", {
        from: fromEmail,
        to: args.email,
        subject,
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
        subject,
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

import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const rawEmail = process.env.RESEND_FROM_EMAIL || "jeremy@jeremylasne.com";
const fromEmail = `Jérémy Lasne <${rawEmail}>`;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.log("[Resend Stub] sendEmail called:", {
      from: fromEmail,
      to: params.to,
      subject: params.subject,
    });
    return { id: `stub-${Date.now()}` };
  }

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });

  if (error) throw error;
  return data;
}

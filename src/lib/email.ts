const RESEND_ENDPOINT = "https://api.resend.com/emails";
// Resend's shared test sender: works without a verified domain, but only delivers to the
// address the Resend account was registered with.
export const TEST_SENDER = "Coffee Dreams <onboarding@resend.dev>";

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

export async function sendEmail(apiKey: string, email: { from: string; to: string; replyTo?: string; subject: string; text: string; html: string }) {
  const { replyTo, ...rest } = email;
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...rest, ...(replyTo && { reply_to: replyTo }) }),
  });
  if (!response.ok) console.error("Resend error", response.status, await response.text().catch(() => ""));
  return response.ok;
}

type Message = { subject: string; text: string; html: string };

// Sends a web form submission to the team inbox via Resend, with reply-to set to the sender so the
// team can answer straight from their mail client. The acknowledgement to the sender is only sent
// once CONTACT_FROM_EMAIL points at a verified domain (the test sender can't reach outside
// addresses). Returns false while Resend isn't configured, so forms fall back to WhatsApp / mailto.
export async function sendToTeam(senderEmail: string, team: Message, acknowledgement: Message): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;
  const from = process.env.CONTACT_FROM_EMAIL || TEST_SENDER;

  try {
    const sent = await sendEmail(apiKey, { from, to, replyTo: senderEmail, ...team });
    if (sent && process.env.CONTACT_FROM_EMAIL) {
      await sendEmail(apiKey, { from, to: senderEmail, replyTo: to, ...acknowledgement });
    }
    return sent;
  } catch (error) {
    console.error("Resend request failed", error);
    return false;
  }
}

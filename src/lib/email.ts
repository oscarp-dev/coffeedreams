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

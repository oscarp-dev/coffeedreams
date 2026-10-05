export const contactTopics = ["Abrir un café", "Mejorar mi negocio", "Formación", "Eventos", "Otro"] as const;
export const contactPreferences = ["Email", "WhatsApp", "Llamada"] as const;

export type ContactRequest = {
  topic: (typeof contactTopics)[number];
  name: string;
  email: string;
  phone: string;
  preference: (typeof contactPreferences)[number];
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s-]{7,20}$/;

export function parseContactRequest(body: unknown): { request: ContactRequest } | { error: string } | { spam: true } {
  if (!body || typeof body !== "object") return { error: "Solicitud no válida." };
  const { topic, name, email, phone, preference, message, company } = body as Record<string, unknown>;
  // Honeypot: the hidden "company" field is only ever filled in by bots.
  if (typeof company === "string" && company.trim()) return { spam: true };
  if (!contactTopics.includes(topic as ContactRequest["topic"])) return { error: "Elige un tema." };
  if (typeof name !== "string" || name.trim().length < 2) return { error: "Indica tu nombre." };
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) return { error: "Revisa tu email." };
  const cleanPhone = typeof phone === "string" ? phone.trim() : "";
  if (cleanPhone && !PHONE_RE.test(cleanPhone)) return { error: "Revisa tu teléfono." };
  if (!contactPreferences.includes(preference as ContactRequest["preference"])) return { error: "Elige cómo prefieres que te contactemos." };
  if ((preference === "WhatsApp" || preference === "Llamada") && !cleanPhone) return { error: "Añade un teléfono para poder contactarte así." };
  if (typeof message !== "string" || message.trim().length < 10) return { error: "Cuéntanos un poco más (mínimo 10 caracteres)." };
  if (message.length > 3000) return { error: "El mensaje es demasiado largo." };
  return { request: { topic: topic as ContactRequest["topic"], name: name.trim(), email: email.trim(), phone: cleanPhone, preference: preference as ContactRequest["preference"], message: message.trim() } };
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";
// Resend's shared test sender: works without a verified domain, but only delivers to the
// address the Resend account was registered with.
const TEST_SENDER = "Coffee Dreams <onboarding@resend.dev>";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

function teamEmail(request: ContactRequest) {
  const rows: [string, string][] = [["Tema", request.topic], ["Nombre", request.name], ["Email", request.email], ["Teléfono", request.phone || "-"], ["Prefiere contacto por", request.preference]];
  const text = `${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\n${request.message}`;
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows.map(([label, value]) => `<tr><td style="color:#666">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`).join("")}</table><p style="font-family:sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(request.message)}</p>`;
  return { subject: `Nuevo contacto web: ${request.topic} · ${request.name}`, text, html };
}

function acknowledgementEmail(request: ContactRequest) {
  const firstName = request.name.split(" ")[0];
  const text = `Hola ${firstName},\n\nHemos recibido tu mensaje y te responderemos lo antes posible.\n\nTu mensaje:\n${request.message}\n\nCoffee Dreams Consulting`;
  const html = `<div style="font-family:sans-serif;font-size:14px;line-height:1.6"><p>Hola ${escapeHtml(firstName)},</p><p>Hemos recibido tu mensaje y te responderemos lo antes posible.</p><blockquote style="margin:0;padding-left:12px;border-left:3px solid #c46a45;color:#555;white-space:pre-wrap">${escapeHtml(request.message)}</blockquote><p>Coffee Dreams Consulting</p></div>`;
  return { subject: "Hemos recibido tu mensaje · Coffee Dreams", text, html };
}

async function sendEmail(apiKey: string, email: { from: string; to: string; replyTo?: string; subject: string; text: string; html: string }) {
  const { replyTo, ...rest } = email;
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...rest, ...(replyTo && { reply_to: replyTo }) }),
  });
  if (!response.ok) console.error("Resend error", response.status, await response.text().catch(() => ""));
  return response.ok;
}

// Sends the request to the team inbox via Resend, with reply-to set to the sender so the team can
// answer straight from their mail client. The acknowledgement to the sender is only sent once
// CONTACT_FROM_EMAIL points at a verified domain (the test sender can't reach outside addresses).
// Returns false while Resend isn't configured, so the form falls back to WhatsApp / mailto.
export async function sendContactRequest(request: ContactRequest): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;
  const from = process.env.CONTACT_FROM_EMAIL || TEST_SENDER;

  try {
    const sent = await sendEmail(apiKey, { from, to, replyTo: request.email, ...teamEmail(request) });
    if (sent && process.env.CONTACT_FROM_EMAIL) {
      await sendEmail(apiKey, { from, to: request.email, replyTo: to, ...acknowledgementEmail(request) });
    }
    return sent;
  } catch (error) {
    console.error("Resend request failed", error);
    return false;
  }
}

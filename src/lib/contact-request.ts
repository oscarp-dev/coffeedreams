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

// Integration point for the email provider (Resend, Postmark, SMTP, ...): send the request to the
// team inbox with reply-to set to the sender, and optionally an acknowledgement to the sender.
// Returns false while no provider is configured.
export async function sendContactRequest(request: ContactRequest): Promise<boolean> {
  void request;
  return false;
}

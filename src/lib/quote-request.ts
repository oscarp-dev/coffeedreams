import { formatPrice } from "@/lib/courses";
import { escapeHtml, sendToTeam } from "@/lib/email";
import { services, type Service } from "@/lib/services";

export const MAX_PEOPLE = 20;

export type QuoteRequest = {
  serviceId: string;
  people: number;
  date: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s-]{7,20}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function quoteEstimate(service: Service, people: number) {
  return service.priceCents * (service.perPerson ? people : 1);
}

// Courses individuals book online are quoted per group: the form asks for information, not a price.
export const isInfoRequest = (service: Service) => Boolean(service.bookableOnline);

// Plain-text summary used both for the team email and for the WhatsApp / mailto fallbacks.
export function composeQuote(request: QuoteRequest, service: Service) {
  const info = isInfoRequest(service);
  const lines = [
    info ? `Hola, me gustaría recibir información sobre «${service.name}» para mi empresa o equipo.` : `Hola, me gustaría solicitar presupuesto para: ${service.name}`,
    service.perPerson ? `Personas: ${request.people}` : "",
    request.date ? `Fecha aproximada: ${new Date(request.date).toLocaleDateString("es-ES")}` : "",
    info ? "" : `Estimación: ${formatPrice(quoteEstimate(service, request.people))} + IVA`,
    "",
    `Nombre: ${request.name}`,
    `Email: ${request.email}`,
    `Teléfono: ${request.phone}`,
    request.message ? `\n${request.message}` : "",
  ];
  return lines.filter((line, i, all) => line !== "" || (i > 0 && all[i - 1] !== "")).join("\n");
}

export function parseQuoteRequest(body: unknown): { request: QuoteRequest; service: Service } | { error: string } | { spam: true } {
  if (!body || typeof body !== "object") return { error: "Solicitud no válida." };
  const { serviceId, people, date, name, email, phone, message, company } = body as Record<string, unknown>;
  // Honeypot: the hidden "company" field is only ever filled in by bots.
  if (typeof company === "string" && company.trim()) return { spam: true };
  const service = services.find((s) => s.id === serviceId);
  if (!service) return { error: "Elige un servicio." };
  const count = Number(people);
  if (!Number.isInteger(count) || count < 1 || count > MAX_PEOPLE) return { error: "Revisa el número de personas." };
  if (typeof date !== "string" || (date && !DATE_RE.test(date))) return { error: "Revisa la fecha." };
  if (typeof name !== "string" || name.trim().length < 2) return { error: "Indica tu nombre." };
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) return { error: "Revisa tu email." };
  if (typeof phone !== "string" || !PHONE_RE.test(phone.trim())) return { error: "Revisa tu teléfono." };
  if (typeof message !== "string" || message.length > 3000) return { error: "El mensaje es demasiado largo." };
  return { service, request: { serviceId: service.id, people: count, date, name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim() } };
}

function teamEmail(request: QuoteRequest, service: Service) {
  const text = composeQuote(request, service);
  const html = `<p style="font-family:sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(text)}</p>`;
  const kind = isInfoRequest(service) ? "Información para empresa" : "Solicitud de presupuesto";
  return { subject: `${kind}: ${service.name} · ${request.name}`, text, html };
}

function acknowledgementEmail(request: QuoteRequest, service: Service) {
  const firstName = request.name.split(" ")[0];
  const detail = isInfoRequest(service)
    ? "Te enviaremos la información y una propuesta para tu equipo."
    : `Estimación orientativa: ${formatPrice(quoteEstimate(service, request.people))} + IVA. Te responderemos personalmente con el presupuesto final.`;
  const text = `Hola ${firstName},\n\nHemos recibido tu solicitud sobre "${service.name}". ${detail}\n\nCoffee Dreams Consulting`;
  const html = `<div style="font-family:sans-serif;font-size:14px;line-height:1.6"><p>Hola ${escapeHtml(firstName)},</p><p>Hemos recibido tu solicitud sobre <strong>${escapeHtml(service.name)}</strong>. ${detail}</p><p>Coffee Dreams Consulting</p></div>`;
  return { subject: "Hemos recibido tu solicitud · Coffee Dreams", text, html };
}

export function sendQuoteRequest(request: QuoteRequest, service: Service) {
  return sendToTeam(request.email, teamEmail(request, service), acknowledgementEmail(request, service));
}

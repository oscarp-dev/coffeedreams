import type { Booking } from "@/lib/checkout";
import { formatPrice, type Course } from "@/lib/courses";
import { escapeHtml, sendEmail, TEST_SENDER } from "@/lib/email";

function rowsTable(rows: [string, string][]) {
  return `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows.map(([label, value]) => `<tr><td style="color:#666">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`).join("")}</table>`;
}

function bookingRows(booking: Booking, course: Course, amountCents: number): [string, string][] {
  return [["Formación", `${course.titleLead} ${course.title}`], ["Plazas", String(booking.seats)], ["Total pagado", formatPrice(amountCents, course.currency)]];
}

function teamEmail(booking: Booking, course: Course, amountCents: number) {
  const rows: [string, string][] = [...bookingRows(booking, course, amountCents), ["Nombre", booking.name], ["Email", booking.email], ["Teléfono", booking.phone]];
  return {
    subject: `Nueva reserva pagada: ${course.title} · ${booking.name} (${booking.seats} ${booking.seats === 1 ? "plaza" : "plazas"})`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: rowsTable(rows),
  };
}

function customerEmail(booking: Booking, course: Course, amountCents: number) {
  const firstName = booking.name.split(" ")[0];
  const rows = bookingRows(booking, course, amountCents);
  const text = `Hola ${firstName},\n\nTu reserva está confirmada y el pago se ha completado.\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nTe escribiremos con la fecha y los detalles de la sesión. Si tienes cualquier duda, responde a este email.\n\nCoffee Dreams Consulting`;
  const html = `<div style="font-family:sans-serif;font-size:14px;line-height:1.6"><p>Hola ${escapeHtml(firstName)},</p><p>Tu reserva está confirmada y el pago se ha completado.</p>${rowsTable(rows)}<p>Te escribiremos con la fecha y los detalles de la sesión. Si tienes cualquier duda, responde a este email.</p><p>Coffee Dreams Consulting</p></div>`;
  return { subject: `Reserva confirmada · ${course.title}`, text, html };
}

// Notifies the team of a paid booking and, once CONTACT_FROM_EMAIL is on a verified domain, sends
// the customer their confirmation. Returns false if the team email couldn't be sent, so the
// webhook answers with an error and Stripe retries the event.
export async function sendBookingEmails(booking: Booking, course: Course, amountCents: number): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.warn("Paid booking received but Resend isn't configured", booking);
    return true;
  }
  const from = process.env.CONTACT_FROM_EMAIL || TEST_SENDER;

  try {
    const sent = await sendEmail(apiKey, { from, to, replyTo: booking.email, ...teamEmail(booking, course, amountCents) });
    if (sent && process.env.CONTACT_FROM_EMAIL) {
      await sendEmail(apiKey, { from, to: booking.email, replyTo: to, ...customerEmail(booking, course, amountCents) });
    }
    return sent;
  } catch (error) {
    console.error("Resend request failed", error);
    return false;
  }
}

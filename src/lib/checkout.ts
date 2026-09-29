import { getCourse, type Course } from "@/lib/courses";

export type Booking = { courseId: string; name: string; email: string; phone: string; seats: number };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s-]{7,20}$/;

export function parseBooking(body: unknown): { booking: Booking; course: Course } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Solicitud no válida." };
  const { courseId, name, email, phone, seats } = body as Record<string, unknown>;
  const course = typeof courseId === "string" ? getCourse(courseId) : undefined;
  if (!course) return { error: "La formación no existe." };
  if (typeof name !== "string" || name.trim().length < 2) return { error: "Indica tu nombre." };
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) return { error: "Revisa tu email." };
  if (typeof phone !== "string" || !PHONE_RE.test(phone.trim())) return { error: "Revisa tu teléfono." };
  if (typeof seats !== "number" || !Number.isInteger(seats) || seats < 1 || seats > course.maxSeatsPerBooking) return { error: "Número de plazas no válido." };
  return { booking: { courseId: course.id, name: name.trim(), email: email.trim(), phone: phone.trim(), seats }, course };
}

// Integration point for the payment provider (Stripe Checkout, Redsys, ...): create a hosted
// checkout session for `course.priceCents * booking.seats`, with success_url /formacion/confirmacion,
// and return its URL. The confirmation email is sent from the provider's webhook once the payment
// succeeds, never from here. Returns null while no provider is configured.
export async function createCheckoutSession(booking: Booking, course: Course): Promise<{ url: string } | null> {
  void booking;
  void course;
  return null;
}

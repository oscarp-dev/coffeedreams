import { getCourse, type Course } from "@/lib/courses";
import { getStripe } from "@/lib/stripe";

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

// Creates a hosted Stripe Checkout session for `course.priceCents * booking.seats` and returns its
// URL. The booking travels in the session metadata so the webhook can send the confirmation emails
// once the payment succeeds; nothing is confirmed from here. Returns null while Stripe isn't configured.
export async function createCheckoutSession(booking: Booking, course: Course, origin: string): Promise<{ url: string } | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "es",
    customer_email: booking.email,
    line_items: [{
      quantity: booking.seats,
      price_data: {
        currency: course.currency.toLowerCase(),
        unit_amount: course.priceCents,
        product_data: { name: `${course.titleLead} ${course.title}`, description: `Formación con ${course.instructor} · ${course.theoryHours + course.practiceHours} h` },
      },
    }],
    metadata: { courseId: course.id, name: booking.name, email: booking.email, phone: booking.phone, seats: String(booking.seats) },
    success_url: `${origin}/formacion/confirmacion?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/formacion#reserva`,
  });
  return session.url ? { url: session.url } : null;
}

export function bookingFromMetadata(metadata: Record<string, string> | null): Booking | null {
  const parsed = parseBooking(metadata && { ...metadata, seats: Number(metadata.seats) });
  return "error" in parsed ? null : parsed.booking;
}

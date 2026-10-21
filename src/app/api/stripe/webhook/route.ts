import type Stripe from "stripe";
import { sendBookingEmails } from "@/lib/booking-email";
import { bookingFromMetadata } from "@/lib/checkout";
import { getCourse } from "@/lib/courses";
import { getStripe } from "@/lib/stripe";

// Stripe calls this once a Checkout payment settles. Card payments arrive paid in
// checkout.session.completed; delayed methods (e.g. SEPA) arrive later in async_payment_succeeded.
export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return new Response("Stripe not configured", { status: 503 });

  // The signature is computed over the raw body, so it must be read as text, not parsed JSON.
  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, request.headers.get("stripe-signature") ?? "", secret);
  } catch (error) {
    console.warn("Rejected Stripe webhook:", error instanceof Error ? error.message : error);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object;
    if (session.payment_status !== "paid") return Response.json({ received: true });

    const booking = bookingFromMetadata(session.metadata);
    const course = booking && getCourse(booking.courseId);
    if (!booking || !course) {
      console.error("Paid Checkout session with unreadable booking", session.id, session.metadata);
      return Response.json({ received: true });
    }
    const sent = await sendBookingEmails(booking, course, session.amount_total ?? course.priceCents * booking.seats);
    if (!sent) return new Response("Email failed", { status: 500 });
  }

  return Response.json({ received: true });
}

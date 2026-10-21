import Stripe from "stripe";

let client: Stripe | undefined;

// Shared Stripe client, or null while STRIPE_SECRET_KEY isn't set (the booking form then falls
// back to WhatsApp / email). Test keys (sk_test_...) and live keys use the same code path.
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  client ??= new Stripe(key);
  return client;
}

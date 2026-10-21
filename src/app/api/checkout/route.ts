import { createCheckoutSession, parseBooking } from "@/lib/checkout";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseBooking(body);
  if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });

  const origin = process.env.SITE_URL || new URL(request.url).origin;
  const session = await createCheckoutSession(parsed.booking, parsed.course, origin).catch((error) => {
    console.error("Stripe checkout failed", error);
    return null;
  });
  if (!session) return Response.json({ error: "payments_unavailable" }, { status: 503 });
  return Response.json({ url: session.url });
}

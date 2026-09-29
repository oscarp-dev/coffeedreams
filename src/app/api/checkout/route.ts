import { createCheckoutSession, parseBooking } from "@/lib/checkout";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseBooking(body);
  if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });

  const session = await createCheckoutSession(parsed.booking, parsed.course);
  if (!session) return Response.json({ error: "payments_unavailable" }, { status: 503 });
  return Response.json({ url: session.url });
}

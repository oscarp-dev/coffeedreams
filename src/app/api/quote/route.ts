import { parseQuoteRequest, sendQuoteRequest } from "@/lib/quote-request";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseQuoteRequest(body);
  if ("spam" in parsed) return Response.json({ ok: true });
  if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });

  const sent = await sendQuoteRequest(parsed.request, parsed.service);
  if (!sent) return Response.json({ error: "email_unavailable" }, { status: 503 });
  return Response.json({ ok: true });
}

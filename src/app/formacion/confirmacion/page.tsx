import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Footer, NavigationHeader } from "@/components/site";
import { bookingFromMetadata } from "@/lib/checkout";
import { formatPrice, getCourse } from "@/lib/courses";
import { getStripe } from "@/lib/stripe";

// Return page for Stripe Checkout's success_url (?session_id=cs_...). It reads the session to show
// what was paid; the confirmation email itself is sent from the webhook. Without a real session
// (no or unknown session_id) there is nothing to confirm, so it sends the visitor back to /formacion.
export const metadata: Metadata = {
  title: "Reserva confirmada | Coffee Dreams Consulting",
  robots: { index: false },
};

async function loadSession(sessionId: unknown) {
  const stripe = getStripe();
  if (!stripe || typeof sessionId !== "string" || !sessionId.startsWith("cs_")) return null;
  return stripe.checkout.sessions.retrieve(sessionId).catch(() => null);
}

export default async function Confirmacion({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const session = await loadSession((await searchParams).session_id);
  if (!session) redirect("/formacion");
  const booking = session ? bookingFromMetadata(session.metadata) : null;
  const course = booking ? getCourse(booking.courseId) : undefined;
  const paid = session?.payment_status === "paid";

  return (
    <>
      <NavigationHeader />
      <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-20">
        <div className="max-w-[480px] text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-white">{paid ? <Check size={28} aria-hidden="true" /> : <Clock size={28} aria-hidden="true" />}</span>
          {!paid ? (
            <>
              <p className="eyebrow mt-8 text-terracotta">Pago en proceso</p>
              <h1 className="display mt-4 text-4xl leading-tight sm:text-5xl">Ya casi está.</h1>
              <p className="mt-5 text-sm leading-7 text-ink/65">Tu banco aún está confirmando el pago. En cuanto se complete te enviaremos un email con la confirmación de tu reserva.</p>
            </>
          ) : (
            <>
              <p className="eyebrow mt-8 text-terracotta">Reserva confirmada</p>
              <h1 className="display mt-4 text-4xl leading-tight sm:text-5xl">¡Nos vemos en la barra!</h1>
              <p className="mt-5 text-sm leading-7 text-ink/65">Tu pago se ha completado correctamente. Te hemos enviado un email con la confirmación y todos los detalles de la formación. Si no lo ves, revisa la carpeta de spam.</p>
            </>
          )}
          {booking && course && (
            <dl className="mx-auto mt-8 grid max-w-[320px] grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-y border-ink/10 py-5 text-left text-sm">
              <dt className="text-ink/55">Formación</dt><dd className="text-right font-medium">{course.title}</dd>
              <dt className="text-ink/55">Plazas</dt><dd className="text-right font-medium">{booking.seats}</dd>
              <dt className="text-ink/55">Total</dt><dd className="text-right font-medium">{formatPrice(session.amount_total ?? course.priceCents * booking.seats, course.currency)}</dd>
            </dl>
          )}
          <Link href="/formacion" className="group mt-9 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-olive">Volver a la formación <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Footer, NavigationHeader } from "@/components/site";

// Return page for the payment provider's success_url.
export const metadata: Metadata = {
  title: "Reserva confirmada | Coffee Dreams Consulting",
  robots: { index: false },
};

export default function Confirmacion() {
  return (
    <>
      <NavigationHeader />
      <main className="flex min-h-[70vh] items-center justify-center bg-cream px-6 py-20">
        <div className="max-w-[480px] text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-white"><Check size={28} aria-hidden="true" /></span>
          <p className="eyebrow mt-8 text-terracotta">Reserva confirmada</p>
          <h1 className="display mt-4 text-4xl leading-tight sm:text-5xl">¡Nos vemos en la barra!</h1>
          <p className="mt-5 text-sm leading-7 text-ink/65">Tu pago se ha completado correctamente. Te hemos enviado un email con la confirmación y todos los detalles de la formación. Si no lo ves, revisa la carpeta de spam.</p>
          <Link href="/formacion" className="group mt-9 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.12em] text-olive">Volver a la formación <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

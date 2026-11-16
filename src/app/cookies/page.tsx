import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal";

export const metadata: Metadata = {
  title: "Política de cookies | Coffee Dreams Consulting",
  description: "Coffee Dreams Consulting no usa cookies de análisis ni de publicidad en su web.",
};

export default function Cookies() {
  return (
    <LegalPage title="Política de cookies" intro="Las cookies son pequeños archivos que algunas webs guardan en tu navegador para recordar información sobre tu visita.">
      <LegalSection title="Cookies que usa esta web">
        <p>Esta web <strong>no instala cookies propias ni de terceros</strong> con fines de análisis, publicidad o personalización, ni ninguna otra técnica de seguimiento. Por eso no te pedimos consentimiento con un aviso de cookies.</p>
        <p>Si en el futuro incorporamos cookies que no sean estrictamente necesarias, actualizaremos esta política y te pediremos tu consentimiento antes de instalarlas.</p>
      </LegalSection>

      <LegalSection title="Servicios de terceros">
        <p>Cuando pagas una reserva, te llevamos a la pasarela de pago de Stripe, que funciona en su propio dominio (checkout.stripe.com) y puede usar cookies necesarias para procesar el pago de forma segura y prevenir el fraude. Puedes consultarlas en la <a href="https://stripe.com/es/legal/cookies-policy" target="_blank" rel="noopener noreferrer">política de cookies de Stripe</a>.</p>
        <p>Lo mismo ocurre si sigues un enlace a WhatsApp o Instagram: esos servicios aplican sus propias políticas.</p>
      </LegalSection>

      <LegalSection title="Cómo gestionar las cookies">
        <p>Puedes ver, bloquear o eliminar las cookies en cualquier momento desde la configuración de tu navegador.</p>
        <p>Para más información sobre cómo tratamos tus datos, consulta la <Link href="/privacidad">política de privacidad</Link>.</p>
      </LegalSection>
    </LegalPage>
  );
}

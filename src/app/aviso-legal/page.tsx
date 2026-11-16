import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal";
import { LEGAL_OWNER } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal | Coffee Dreams Consulting",
  description: "Datos del titular y condiciones de uso de la web de Coffee Dreams Consulting.",
};

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal">
      <LegalSection title="Titular de la web">
        <p>En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), se informa de los datos del titular de {SITE_URL.replace("https://", "")}:</p>
        <ul>
          <li><strong>Titular:</strong> {LEGAL_OWNER.companyName}, que opera con el nombre comercial Coffee Dreams Consulting.</li>
          <li><strong>CIF:</strong> {LEGAL_OWNER.cif}</li>
          <li><strong>Domicilio social:</strong> {LEGAL_OWNER.address}</li>
          <li><strong>Datos registrales:</strong> {LEGAL_OWNER.registry}</li>
          <li><strong>Email:</strong> <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a></li>
          <li><strong>Teléfono:</strong> {LEGAL_OWNER.phone}</li>
        </ul>
      </LegalSection>

      <LegalSection title="Objeto y condiciones de uso">
        <p>Esta web informa sobre los servicios de consultoría, análisis y formación para negocios de café y hostelería de Coffee Dreams Consulting, y permite contactar con nosotros y reservar plazas en nuestras formaciones.</p>
        <p>Al navegar por la web aceptas usarla de forma lícita, sin dañar su funcionamiento ni el de terceros. Las reservas y pagos se rigen además por las <Link href="/condiciones">condiciones de contratación</Link>.</p>
      </LegalSection>

      <LegalSection title="Propiedad intelectual e industrial">
        <p>Los textos, fotografías, logotipos, diseño y demás contenidos de la web pertenecen a {LEGAL_OWNER.companyName} o se usan con autorización de sus titulares. No está permitido reproducirlos, distribuirlos ni transformarlos sin autorización expresa, salvo para uso personal y privado.</p>
        <p>Las marcas y logotipos de terceros que aparecen en la web pertenecen a sus respectivos titulares.</p>
      </LegalSection>

      <LegalSection title="Responsabilidad">
        <p>Procuramos que la información de la web sea correcta y esté actualizada, pero no garantizamos la ausencia de errores ni la disponibilidad continua de la web. No nos hacemos responsables de los daños derivados de un uso indebido de la web ni de interrupciones ajenas a nuestro control.</p>
      </LegalSection>

      <LegalSection title="Enlaces a terceros">
        <p>La web contiene enlaces a servicios de terceros, como WhatsApp, Instagram o la pasarela de pago de Stripe. No controlamos esos servicios ni somos responsables de sus contenidos o de cómo tratan tus datos; te recomendamos leer sus propias políticas.</p>
      </LegalSection>

      <LegalSection title="Protección de datos y cookies">
        <p>El tratamiento de tus datos personales se explica en la <Link href="/privacidad">política de privacidad</Link>, y el uso de cookies en la <Link href="/cookies">política de cookies</Link>.</p>
      </LegalSection>

      <LegalSection title="Legislación aplicable">
        <p>Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la ley; si actúas como consumidor, serán los de tu domicilio.</p>
      </LegalSection>
    </LegalPage>
  );
}

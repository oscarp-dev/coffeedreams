import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal";
import { LEGAL_OWNER } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad | Coffee Dreams Consulting",
  description: "Cómo trata Coffee Dreams Consulting los datos personales que nos facilitas en la web.",
};

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad" intro="Te explicamos qué datos recogemos en esta web, para qué los usamos y qué derechos tienes, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).">
      <LegalSection title="Responsable del tratamiento">
        <ul>
          <li><strong>Responsable:</strong> {LEGAL_OWNER.companyName} (Coffee Dreams Consulting)</li>
          <li><strong>CIF:</strong> {LEGAL_OWNER.cif}</li>
          <li><strong>Domicilio:</strong> {LEGAL_OWNER.address}</li>
          <li><strong>Email:</strong> <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a></li>
        </ul>
      </LegalSection>

      <LegalSection title="Qué datos recogemos">
        <ul>
          <li><strong>Formularios de contacto y presupuesto:</strong> nombre, email, teléfono (opcional), cómo prefieres que te contactemos y el contenido de tu mensaje.</li>
          <li><strong>Reservas de formación:</strong> nombre, email, teléfono y número de plazas. El pago lo procesa Stripe en su propia pasarela: nosotros nunca vemos ni guardamos los datos de tu tarjeta.</li>
          <li><strong>Si nos escribes por WhatsApp, email o teléfono:</strong> los datos que tú mismo nos facilites en la conversación.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Para qué los usamos y con qué base legal">
        <ul>
          <li><strong>Responder a tus consultas y preparar presupuestos.</strong> Base legal: tu consentimiento, que nos das al marcar la casilla del formulario, y la aplicación de medidas precontractuales a petición tuya.</li>
          <li><strong>Gestionar tu reserva:</strong> confirmar el pago, enviarte la confirmación, organizar la fecha de la formación y atender cambios o cancelaciones. Base legal: la ejecución del contrato.</li>
          <li><strong>Cumplir obligaciones legales,</strong> como las fiscales y contables derivadas de los pagos. Base legal: obligación legal.</li>
        </ul>
        <p>No usamos tus datos para enviarte publicidad ni tomamos decisiones automatizadas ni elaboramos perfiles con ellos.</p>
      </LegalSection>

      <LegalSection title="Cuánto tiempo los conservamos">
        <p>Los datos de las consultas se conservan el tiempo necesario para responderte y, como máximo, un año si no llegamos a contratar. Los datos de las reservas se conservan mientras dure la relación y, después, durante los plazos que exige la ley (por ejemplo, seis años para la documentación contable y fiscal).</p>
      </LegalSection>

      <LegalSection title="Con quién los compartimos">
        <p>No vendemos ni cedemos tus datos a terceros, salvo obligación legal. Para que la web funcione usamos proveedores que tratan datos por cuenta nuestra, con contratos que les obligan a protegerlos:</p>
        <ul>
          <li><strong>Vercel Inc.</strong> (alojamiento de la web).</li>
          <li><strong>Resend</strong> (envío de los emails de los formularios y de las reservas).</li>
          <li><strong>Stripe Payments Europe, Ltd.</strong> (procesamiento de pagos), que actúa también como responsable de los datos de pago conforme a su propia política de privacidad.</li>
        </ul>
        <p>Algunos de estos proveedores pueden tratar datos en Estados Unidos. Esas transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. o en las cláusulas contractuales tipo aprobadas por la Comisión Europea.</p>
      </LegalSection>

      <LegalSection title="Tus derechos">
        <p>Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar tu consentimiento, escribiendo a <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a>. Retirar el consentimiento no afecta a los tratamientos ya realizados.</p>
        <p>Si consideras que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).</p>
      </LegalSection>

      <LegalSection title="Menores de edad">
        <p>Esta web no está dirigida a menores de 14 años. Si eres menor de esa edad, no nos envíes tus datos sin el consentimiento de tus padres o tutores.</p>
      </LegalSection>
    </LegalPage>
  );
}

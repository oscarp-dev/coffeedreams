import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal";
import { CANCELLATION_DAYS, LEGAL_OWNER } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Condiciones de contratación | Coffee Dreams Consulting",
  description: "Condiciones de reserva, pago, cancelación y desistimiento de las formaciones de Coffee Dreams Consulting.",
};

export default function Condiciones() {
  const mail = <a href={`mailto:${LEGAL_OWNER.email}`}>{LEGAL_OWNER.email}</a>;
  return (
    <LegalPage title="Condiciones de contratación" intro="Estas condiciones regulan la reserva y el pago de plazas en las formaciones que ofrecemos en esta web. Al completar una reserva declaras haberlas leído y aceptado.">
      <LegalSection title="Quién presta el servicio">
        <p>Las formaciones las imparte {LEGAL_OWNER.companyName} (Coffee Dreams Consulting), CIF {LEGAL_OWNER.cif}, con domicilio en {LEGAL_OWNER.address}. Puedes contactar con nosotros en {mail} o en el {LEGAL_OWNER.phone}. Los datos completos están en el <Link href="/aviso-legal">aviso legal</Link>.</p>
        <p>Los servicios de consultoría se contratan aparte, mediante presupuesto personalizado.</p>
      </LegalSection>

      <LegalSection title="Cómo se reserva">
        <ul>
          <li>En la página de la formación eliges la fecha de la sesión y el número de plazas, indicas tus datos y pasas a la pasarela de pago segura de Stripe.</li>
          <li>La reserva queda confirmada cuando se completa el pago. En ese momento te enviamos un email de confirmación con la fecha, el horario, el lugar y el resumen de tu compra.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Precio y pago">
        <p>El precio de cada plaza es el que aparece en la web en el momento de la reserva, con los impuestos incluidos. El pago se realiza por adelantado con tarjeta u otros métodos que ofrezca la pasarela de Stripe. No almacenamos los datos de tu tarjeta.</p>
        <p>Si necesitas factura, pídenosla en {mail} indicando tus datos fiscales.</p>
      </LegalSection>

      <LegalSection title="Derecho de desistimiento">
        <p>Si eres consumidor, tienes derecho a desistir de la compra en un plazo de <strong>14 días naturales desde la reserva</strong>, sin necesidad de justificación. Para ejercerlo, envíanos una declaración clara de tu decisión a {mail}; puedes usar el modelo de formulario que aparece al final de esta página, aunque no es obligatorio.</p>
        <p>Te devolveremos todo lo pagado en un plazo máximo de 14 días desde que recibamos tu solicitud, por el mismo medio de pago que usaste.</p>
        <p>Si, a petición tuya, la formación se imparte antes de que terminen esos 14 días, perderás el derecho de desistimiento una vez impartida.</p>
      </LegalSection>

      <LegalSection title="Cancelaciones y cambios de fecha">
        <p>Una vez pasado el plazo de desistimiento:</p>
        <ul>
          <li>Si cancelas con <strong>{CANCELLATION_DAYS} días o más</strong> de antelación a la fecha de tu sesión, te devolvemos el importe íntegro.</li>
          <li>Si cancelas con menos de {CANCELLATION_DAYS} días de antelación, no hay reembolso, pero puedes cambiar la sesión a otra fecha una vez o ceder tu plaza a otra persona avisándonos antes.</li>
          <li>Si no te presentas a la sesión sin avisar, no se devuelve el importe.</li>
        </ul>
        <p>Si somos nosotros quienes tenemos que cancelar o aplazar la formación, te ofreceremos una nueva fecha y, si no te encaja, te devolveremos el importe íntegro.</p>
      </LegalSection>

      <LegalSection title="Reclamaciones y legislación aplicable">
        <p>Para cualquier duda o reclamación, escríbenos a {mail} y te responderemos lo antes posible. Estas condiciones se rigen por la legislación española. Si eres consumidor, serán competentes los juzgados de tu domicilio.</p>
        <p>El tratamiento de tus datos se explica en la <Link href="/privacidad">política de privacidad</Link>.</p>
      </LegalSection>

      <LegalSection title="Modelo de formulario de desistimiento">
        <p>Solo debes cumplimentar y enviar este formulario si deseas desistir del contrato.</p>
        <div className="mt-4 rounded-2xl border border-ink/10 bg-white/60 p-5 text-sm leading-7 sm:p-6">
          <p className="!mt-0">A la atención de {LEGAL_OWNER.companyName}, {LEGAL_OWNER.address}, {LEGAL_OWNER.email}:</p>
          <p>Por la presente le comunico que desisto de mi contrato de prestación del siguiente servicio: [formación y número de plazas].</p>
          <p>Reservado el: [fecha de la reserva]</p>
          <p>Nombre del consumidor: [nombre y apellidos]</p>
          <p>Domicilio del consumidor: [domicilio]</p>
          <p>Firma del consumidor (solo si el formulario se presenta en papel)</p>
          <p>Fecha: [fecha]</p>
        </div>
      </LegalSection>
    </LegalPage>
  );
}

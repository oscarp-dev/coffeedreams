import { CONTACT_EMAIL, PHONE_DISPLAY } from "@/lib/contact";

// Owner details shown on the legal pages (LSSI art. 10). Bracketed values are still pending from the client.
export const LEGAL_OWNER = {
  companyName: "Naylas Coffee S.L.",
  cif: "B19404086",
  address: "C/ Presbítero Baltasar Carrasco, 18, 1.º dcha., [C.P.] Alicante",
  registry: "Inscrita en el Registro Mercantil de [provincia], tomo [—], folio [—], hoja [—]",
  email: CONTACT_EMAIL,
  phone: PHONE_DISPLAY,
};

export const LEGAL_UPDATED = "2 de noviembre de 2026";

// Draft cancellation policy for course bookings, pending confirmation by the client.
export const CANCELLATION_DAYS = 7;

export const legalLinks = [
  { title: "Aviso legal", href: "/aviso-legal" },
  { title: "Privacidad", href: "/privacidad" },
  { title: "Cookies", href: "/cookies" },
  { title: "Condiciones de contratación", href: "/condiciones" },
];

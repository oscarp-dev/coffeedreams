// TODO: replace with the real WhatsApp business number (international format, digits only).
export const WHATSAPP_NUMBER = "34961234567";
export const CONTACT_EMAIL = "hola@coffeedreams.es";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

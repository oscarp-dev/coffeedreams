// Business phone, also used for WhatsApp (international format, digits only).
export const WHATSAPP_NUMBER = "34678817917";
export const PHONE_DISPLAY = "+34 678 81 79 17";
export const PHONE_LINK = `tel:+${WHATSAPP_NUMBER}`;
export const CONTACT_EMAIL = "coffeedreamsconsulting@gmail.com";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

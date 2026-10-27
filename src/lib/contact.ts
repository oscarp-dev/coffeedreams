export const PHONE_NUMBER = "+34678817917";
export const PHONE_DISPLAY = "+34 678 817 917";
export const WHATSAPP_NUMBER = PHONE_NUMBER.slice(1);
export const CONTACT_EMAIL = "coffeedreamsconsulting@gmail.com";
export const LOCATION = "Alicante, España";

// Only profiles with a URL are shown in the footer.
// TODO: add the client's real Instagram / LinkedIn profiles.
export const SOCIAL_LINKS: { label: "Instagram" | "LinkedIn"; href: string }[] = [
  { label: "Instagram", href: "" },
  { label: "LinkedIn", href: "" },
];

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

import type { Metadata } from "next";
import { ContactoPage } from "@/components/contacto";

export const metadata: Metadata = {
  title: "Contacto | Coffee Dreams Consulting",
  description: "Cuéntanos tu proyecto de café. Te respondemos por email, WhatsApp o teléfono.",
};

export default function Contacto() { return <ContactoPage />; }

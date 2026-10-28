import type { Metadata } from "next";
import { SobreNosotrosPage } from "@/components/sobre-nosotros";

export const metadata: Metadata = {
  title: "Sobre nosotros | Coffee Dreams Consulting",
  description: "Conocemos el café desde dentro y el negocio desde los números: acompañamos a cafeterías a abrir, mejorar y formar a su equipo.",
};

export default function SobreNosotros() { return <SobreNosotrosPage />; }

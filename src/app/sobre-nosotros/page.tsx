import type { Metadata } from "next";
import { SobreNosotrosPage } from "@/components/sobre-nosotros";

export const metadata: Metadata = {
  title: "Sobre nosotros | Coffee Dreams Consulting",
  description: "Un equipo pequeño con mucha barra a la espalda: acompañamos a cafeterías a abrir, mejorar y formar a su equipo.",
};

export default function SobreNosotros() { return <SobreNosotrosPage />; }

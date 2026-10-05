import type { Metadata } from "next";
import { ProyectosPage } from "@/components/proyectos";

export const metadata: Metadata = {
  title: "Proyectos | Coffee Dreams Consulting",
  description: "Aperturas, optimización de negocios y formación de equipos de café que hemos acompañado.",
};

export default function Proyectos() { return <ProyectosPage />; }

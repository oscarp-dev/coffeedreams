import type { Metadata } from "next";
import { ServiciosPage } from "@/components/servicios";

export const metadata: Metadata = {
  title: "Servicios y tarifas | Coffee Dreams Consulting",
  description: "Consultoría, formación y eventos para negocios de café: creamos, analizamos y formamos, con tarifas claras.",
};

export default function Servicios() { return <ServiciosPage />; }

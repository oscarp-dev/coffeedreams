export type ServiceCategory = "formacion" | "eventos";

export type Service = {
  id: string;
  name: string;
  category: ServiceCategory;
  duration: string;
  priceCents: number;
  perPerson: boolean;
  description: string;
  image: string;
  href?: string;
};

export const serviceCategories: { id: ServiceCategory; label: string }[] = [
  { id: "formacion", label: "Formación" },
  { id: "eventos", label: "Eventos" },
];

// Rates from "Tarifas de formación y servicios profesionales". Prices exclude IVA.
export const services: Service[] = [
  {
    id: "formacion-cafe-latte-art",
    name: "Formación de Café y Latte Art",
    category: "formacion",
    duration: "4 horas",
    priceCents: 12000,
    perPerson: true,
    description: "Del grano al vertido: espresso, leche y Latte Art en una formación teórico-práctica.",
    image: "/images/latteart.jpg",
    href: "/formacion",
  },
  {
    id: "atencion-cliente",
    name: "Formación en Atención al Cliente y Protocolos de Servicio",
    category: "formacion",
    duration: "Según programa",
    priceCents: 12000,
    perPerson: true,
    description: "Para equipos de sala y barra: atención, protocolos de servicio y experiencia del cliente.",
    image: "/images/pillar-analizamos.jpg",
  },
  {
    id: "ferias-eventos",
    name: "Servicio profesional para ferias y eventos",
    category: "eventos",
    duration: "4 horas",
    priceCents: 15000,
    perPerson: false,
    description: "Servicio de café profesional para tu stand, feria o evento.",
    image: "/images/interior-contacto.jpg",
  },
  {
    id: "live-latte-art",
    name: "Live Latte Art Show",
    category: "eventos",
    duration: "2 horas",
    priceCents: 8000,
    perPerson: false,
    description: "Latte Art en directo: una demostración que sorprende y reúne a tu público.",
    image: "/images/pillar-creamos.jpg",
  },
];

export const serviceConditions = [
  { title: "IVA", text: "Las tarifas indicadas están sujetas a IVA." },
  { title: "Desplazamiento", text: "Los gastos de desplazamiento y alojamiento, cuando sean necesarios, se presupuestarán aparte." },
  { title: "A medida", text: "Los servicios o formaciones que requieran una adaptación específica, una duración diferente o necesidades adicionales se valorarán mediante presupuesto personalizado." },
];

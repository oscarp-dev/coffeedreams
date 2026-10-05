import { brands, type Brand } from "@/lib/brands";

export type ProjectCategory = "apertura" | "optimizacion" | "formacion";

type Metric = { value: string; label: string };

export type Project = {
  id: string;
  name: string;
  tagline?: string;
  city?: string;
  brand: Brand;
  category: ProjectCategory;
  // Without a photo, the card shows the brand logo instead.
  image?: string;
  imagePosition?: string;
  summary?: string;
  result?: Metric;
  featured?: {
    videos?: { src: string; poster: string; label: string }[];
    metrics?: Metric[];
    quote?: { text: string; author: string };
  };
};

export const projectCategories: { id: ProjectCategory; label: string; pillar: string }[] = [
  { id: "apertura", label: "Aperturas", pillar: "Creamos" },
  { id: "optimizacion", label: "Optimización", pillar: "Analizamos" },
  { id: "formacion", label: "Formación", pillar: "Formamos" },
];

export const projects: Project[] = [
  {
    id: "fini",
    name: "Fini",
    tagline: "Coffee & Bakery",
    brand: brands.fini,
    category: "apertura",
    image: "/images/proyectos/fini-inauguracion.jpg",
    imagePosition: "object-[center_45%]",
    // TODO: confirm copy with the client; add city, metrics and a quote once we have them.
    summary: "Una cafetería y obrador que acompañamos desde la obra hasta el día de la inauguración.",
    featured: {
      videos: [
        { src: "/images/proyectos/fini-obra.mp4", poster: "/images/proyectos/fini-obra.jpg", label: "La obra" },
        { src: "/images/proyectos/fini-apertura.mp4", poster: "/images/proyectos/fini-apertura.jpg", label: "La apertura" },
      ],
    },
  },
  {
    id: "honey",
    name: "Honey",
    tagline: "Coffee & Brunch",
    city: "Alcoy",
    brand: brands.honey,
    category: "apertura", // TODO: confirm the type of project with the client.
    image: "/images/proyectos/honey-fachada.jpg",
    imagePosition: "object-[center_20%]",
    summary: "Coffee & brunch de barrio con una carta propia de cafés fríos y de especialidad.",
  },
  {
    id: "qaphi",
    name: "Qaphi",
    tagline: "Coffee · Brunch · Sweet",
    city: "Alicante",
    brand: brands.qaphi,
    category: "apertura", // TODO: confirm the type of project with the client.
    image: "/images/proyectos/qaphi-brunch.webp",
    summary: "Brunch de temporada, café de tueste propio y repostería casera en dos locales: Plaza de Toros y San Blas.",
  },
  {
    id: "harrys",
    name: "Harry's",
    tagline: "Coffee & Brunch",
    city: "Alicante",
    brand: brands.harrys,
    category: "apertura", // TODO: confirm the type of project with the client.
    image: "/images/proyectos/harrys-barra.webp",
    imagePosition: "object-[center_45%]",
    summary: "Specialty coffee de origen, brunch artesanal y desayunos junto a la Avinguda de l'Estació.",
  },
];

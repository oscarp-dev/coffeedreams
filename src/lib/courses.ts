export type CourseModule = { title: string; topics: string[] };
export type CoursePhase = { name: string; modules: number[] };

export type Course = {
  id: string;
  instructor: string;
  // Photo of the instructor teaching (upright, cropped copy of public/images/richie.jpg).
  instructorPhoto: string;
  titleLead: string;
  title: string;
  tagline: string;
  summary: string;
  theoryHours: number;
  practiceHours: number;
  priceCents: number;
  currency: "EUR";
  maxSeatsPerBooking: number;
  modules: CourseModule[];
  phases: CoursePhase[];
  motto: string[];
  closing: string;
};

export const latteArtCourse: Course = {
  id: "inicios-cafe-latte-art",
  instructor: "Barista Richy",
  instructorPhoto: "/images/richy-formacion.jpg",
  titleLead: "Inicios al mundo del",
  title: "Café & Latte Art",
  tagline: "Del grano al espresso, de la leche al vertido",
  summary: "Una formación teórico-práctica pensada para quienes quieren iniciarse en el mundo del café, comprender los fundamentos del trabajo de barista y adquirir una base sólida en espresso, leche y Latte Art.",
  theoryHours: 1,
  practiceHours: 3,
  priceCents: 12000,
  currency: "EUR",
  maxSeatsPerBooking: 4,
  modules: [
    { title: "Introducción al mundo del café", topics: ["Arábica y Robusta", "Características y diferencias"] },
    { title: "Del origen a la taza", topics: ["Recolección", "Anatomía del fruto", "Beneficiado húmedo y seco", "Procesos", "Tueste", "Descafeinado"] },
    { title: "El espresso perfecto", topics: ["Parámetros de extracción", "Dosis", "Tiempo", "Temperatura", "Presión", "Ajuste básico del espresso"] },
    { title: "Las 4M del Barista", topics: ["Materia prima", "Maquinaria", "Molido", "Mano del barista"] },
    { title: "La leche", topics: ["Características y tipos", "Temperatura y tratamiento", "Emulsión", "Creación de microespuma"] },
    { title: "Introducción al Latte Art", topics: ["Mecánica de fluidos", "Control de caudal", "Altura", "Posición", "Técnicas de vertido"] },
    { title: "Técnicas de Latte Art", topics: ["Vertido libre", "Painting", "Técnica mixta", "Creación de figuras básicas"] },
    { title: "Parte práctica", topics: ["Preparación del espresso", "Emulsión correcta", "Práctica de vertido", "Figuras", "Bebidas habituales"] },
  ],
  phases: [
    { name: "El café", modules: [0, 1, 2, 3] },
    { name: "Leche y Latte Art", modules: [4, 5, 6] },
    { name: "Manos a la barra", modules: [7] },
  ],
  motto: ["Aprende", "Practica", "Comprende"],
  closing: "Una base práctica para empezar a trabajar el café con técnica, criterio y confianza.",
};

const courses: Record<string, Course> = { [latteArtCourse.id]: latteArtCourse };

export function getCourse(id: string): Course | undefined {
  return courses[id];
}

export function formatPrice(cents: number, currency: Course["currency"] = "EUR") {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency, maximumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);
}

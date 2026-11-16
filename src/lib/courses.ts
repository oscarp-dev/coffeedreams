export type CourseModule = { title: string; topics: string[] };
export type CoursePhase = { name: string; modules: number[] };
// A dated group session. `id` is the session date (YYYY-MM-DD); start/end carry the Madrid offset.
export type CourseSession = { id: string; start: string; end: string };

export type Course = {
  id: string;
  instructor: string;
  // Portrait photo of the instructor, shown in the "Tu formador" section.
  instructorPhoto: string;
  titleLead: string;
  title: string;
  tagline: string;
  summary: string;
  theoryHours: number;
  practiceHours: number;
  priceCents: number;
  // Price before the current offer, shown struck through next to `priceCents`.
  listPriceCents?: number;
  currency: "EUR";
  maxSeatsPerBooking: number;
  location: string;
  sessions: CourseSession[];
  modules: CourseModule[];
  phases: CoursePhase[];
  motto: string[];
  closing: string;
};

export const latteArtCourse: Course = {
  id: "inicios-cafe-latte-art",
  instructor: "Barista Richy",
  instructorPhoto: "/images/richy-latte-art.jpg",
  titleLead: "Inicios al mundo del",
  title: "Café & Latte Art",
  tagline: "Del grano al espresso, de la leche al vertido",
  summary: "Una formación teórico-práctica pensada para quienes quieren iniciarse en el mundo del café, comprender los fundamentos del trabajo de barista y adquirir una base sólida en espresso, leche y Latte Art.",
  theoryHours: 1,
  practiceHours: 3,
  priceCents: 8000,
  listPriceCents: 12000,
  currency: "EUR",
  maxSeatsPerBooking: 4,
  location: "Glorieta Poeta Vicente Mojica, 6, Alicante",
  sessions: [
    { id: "2026-11-30", start: "2026-11-30T16:00:00+01:00", end: "2026-11-30T20:00:00+01:00" },
    { id: "2026-12-14", start: "2026-12-14T16:00:00+01:00", end: "2026-12-14T20:00:00+01:00" },
    { id: "2026-12-28", start: "2026-12-28T16:00:00+01:00", end: "2026-12-28T20:00:00+01:00" },
  ],
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

export function getSession(course: Course, sessionId: string): CourseSession | undefined {
  return course.sessions.find((s) => s.id === sessionId);
}

// Sessions can be booked until they start.
export function isBookable(session: CourseSession, now = Date.now()) {
  return new Date(session.start).getTime() > now;
}

export function upcomingSessions(course: Course, now = Date.now()) {
  return course.sessions.filter((s) => isBookable(s, now));
}

const TIME_ZONE = "Europe/Madrid";

// "lunes, 30 de noviembre"
export function formatSessionDate(session: CourseSession) {
  return new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", timeZone: TIME_ZONE }).format(new Date(session.start));
}

// "16:00 – 20:00"
export function formatSessionTime(session: CourseSession) {
  const time = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: TIME_ZONE });
  return `${time.format(new Date(session.start))} – ${time.format(new Date(session.end))}`;
}

export type Priced = { priceCents: number; listPriceCents?: number };

export function discountPercent(item: Priced) {
  return item.listPriceCents ? Math.round((1 - item.priceCents / item.listPriceCents) * 100) : 0;
}

export function formatPrice(cents: number, currency: Course["currency"] = "EUR") {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency, maximumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100);
}

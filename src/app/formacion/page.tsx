import type { Metadata } from "next";
import { FormacionPage } from "@/components/formacion";
import { latteArtCourse, upcomingSessions } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Formación: Café & Latte Art | Coffee Dreams Consulting",
  description: latteArtCourse.summary,
};

// Past sessions drop off the booking form on the next regeneration; /api/checkout rejects them anyway.
export const revalidate = 3600;

export default function Formacion() { return <FormacionPage course={{ ...latteArtCourse, sessions: upcomingSessions(latteArtCourse) }} />; }

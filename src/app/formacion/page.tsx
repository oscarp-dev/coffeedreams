import type { Metadata } from "next";
import { FormacionPage } from "@/components/formacion";
import { latteArtCourse } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Formación: Café & Latte Art | Coffee Dreams Consulting",
  description: latteArtCourse.summary,
};

export default function Formacion() { return <FormacionPage course={latteArtCourse} />; }

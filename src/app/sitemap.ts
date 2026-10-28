import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/servicios", priority: 0.9 },
  { path: "/formacion", priority: 0.9 },
  { path: "/proyectos", priority: 0.8 },
  { path: "/contacto", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, changeFrequency: "monthly", priority }));
}

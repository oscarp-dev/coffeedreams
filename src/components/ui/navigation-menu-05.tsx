"use client";

import { BookOpen, BriefcaseBusiness, FileText, GraduationCap, Home, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navigationMenuItems: { title: string; href?: string; icon: LucideIcon }[] = [
  { title: "Inicio", href: "/", icon: Home },
  { title: "Servicios", href: "/servicios", icon: BriefcaseBusiness },
  { title: "Proyectos", href: "/proyectos", icon: FileText },
  { title: "Formación", href: "/formacion", icon: GraduationCap },
  { title: "Sobre nosotros", icon: BookOpen },
  { title: "Contacto", href: "/contacto", icon: Mail },
];

const linkClassName = cn(
  "group relative inline-flex h-9 w-max items-center justify-center gap-2 px-0.5 py-2 text-[9px] font-semibold uppercase tracking-[.08em] transition-colors",
  "before:absolute before:inset-x-0 before:bottom-0 before:h-px before:origin-center before:scale-x-0 before:bg-terracotta before:transition-transform",
  "hover:text-olive hover:before:scale-x-100 focus:text-olive focus:outline-hidden focus:before:scale-x-100",
  "data-active:text-olive data-active:before:scale-x-100",
);

export default function NavigationMenuWithActiveItem() {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-5 space-x-0">
        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink active={item.href === pathname} asChild className={linkClassName}>
              {item.href ? (
                <Link href={item.href}>
                  <item.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {item.title}
                </Link>
              ) : (
                <button type="button">
                  <item.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {item.title}
                </button>
              )}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

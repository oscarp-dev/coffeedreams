"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export const navigationMenuItems = [
  { title: "Inicio", href: "/" },
  { title: "Servicios", href: "/servicios" },
  { title: "Proyectos", href: "/proyectos" },
  { title: "Formación", href: "/formacion" },
  { title: "Contacto", href: "/contacto" },
];

const linkClassName = cn(
  "group relative inline-flex h-9 w-max items-center justify-center px-0.5 py-2 text-[12px] font-medium tracking-[.02em] text-ink/70 transition-colors",
  "before:absolute before:inset-x-0 before:bottom-0.5 before:h-px before:origin-left before:scale-x-0 before:bg-terracotta before:transition-transform before:duration-300",
  "hover:text-ink hover:before:scale-x-100 focus-visible:text-ink focus-visible:before:scale-x-100",
  "data-active:text-ink data-active:before:scale-x-100",
);

export default function NavigationMenuWithActiveItem() {
  const pathname = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-8 space-x-0">
        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink active={item.href === pathname} asChild className={linkClassName}>
              <Link href={item.href} aria-current={item.href === pathname ? "page" : undefined}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
